// フロア図のピクセルサイズ: 768 x 1024
// 座標はスクリーンショットから直接測定した正確な値

export interface ClassroomInfo {
  id: string;
  name: string;
  type: 'classroom' | 'club' | 'facility' | 'wc' | 'stairs' | 'other';
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  description?: string;
  programs?: string[];
}

// 1階のデータ（スクリーンショットから測定した正確な座標）
export const floor1: ClassroomInfo[] = [
  // 左下グループ（1-1, 1-2）
  { id: '1-1', name: '1-1', type: 'classroom', x: 40, y: 760, width: 110, height: 80, color: '#FFB3BA', description: 'クラス発表' },
  { id: '1-2', name: '1-2', type: 'classroom', x: 40, y: 660, width: 110, height: 80, color: '#FFB3BA', description: 'クラス発表' },
  
  // 中央左グループ（1-3, 1-4, 1-5, 1-6）
  { id: '1-3', name: '1-3', type: 'classroom', x: 180, y: 660, width: 110, height: 80, color: '#FFB3BA', description: 'クラス発表' },
  { id: '1-4', name: '1-4', type: 'classroom', x: 180, y: 560, width: 110, height: 80, color: '#FFB3BA', description: 'クラス発表' },
  { id: '1-5', name: '1-5', type: 'classroom', x: 300, y: 660, width: 110, height: 80, color: '#FFB3BA', description: 'クラス発表' },
  { id: '1-6', name: '1-6', type: 'classroom', x: 300, y: 560, width: 110, height: 80, color: '#FFB3BA', description: 'クラス発表' },
  
  // 中央（1-E）
  { id: '1-E', name: '1-E', type: 'classroom', x: 180, y: 460, width: 110, height: 80, color: '#FFB3BA', description: 'クラス発表' },
  
  // 右側グループ（1-7, 2-11, 3-3, 3-4）
  { id: '1-7', name: '1-7', type: 'classroom', x: 510, y: 660, width: 110, height: 80, color: '#FFB3BA', description: 'クラス発表' },
  { id: '2-11', name: '2-11', type: 'classroom', x: 510, y: 560, width: 110, height: 80, color: '#B3E5B3', description: 'クラス発表' },
  { id: '3-3', name: '3-3', type: 'classroom', x: 510, y: 300, width: 110, height: 80, color: '#B3D9FF', description: 'クラス発表' },
  { id: '3-4', name: '3-4', type: 'classroom', x: 510, y: 200, width: 110, height: 80, color: '#B3D9FF', description: 'クラス発表' },
  
  // WC
  { id: 'wc-male-1', name: '男WC', type: 'wc', x: 180, y: 760, width: 90, height: 60, color: '#ADD8E6' },
  { id: 'wc-female-1', name: '女WC', type: 'wc', x: 630, y: 460, width: 60, height: 50, color: '#FFB6C1' },
];

// 2階のデータ（フロア図から正確に測定した座標）
export const floor2: ClassroomInfo[] = [
  // 左側（2-1, 2-2）- 左下の角
  { id: '2-1', name: '2-1', type: 'classroom', x: 40, y: 820, width: 110, height: 80, color: '#B3E5B3', description: 'クラス発表' },
  { id: '2-2', name: '2-2', type: 'classroom', x: 40, y: 720, width: 110, height: 80, color: '#B3E5B3', description: 'クラス発表' },
  
  // 中央左（2-3, 2-4, 2-5, 2-6）
  { id: '2-3', name: '2-3', type: 'classroom', x: 200, y: 620, width: 110, height: 80, color: '#B3E5B3', description: 'クラス発表' },
  { id: '2-4', name: '2-4', type: 'classroom', x: 200, y: 520, width: 110, height: 80, color: '#B3E5B3', description: 'クラス発表' },
  { id: '2-5', name: '2-5', type: 'classroom', x: 200, y: 420, width: 110, height: 80, color: '#B3E5B3', description: 'クラス発表' },
  { id: '2-6', name: '2-6', type: 'classroom', x: 200, y: 320, width: 110, height: 80, color: '#B3E5B3', description: 'クラス発表' },
  
  // 右側（3-5, 3-6, 3-7, 3-8）
  { id: '3-5', name: '3-5', type: 'classroom', x: 520, y: 620, width: 110, height: 80, color: '#B3D9FF', description: 'クラス発表' },
  { id: '3-6', name: '3-6', type: 'classroom', x: 520, y: 520, width: 110, height: 80, color: '#B3D9FF', description: 'クラス発表' },
  { id: '3-7', name: '3-7', type: 'classroom', x: 520, y: 420, width: 110, height: 80, color: '#B3D9FF', description: 'クラス発表' },
  { id: '3-8', name: '3-8', type: 'classroom', x: 520, y: 320, width: 110, height: 80, color: '#B3D9FF', description: 'クラス発表' },
  
  // 上部（3-E, 3-9, 3-2）
  { id: '3-E', name: '3-E', type: 'classroom', x: 300, y: 100, width: 110, height: 80, color: '#B3D9FF', description: 'クラス発表' },
  { id: '3-9', name: '3-9', type: 'classroom', x: 420, y: 100, width: 110, height: 80, color: '#B3D9FF', description: 'クラス発表' },
  { id: '3-2', name: '3-2', type: 'classroom', x: 540, y: 100, width: 110, height: 80, color: '#B3D9FF', description: 'クラス発表' },
  
  // WC
  { id: 'wc-male-2', name: '男WC', type: 'wc', x: 200, y: 420, width: 90, height: 60, color: '#ADD8E6' },
  { id: 'wc-female-2', name: '女WC', type: 'wc', x: 630, y: 520, width: 60, height: 50, color: '#FFB6C1' },
];

// 3階のデータ（スクリーンショットから測定した正確な座標）
export const floor3: ClassroomInfo[] = [
  // 上部（2-7, 2-8, 2-12）
  { id: '2-7', name: '2-7', type: 'classroom', x: 180, y: 60, width: 110, height: 80, color: '#B3E5B3', description: 'クラス発表' },
  { id: '2-8', name: '2-8', type: 'classroom', x: 300, y: 60, width: 110, height: 80, color: '#B3E5B3', description: 'クラス発表' },
  { id: '2-12', name: '2-12', type: 'classroom', x: 420, y: 60, width: 110, height: 80, color: '#B3E5B3', description: 'クラス発表' },
  
  // 左側（1-1, 1-2, 1-3, 1-4, 1-5, 1-6）
  { id: '1-1', name: '1-1', type: 'classroom', x: 40, y: 760, width: 110, height: 80, color: '#FFB3BA', description: 'クラス発表' },
  { id: '1-2', name: '1-2', type: 'classroom', x: 40, y: 660, width: 110, height: 80, color: '#FFB3BA', description: 'クラス発表' },
  { id: '1-3', name: '1-3', type: 'classroom', x: 180, y: 560, width: 110, height: 80, color: '#FFB3BA', description: 'クラス発表' },
  { id: '1-4', name: '1-4', type: 'classroom', x: 180, y: 460, width: 110, height: 80, color: '#FFB3BA', description: 'クラス発表' },
  { id: '1-5', name: '1-5', type: 'classroom', x: 180, y: 360, width: 110, height: 80, color: '#FFB3BA', description: 'クラス発表' },
  { id: '1-6', name: '1-6', type: 'classroom', x: 180, y: 260, width: 110, height: 80, color: '#FFB3BA', description: 'クラス発表' },
  
  // 右側（2-9, 2-E）
  { id: '2-9', name: '2-9', type: 'classroom', x: 510, y: 460, width: 110, height: 80, color: '#B3E5B3', description: 'クラス発表' },
  { id: '2-E', name: '2-E', type: 'classroom', x: 510, y: 560, width: 110, height: 80, color: '#B3E5B3', description: 'クラス発表' },
  
  // WC
  { id: 'wc-male-3', name: '男WC', type: 'wc', x: 180, y: 760, width: 90, height: 60, color: '#ADD8E6' },
  { id: 'wc-female-3', name: '女WC', type: 'wc', x: 630, y: 460, width: 60, height: 50, color: '#FFB6C1' },
];

export const allFloors = {
  floor1,
  floor2,
  floor3,
};
