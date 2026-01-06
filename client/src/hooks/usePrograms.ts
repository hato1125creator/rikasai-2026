import { useState, useEffect } from 'react';
import { Program } from '@/types';
import {
  fetchProgramsFromSheets,
  getCachedPrograms,
  setCachedPrograms,
} from '@/lib/googleSheets';
import { mockPrograms } from '@/data/mockData';

interface UseProgramsResult {
  programs: Program[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * 企画データを取得するカスタムhook
 * Google Sheetsから取得し、失敗時はモックデータにフォールバック
 */
export function usePrograms(): UseProgramsResult {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrograms = async () => {
    setLoading(true);
    setError(null);

    try {
      // キャッシュをチェック
      const cached = getCachedPrograms();
      if (cached) {
        setPrograms(cached);
        setLoading(false);
        return;
      }

      // Google Sheetsから取得
      const data = await fetchProgramsFromSheets();
      setPrograms(data);
      setCachedPrograms(data);
    } catch (err) {
      console.warn('Failed to fetch from Google Sheets, using mock data', err);
      const errorMessage = err instanceof Error ? err.message : '不明なエラーが発生しました';
      setError(`申し訳ございません。企画情報の読み込みに失敗しました。\n\nサンプルデータを表示しています。`);
      setPrograms(mockPrograms);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return {
    programs,
    loading,
    error,
    refetch: fetchPrograms,
  };
}
