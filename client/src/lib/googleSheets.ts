import { Program } from '@/types';

// Google Apps Script Webアプリケーション設定
const GAS_DEPLOYMENT_URL = import.meta.env.VITE_GAS_DEPLOYMENT_URL || '';

/**
 * Google Apps ScriptのWebアプリケーションからデータを取得
 */
export async function fetchProgramsFromSheets(): Promise<Program[]> {
  if (!GAS_DEPLOYMENT_URL) {
    console.warn('GAS deployment URL not configured');
    throw new Error('GAS deployment URL not configured');
  }

  try {
    const response = await fetch(GAS_DEPLOYMENT_URL, {
      method: 'GET',
      mode: 'cors',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.success || !Array.isArray(data.programs)) {
      throw new Error('Invalid response format from GAS');
    }

    return data.programs.map((row: string[]) => parseRowToProgram(row));
  } catch (error) {
    console.error('Error fetching from Google Apps Script:', error);
    throw error;
  }
}

/**
 * スプレッドシートの行をProgramオブジェクトに変換
 */
function parseRowToProgram(row: string[]): Program {
  const [
    id,
    type,
    title,
    organizer,
    description,
    location,
    day1_start,
    day1_end,
    day2_start,
    day2_end,
    images,
    tags,
    is_food_sold_out,
    menu_items,
  ] = row;

  return {
    id: id || '',
    type: (type as Program['type']) || 'class',
    title: title || '',
    organizer: organizer || '',
    description: description || '',
    location: location || '',
    schedule: {
      day1:
        day1_start && day1_end
          ? { start: day1_start, end: day1_end }
          : null,
      day2:
        day2_start && day2_end
          ? { start: day2_start, end: day2_end }
          : null,
    },
    images: images ? images.split(',').map((img) => img.trim()) : [],
    tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
    isFoodSoldOut: is_food_sold_out === 'TRUE' || is_food_sold_out === '1',
    menuItems: menu_items ? parseMenuItems(menu_items) : undefined,
  };
}

/**
 * メニュー項目をパース（JSON形式を想定）
 */
function parseMenuItems(menuItemsStr: string) {
  try {
    return JSON.parse(menuItemsStr);
  } catch {
    return [];
  }
}

/**
 * キャッシュ管理
 */
const CACHE_KEY = 'rikasai_programs_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5分

interface CacheData {
  data: Program[];
  timestamp: number;
}

export function getCachedPrograms(): Program[] | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp }: CacheData = JSON.parse(cached);
    const now = Date.now();

    if (now - timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

export function setCachedPrograms(programs: Program[]): void {
  try {
    const cacheData: CacheData = {
      data: programs,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Failed to cache programs:', error);
  }
}

export function clearProgramsCache(): void {
  localStorage.removeItem(CACHE_KEY);
}
