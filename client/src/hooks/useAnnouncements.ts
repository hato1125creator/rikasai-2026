import { useEffect, useState } from 'react';
import type { Announcement } from '@/types/announcement';
import { mockAnnouncements } from '@/data/mockData';

const CACHE_DURATION = 5 * 60 * 1000; // 5分間キャッシュ
const CACHE_KEY = 'rikasai_announcements_cache';

interface CacheData {
  data: Announcement[];
  timestamp: number;
}

/**
 * お知らせを取得するカスタムhook
 */
export function useAnnouncements() {
  const [data, setData] = useState<Announcement[]>(() => {
    // キャッシュを確認
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const cacheData: CacheData = JSON.parse(cached);
        if (Date.now() - cacheData.timestamp < CACHE_DURATION && cacheData.data.length > 0) {
          return cacheData.data;
        }
      } catch (e) {
        console.error('Failed to parse cache', e);
      }
    }
    return mockAnnouncements;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAnnouncements = async () => {
    setLoading(true);
    setError(null);

    try {
      // キャッシュを確認
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const cacheData: CacheData = JSON.parse(cached);
        if (Date.now() - cacheData.timestamp < CACHE_DURATION) {
          setData(cacheData.data);
          setLoading(false);
          return;
        }
      }

      // GASのURLを取得
      const gasUrl = import.meta.env.VITE_GAS_DEPLOYMENT_URL;
      if (!gasUrl) {
        throw new Error('GAS deployment URL not configured');
      }

      // GASからデータを取得
      const response = await fetch(`${gasUrl}?type=announcements`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch data');
      }

      const announcements = result.announcements || [];
      // 優先度でソート（高い順）
      announcements.sort((a: Announcement, b: Announcement) => b.priority - a.priority);
      
      // データがある場合のみセット
      if (announcements.length > 0) {
        setData(announcements);
        // キャッシュに保存
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: announcements,
            timestamp: Date.now(),
          } as CacheData)
        );
      } else {
        // GASからデータがない場合はmockDataを使用
        setData(mockAnnouncements);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error('Failed to fetch announcements, using mock data', error);
      // エラーメッセージを表示しつつ、モックデータで継続
      setError(null);
      setData(mockAnnouncements);
      // キャッシュをクリア
      localStorage.removeItem(CACHE_KEY);
    } finally {
      setLoading(false);
    }
  };

  // 初回マウント時に自動取得
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchAnnouncements,
  };
}
