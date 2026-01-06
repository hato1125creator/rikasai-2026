import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock } from 'lucide-react';
import { Program } from '@/types';


interface ProgramCardProps {
  program: Program;
}

const programTypeLabels: Record<Program['type'], string> = {
  class: 'クラス発表',
  club: '部活動',
  stage: 'ステージ',
  exhibition: '展示',
  food: '飲食',
};

const programTypeColors: Record<Program['type'], string> = {
  class: 'bg-blue-100 text-blue-800',
  club: 'bg-purple-100 text-purple-800',
  stage: 'bg-yellow-100 text-yellow-800',
  exhibition: 'bg-green-100 text-green-800',
  food: 'bg-orange-100 text-orange-800',
};

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

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {program.images.length > 0 && (
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={program.images[0]}
            alt={program.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge className={programTypeColors[program.type]}>
            {programTypeLabels[program.type]}
          </Badge>
          {program.type === 'food' && program.isFoodSoldOut && (
            <Badge variant="destructive">売り切れ</Badge>
          )}
        </div>
        <h3 className="font-bold text-lg">{program.title}</h3>
        <p className="text-sm text-muted-foreground">{program.organizer}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-2 mb-4">{program.description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{program.location}</span>
          </div>
          {(program.schedule.day1 || program.schedule.day2) && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                {program.schedule.day1 &&
                  `7/18: ${formatTime(program.schedule.day1.start)}〜${formatTime(program.schedule.day1.end)}`}
                {program.schedule.day1 && program.schedule.day2 && ' / '}
                {program.schedule.day2 &&
                  `7/19: ${formatTime(program.schedule.day2.start)}〜${formatTime(program.schedule.day2.end)}`}
              </span>
            </div>
          )}
        </div>
        {program.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-4">
            {program.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

    </Card>
  );
}
