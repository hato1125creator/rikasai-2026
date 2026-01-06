import { useState } from "react";
import type { MapFloor, MapLocation } from "@/types/map";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { locationTypeLabels, locationTypeColors } from "@/data/mapData";

interface InteractiveMapProps {
  floors: MapFloor[];
  onLocationSelect?: (location: MapLocation) => void;
}

export default function InteractiveMap({ floors, onLocationSelect }: InteractiveMapProps) {
  const [selectedFloor, setSelectedFloor] = useState<string>(floors[0]?.id || "");
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<MapLocation | null>(null);

  const currentFloor = floors.find((f) => f.id === selectedFloor);

  const handleLocationClick = (location: MapLocation) => {
    setSelectedLocation(location);
    onLocationSelect?.(location);
  };

  return (
    <div className="w-full space-y-4">
      {/* フロア選択タブ */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {floors.map((floor) => (
          <Button
            key={floor.id}
            variant={selectedFloor === floor.id ? "default" : "outline"}
            onClick={() => setSelectedFloor(floor.id)}
            className="whitespace-nowrap"
          >
            {floor.name}
          </Button>
        ))}
      </div>

      {/* マップコンテナ */}
      {currentFloor && (
        <div className="relative w-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 overflow-hidden">
          {/* SVGマップ */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-auto aspect-square cursor-pointer"
            style={{ minHeight: "400px" }}
          >
            {/* 背景グリッド */}
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />

            {/* ホットスポット */}
            {currentFloor.locations.map((location) => (
              <g
                key={location.id}
                onClick={() => handleLocationClick(location)}
                onMouseEnter={() => setHoveredLocation(location)}
                onMouseLeave={() => setHoveredLocation(null)}
                className="cursor-pointer group"
              >
                {/* ホバー時の背景円 */}
                {hoveredLocation?.id === location.id && (
                  <circle
                    cx={location.x}
                    cy={location.y}
                    r={location.radius + 2}
                    fill={location.color}
                    opacity="0.2"
                  />
                )}

                {/* メイン円 */}
                <circle
                  cx={location.x}
                  cy={location.y}
                  r={location.radius}
                  fill={location.color}
                  opacity={hoveredLocation?.id === location.id ? 0.9 : 0.7}
                  className="transition-opacity duration-200"
                />

                {/* 枠線 */}
                <circle
                  cx={location.x}
                  cy={location.y}
                  r={location.radius}
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  opacity={hoveredLocation?.id === location.id ? 1 : 0.8}
                />

                {/* テキスト */}
                <text
                  x={location.x}
                  y={location.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="pointer-events-none select-none"
                  fill="white"
                  fontSize="2"
                  fontWeight="bold"
                  opacity={hoveredLocation?.id === location.id ? 1 : 0.9}
                >
                  {location.name.length > 6
                    ? location.name.substring(0, 5) + "..."
                    : location.name}
                </text>
              </g>
            ))}
          </svg>

          {/* 凡例 */}
          <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg p-3 shadow-md">
            <div className="text-xs font-semibold mb-2">凡例</div>
            <div className="space-y-1">
              {Object.entries(locationTypeColors).map(([type, color]) => (
                <div key={type} className="flex items-center gap-2 text-xs">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span>{locationTypeLabels[type]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 詳細モーダル */}
      <Dialog open={!!selectedLocation} onOpenChange={(open) => !open && setSelectedLocation(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{selectedLocation?.name}</DialogTitle>
          </DialogHeader>
          {selectedLocation && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge
                  style={{
                    backgroundColor: selectedLocation.color,
                  }}
                  className="text-white"
                >
                  {locationTypeLabels[selectedLocation.type]}
                </Badge>
                <Badge variant="outline">{currentFloor?.name}</Badge>
              </div>

              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-semibold">場所:</span> {selectedLocation.name}
                </div>
                <div className="text-sm">
                  <span className="font-semibold">フロア:</span> {currentFloor?.name}
                </div>
                <div className="text-sm">
                  <span className="font-semibold">座標:</span> ({selectedLocation.x}%, {selectedLocation.y}%)
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-sm text-slate-600">
                  このスポットをタップすると、企画の詳細情報が表示されます。
                </p>
              </div>

              <Button
                onClick={() => setSelectedLocation(null)}
                className="w-full"
              >
                閉じる
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
