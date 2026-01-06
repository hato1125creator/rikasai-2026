import { useEffect, useState } from 'react';
import type { RealTimeInfo } from '@/types/realtime';
import { mockRealTimeInfo } from '@/data/mockData';

const CACHE_DURATION = 5 * 60 * 1000; // 5分間キャッシュ
const CACHE_KEY = 'rikasai_realtime_cache';

interface CacheData {
  data: RealTimeInfo[];
  timestamp: number;
}

/**
 * リアルタイム情報を取得するカスタムhook
 */
export function useRealTimeInfo() {
  const [data, setData] = useState<RealTimeInfo[]>(mockRealTimeInfo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchRealTimeInfo = async () => {
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
      const response = await fetch(`${gasUrl}?type=realtime`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch data');
      }

      const realTimeInfo = result.realTimeInfo || [];
      setData(realTimeInfo);

      // キャッシュに保存
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: realTimeInfo,
          timestamp: Date.now(),
        } as CacheData)
      );
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error('Failed to fetch real-time info, using mock data', error);
      // エラーメッセージを表示しつつ、モックデータで継続
      setError(null);
      setData(mockRealTimeInfo);
    } finally {
      setLoading(false);
    }
  };

  // 初回マウント時に自動取得
  useEffect(() => {
    fetchRealTimeInfo();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchRealTimeInfo,
  };
}
