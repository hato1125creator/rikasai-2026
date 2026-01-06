/**
 * お知らせの型定義
 */

export type AnnouncementType = 'info' | 'warning' | 'important';

export interface Announcement {
  id: string;
  type: AnnouncementType;
  title: string;
  content: string;
  timestamp: string;
  priority: number; // 1-5, 5が最高優先度
}

export interface AnnouncementResponse {
  success: boolean;
  announcements: Announcement[];
  timestamp: string;
}
