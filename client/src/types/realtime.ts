/**
 * リアルタイム情報の型定義
 */

export type RealTimeInfoType = 'lost' | 'sold_out';
export type RealTimeInfoStatus = 'active' | 'resolved';

export interface RealTimeInfo {
  id: string;
  type: RealTimeInfoType;
  title: string;
  description: string;
  location: string;
  timestamp: string;
  status: RealTimeInfoStatus;
}

export interface RealTimeInfoResponse {
  success: boolean;
  realTimeInfo: RealTimeInfo[];
  timestamp: string;
}
