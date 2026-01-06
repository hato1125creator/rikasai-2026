import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockEvents } from '@/data/mockData';
import { Calendar, Clock, MapPin, Trophy, Ticket } from 'lucide-react';
import { Link } from 'wouter';

export default function Events() {
  return (
    <Layout>
      {/* ヘッダー */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="font-bold">イベント情報</h1>
            <p className="text-lg text-muted-foreground">
              中夜祭・後夜祭・梨花祭賞など、特別なイベントをご紹介します
            </p>
          </div>
        </div>
      </section>

      {/* イベント一覧 */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <div className="space-y-8">
            {mockEvents.map((event) => (
              <Card
                key={event.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <Badge
                      className={
                        event.type === 'chuyasai'
                          ? 'bg-primary text-primary-foreground'
                          : event.type === 'kouyasai'
                            ? 'bg-secondary text-secondary-foreground'
                            : 'bg-accent text-accent-foreground'
                      }
                    >
                      {event.name}
                    </Badge>
                    {event.requiresTicket && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Ticket className="h-3 w-3" />
                        要チケット
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl">{event.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* 基本情報 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-secondary" />
                        <span>
                          {event.time.start} 〜 {event.time.end}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-accent" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    {/* 説明 */}
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>

                    {/* チケット情報 */}
                    {event.ticketInfo && (
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm font-semibold mb-1">
                          チケット情報
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {event.ticketInfo}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 梨花祭賞 CTA */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-4xl">
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="py-12">
              <div className="text-center space-y-6">
                <Trophy className="h-16 w-16 mx-auto text-primary" />
                <div>
                  <h2 className="font-bold mb-2">梨花祭賞に投票しよう</h2>
                  <p className="text-muted-foreground">
                    あなたが最も良いと思った企画に投票してください
                  </p>
                </div>
                <Link href="/events/award">
                  <Button size="lg" className="text-base">
                    投票ページへ
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 注意事項 */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>イベント参加時の注意事項</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>
                    中夜祭・後夜祭は事前抽選制です。当選者のみご入場いただけます
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>
                    会場内での飲食は指定エリアのみ可能です
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>
                    イベント中の写真撮影は可能ですが、他の方の迷惑にならないようご配慮ください
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>
                    天候や諸事情により、イベントの内容が変更・中止となる場合があります
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
