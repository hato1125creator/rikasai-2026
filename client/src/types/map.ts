/**
 * 校内マップの型定義
 */

export interface MapLocation {
  id: string;
  name: string;
  x: number; // SVG座標 (0-100%)
  y: number; // SVG座標 (0-100%)
  radius: number; // ホットスポットの半径
  programId: string;
  type: 'class' | 'club' | 'food' | 'stage' | 'other';
  color: string;
}

export interface MapFloor {
  id: string;
  name: string;
  floor: number;
  locations: MapLocation[];
}

export interface InteractiveMapState {
  selectedFloor: string;
  selectedLocation: MapLocation | null;
  hoveredLocation: MapLocation | null;
}
