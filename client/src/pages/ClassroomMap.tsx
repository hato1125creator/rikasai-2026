import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { floor1, floor2, floor3, ClassroomInfo } from '@/data/actualClassroomData';

export default function ClassroomMap() {
  const [selectedFloor, setSelectedFloor] = useState<1 | 2 | 3>(1);
  const [selectedRoom, setSelectedRoom] = useState<ClassroomInfo | null>(null);

  const floors = { 1: floor1, 2: floor2, 3: floor3 };
  const currentFloor = floors[selectedFloor];

  // フロア図の背景画像パス
  const floorImages = {
    1: '/floor-maps/floor-1.png',
    2: '/floor-maps/floor-2.png',
    3: '/floor-maps/floor-3.png',
  };

  // フロア図のピクセルサイズ
  const floorWidth = 768;
  const floorHeight = 1024;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">校内マップ</h1>
          <p className="text-gray-600">各教室をタップして詳細を確認</p>
        </div>

        <div className="flex gap-3 justify-center mb-8 flex-wrap">
          {[1, 2, 3].map((floor) => (
            <Button
              key={floor}
              onClick={() => setSelectedFloor(floor as 1 | 2 | 3)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                selectedFloor === floor
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {floor}階
            </Button>
          ))}
        </div>

        {/* フロア図を背景として表示 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative w-full" style={{ height: '800px' }}>
            {/* 背景画像 */}
            <img
              src={floorImages[selectedFloor]}
              alt={`${selectedFloor}階フロア図`}
              className="w-full h-full object-fill"
            />

            {/* インタラクティブホット */}
            <svg
              className="absolute inset-0 w-full h-full cursor-pointer"
              viewBox={`0 0 ${floorWidth} ${floorHeight}`}
              preserveAspectRatio="none"
              style={{ pointerEvents: 'auto', zIndex: 10 }}
            >
              {currentFloor.map((room) => (
                <g
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  style={{ cursor: 'pointer' }}
                  className="group"
                >
                  {/* 透明なホットスポット（クリック領域） */}
                  <rect
                    x={room.x}
                    y={room.y}
                    width={room.width}
                    height={room.height}
                    fill="transparent"
                    stroke="rgba(59, 130, 246, 0.2)"
                    strokeWidth="1"
                    rx="2"
                    className="hover:stroke-blue-500 hover:stroke-width-2 transition-all"
                  />
                  {/* ホバー時のハイライト */}
                  <rect
                    x={room.x}
                    y={room.y}
                    width={room.width}
                    height={room.height}
                    fill="rgba(59, 130, 246, 0.1)"
                    rx="2"
                    opacity="0"
                    className="group-hover:opacity-100 transition-opacity"
                  />
                </g>
              ))}
            </svg>

            {/* 教室ラベル（背景画像の上に表示） */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
              {currentFloor.map((room) => {
                // ピクセル座標をパーセンテージに変換
                const percentX = (room.x / floorWidth) * 100;
                const percentY = (room.y / floorHeight) * 100;
                const percentWidth = (room.width / floorWidth) * 100;
                const percentHeight = (room.height / floorHeight) * 100;

                return (
                  <div
                    key={`label-${room.id}`}
                    className="absolute pointer-events-none group/label"
                    style={{
                      left: `${percentX}%`,
                      top: `${percentY}%`,
                      width: `${percentWidth}%`,
                      height: `${percentHeight}%`,
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center opacity-0 group-hover/label:opacity-100 bg-blue-500 bg-opacity-30 rounded transition-opacity">
                      <span className="text-xs md:text-sm font-bold text-blue-900 text-center px-1 break-words">
                        {room.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 凡例 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-lg mb-4">凡例</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-300 border border-gray-400 rounded"></div>
              <span className="text-sm">1階教室</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-300 border border-gray-400 rounded"></div>
              <span className="text-sm">2階教室</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-300 border border-gray-400 rounded"></div>
              <span className="text-sm">3階教室</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-300 border border-gray-400 rounded"></div>
              <span className="text-sm">部活動</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            💡 ヒント: 教室をタップすると詳細情報が表示されます。フロア図上の教室をタップしても詳細が表示されます。
          </p>
        </div>
      </div>

      {/* 詳細情報モーダル */}
      <Dialog open={!!selectedRoom} onOpenChange={() => setSelectedRoom(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{selectedRoom?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-600">タイプ</p>
              <p className="text-gray-800">
                {selectedRoom?.type === 'classroom'
                  ? '教室'
                  : selectedRoom?.type === 'club'
                    ? '部活動'
                    : selectedRoom?.type === 'wc'
                      ? 'トイレ'
                      : '施設'}
              </p>
            </div>
            {selectedRoom?.description && (
              <div>
                <p className="text-sm font-semibold text-gray-600">説明</p>
                <p className="text-gray-800">{selectedRoom.description}</p>
              </div>
            )}
            <Button
              onClick={() => setSelectedRoom(null)}
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              閉じる
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
