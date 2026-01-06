// 梨花祭2026 型定義

export type ProgramType = 'class' | 'club' | 'food';
export type EventType = 'chuyasai' | 'kouyasai' | 'award';
export type LiveUpdateType = 'lost-found' | 'sold-out' | 'announcement';

export interface MenuItem {
  name: string;
  price: number;
  description?: string;
  isSoldOut: boolean;
}

export interface Program {
  id: string;
  type: ProgramType;
  title: string;
  organizer: string; // クラス名 or 部活名
  description: string;
  location: string;
  schedule: {
    day1: { start: string; end: string } | null;
    day2: { start: string; end: string } | null;
  };
  images: string[];
  tags: string[];
  isFoodSoldOut?: boolean; // 飲食のみ
  menuItems?: MenuItem[]; // 飲食のみ
}

export interface Event {
  id: string;
  name: string;
  type: EventType;
  date: string;
  time: { start: string; end: string };
  location: string;
  description: string;
  requiresTicket: boolean;
  ticketInfo?: string;
}

export interface LiveUpdate {
  id: string;
  type: LiveUpdateType;
  timestamp: string;
  content: string;
  relatedProgram?: string;
  images?: string[];
}

export interface FestivalInfo {
  theme: string;
  year: number;
  dates: {
    staffDay: string; // 関係者公開日
    publicDay: string; // 一般公開日
  };
  description: string;
}

export interface AccessInfo {
  address: string;
  transportation: {
    train: string[];
    bus: {
      route: string;
      schedule: { time: string; note?: string }[];
    }[];
  };
}
