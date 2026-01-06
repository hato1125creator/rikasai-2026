import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, ChefHat } from 'lucide-react';
import type { Program } from '@/types';

interface ProgramDetailModalProps {
  program: Program | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// 時間フォーマット関数
function formatTime(timeString: string): string {
  if (!timeString) return '';
  
  // ISO形式の場合（例：1899-12-30T10:00:00.000Z）
  if (timeString.includes('T')) {
    const match = timeString.match(/T(\d{2}):(\d{2})/);
    if (match) {
      return `${match[1]}:${match[2]}`;
    }
  }
  
  // 既に「HH:MM」形式の場合
  if (timeString.match(/^\d{2}:\d{2}$/)) {
    return timeString;
  }
  
  return timeString;
}

export default function ProgramDetailModal({
  program,
  open,
  onOpenChange,
}: ProgramDetailModalProps) {
  if (!program) return null;

  const typeLabel = {
    class: 'クラス発表',
    club: '部活動',
    food: '飲食',
    stage: 'ステージ',
    exhibition: '展示',
  }[program.type] || program.type;

  const typeColor = {
    class: 'bg-blue-100 text-blue-800',
    club: 'bg-purple-100 text-purple-800',
    food: 'bg-orange-100 text-orange-800',
    stage: 'bg-yellow-100 text-yellow-800',
    exhibition: 'bg-green-100 text-green-800',
  }[program.type] || 'bg-gray-100 text-gray-800';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{program.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* タイプと主催者 */}
          <div className="flex flex-wrap gap-2">
            <Badge className={typeColor}>{typeLabel}</Badge>
            {program.tags?.map(tag => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* 説明 */}
          <div>
            <h3 className="font-semibold mb-2">説明</h3>
            <p className="text-muted-foreground">{program.description}</p>
          </div>

          {/* 主催者 */}
          <div className="flex items-start gap-2">
            <Users className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">主催者</p>
              <p className="font-semibold">{program.organizer}</p>
            </div>
          </div>

          {/* 場所 */}
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">場所</p>
              <p className="font-semibold">{program.location}</p>
            </div>
          </div>

          {/* スケジュール */}
          <div className="flex items-start gap-2">
            <Clock className="h-5 w-5 text-muted-foreground mt-1" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">スケジュール</p>
              <div className="space-y-2">
                {program.schedule?.day1 && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm font-semibold">7月18日（金）</p>
                    <p className="text-sm text-muted-foreground">
                      {formatTime(program.schedule.day1.start)} ～ {formatTime(program.schedule.day1.end)}
                    </p>
                  </div>
                )}
                {program.schedule?.day2 && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm font-semibold">7月19日（土）</p>
                    <p className="text-sm text-muted-foreground">
                      {formatTime(program.schedule.day2.start)} ～ {formatTime(program.schedule.day2.end)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* メニュー表（飲食団体のみ） */}
          {program.type === 'food' && program.menuItems && program.menuItems.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ChefHat className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold">メニュー</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-semibold">商品名</th>
                      <th className="text-right py-2 px-3 font-semibold">価格</th>
                      <th className="text-center py-2 px-3 font-semibold">状態</th>
                    </tr>
                  </thead>
                  <tbody>
                    {program.menuItems.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-2 px-3">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            {item.description && (
                              <p className="text-xs text-muted-foreground">{item.description}</p>
                            )}
                          </div>
                        </td>
                        <td className="text-right py-2 px-3 font-semibold">
                          ¥{item.price.toLocaleString()}
                        </td>
                        <td className="text-center py-2 px-3">
                          {item.isSoldOut ? (
                            <Badge variant="destructive">売り切れ</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">販売中</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {program.isFoodSoldOut && (
                <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                  ⚠️ この企画は売り切れました
                </div>
              )}
            </div>
          )}

          {/* 画像 */}
          {program.images && program.images.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">画像</p>
              <div className="grid grid-cols-2 gap-2">
                {program.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${program.title} ${index + 1}`}
                    className="rounded-lg w-full h-40 object-cover"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
