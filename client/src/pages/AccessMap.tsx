import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Info } from 'lucide-react';
import InteractiveMap from '@/components/InteractiveMap';
import { mapFloors } from '@/data/mapData';
import type { MapLocation } from '@/types/map';

export default function AccessMap() {
  return (
    <Layout>
      {/* ヘッダー */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="font-bold">校内マップ</h1>
            <p className="text-lg text-muted-foreground">
              各企画の場所や施設の位置を確認できます
            </p>
          </div>
        </div>
      </section>

      {/* マップ */}
      <section className="py-12">
        <div className="container max-w-6xl">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                校内マップ（全体図）
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InteractiveMap 
                floors={mapFloors}
                onLocationSelect={(location: MapLocation) => {
                  console.log('Selected location:', location);
                }}
              />
            </CardContent>
          </Card>

          {/* フロア別案内 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">1階</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Badge className="bg-primary text-primary-foreground">
                      クラス
                    </Badge>
                    <span>1-A教室: お化け屋敷</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge className="bg-primary text-primary-foreground">
                      クラス
                    </Badge>
                    <span>1-B教室: 謎解きゲーム</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge className="bg-secondary text-secondary-foreground">
                      部活
                    </Badge>
                    <span>美術室: 美術部作品展示</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge className="bg-accent text-accent-foreground">
                      施設
                    </Badge>
                    <span>体育館入口: 本部・受付</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">2階</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Badge className="bg-primary text-primary-foreground">
                      クラス
                    </Badge>
                    <span>2-A教室: カフェ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge className="bg-primary text-primary-foreground">
                      クラス
                    </Badge>
                    <span>2-B教室: 縁日</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge className="bg-secondary text-secondary-foreground">
                      部活
                    </Badge>
                    <span>音楽室: 軽音楽部展示</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge className="bg-accent text-accent-foreground">
                      施設
                    </Badge>
                    <span>保健室: 救護室</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">3階</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Badge className="bg-primary text-primary-foreground">
                      クラス
                    </Badge>
                    <span>3-A教室: 映画上映</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge className="bg-primary text-primary-foreground">
                      クラス
                    </Badge>
                    <span>3-B教室: プラネタリウム</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge className="bg-secondary text-secondary-foreground">
                      部活
                    </Badge>
                    <span>理科室: 科学部実験ショー</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">屋外エリア</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Badge className="bg-accent text-accent-foreground">
                      飲食
                    </Badge>
                    <span>中庭: 屋台エリア</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge className="bg-secondary text-secondary-foreground">
                      部活
                    </Badge>
                    <span>中庭ステージ: 軽音楽部ライブ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge className="bg-accent text-accent-foreground">
                      施設
                    </Badge>
                    <span>体育館: 中夜祭・後夜祭会場</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge className="bg-accent text-accent-foreground">
                      施設
                    </Badge>
                    <span>グラウンド: 休憩スペース</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* 施設案内 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                主要施設のご案内
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">トイレ</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 各階の東西に設置</li>
                    <li>• 多目的トイレ: 1階西側</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">自動販売機</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 1階エントランス</li>
                    <li>• 2階廊下中央</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">休憩スペース</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 中庭ベンチエリア</li>
                    <li>• グラウンド観覧席</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">救護室</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 2階保健室</li>
                    <li>• AED設置場所: 保健室・体育館</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
