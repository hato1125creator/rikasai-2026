import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import ProgramCard from '@/components/ProgramCard';
import { festivalInfo, mockEvents } from '@/data/mockData';
import { usePrograms } from '@/hooks/usePrograms';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import { useRealTimeInfo } from '@/hooks/useRealTimeInfo';
import { Link } from 'wouter';
import { Calendar, MapPin, Sparkles, Trophy, Clock, Info, AlertCircle, Package } from 'lucide-react';

export default function Home() {
  const { programs } = usePrograms();
  const { data: announcements } = useAnnouncements();
  const { data: realTimeInfo } = useRealTimeInfo();

  // 注目の企画（最初の3つ）
  const featuredPrograms = programs.slice(0, 3);
  // 重要なお知らせ（最新の3つ）
  const latestAnnouncements = announcements.slice(0, 3);
  // リアルタイム情報（最新の3つ）
  const latestRealTimeInfo = realTimeInfo.slice(0, 3);

  return (
    <Layout>
      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge className="bg-primary text-primary-foreground text-base px-4 py-2">
              <Sparkles className="h-4 w-4 inline mr-2" />
              {festivalInfo.year}年度
            </Badge>
            <h1 className="font-black text-4xl md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                千葉英和高等学校 梨花祭2026
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-foreground/80">
              {festivalInfo.theme}
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {festivalInfo.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <div className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="font-semibold">{festivalInfo.dates.publicDay}</span>
              </div>
              <div className="hidden sm:block text-muted-foreground">|</div>
              <div className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-secondary" />
                <span className="font-semibold">10:00 〜 16:00</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Link href="/programs">
                <Button size="lg" className="text-base">
                  企画を見る
                </Button>
              </Link>
              <Link href="/access">
                <Button size="lg" variant="outline" className="text-base">
                  <MapPin className="h-4 w-4 mr-2" />
                  アクセス
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* お知らせセクション */}
      <section className="py-12 bg-accent/20">
        <div className="container">
          <Card className="border-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-accent-foreground" />
                重要なお知らせ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                {latestAnnouncements.length > 0 ? (
                  latestAnnouncements.map((announcement) => (
                    <li key={announcement.id} className="flex items-start gap-2">
                      <Badge variant={announcement.priority >= 4 ? "destructive" : "outline"} className="mt-0.5 shrink-0">
                        {announcement.type === 'important' ? '重要' : 'お知らせ'}
                      </Badge>
                      <div className="flex flex-col">
                        <span className="font-bold">{announcement.title}</span>
                        <span className="text-muted-foreground text-xs">{announcement.content}</span>
                      </div>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-foreground font-bold">•</span>
                      <span>
                        <strong>関係者公開日：</strong>{festivalInfo.dates.staffDay}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-foreground font-bold">•</span>
                      <span>
                        <strong>一般公開日：</strong>{festivalInfo.dates.publicDay}
                      </span>
                    </li>
                  </>
                )}
                <li className="flex items-start gap-2 pt-2 border-t border-accent/20">
                  <span className="text-accent-foreground font-bold">•</span>
                  <span>
                    スクールバスの時刻表は
                    <Link href="/access" className="text-primary hover:underline ml-1">
                      アクセス情報
                    </Link>
                    をご確認ください
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 注目の企画 */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-bold mb-4">注目の企画</h2>
            <p className="text-muted-foreground">
              今年の梨花祭で特に人気の企画をピックアップ
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/programs">
              <Button variant="outline" size="lg">
                すべての企画を見る
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* リアルタイム情報 */}
      <section className="py-16 bg-muted/20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-bold mb-4">リアルタイム情報</h2>
            <p className="text-muted-foreground">
              梨花祭の最新情報をチェック
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {latestRealTimeInfo.map((info) => {
              const isLostFound = info.type === 'lost';
              const isSoldOut = info.type === 'sold_out';
              const bgColor = isLostFound ? 'bg-blue-50 border-blue-200' : isSoldOut ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200';
              const badgeColor = isLostFound ? 'bg-blue-100 text-blue-800' : isSoldOut ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800';
              const IconComponent = isLostFound ? Package : AlertCircle;

              return (
                <Card key={info.id} className={`${bgColor} border hover:shadow-lg transition-shadow`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <Badge className={badgeColor}>
                        {isLostFound ? '落とし物' : isSoldOut ? '売り切れ' : 'お知らせ'}
                      </Badge>
                      <IconComponent className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-base mt-2">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{info.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{info.location}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/live">
              <Button variant="outline" size="lg">
                リアルタイム情報をもっと見る
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* イベント情報 */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-bold mb-4">イベント情報</h2>
            <p className="text-muted-foreground">
              中夜祭・後夜祭・梨花祭賞など、特別なイベントをチェック
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {mockEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge
                    className={
                      event.type === 'chuyasai'
                        ? 'bg-primary text-primary-foreground w-fit'
                        : event.type === 'kouyasai'
                          ? 'bg-secondary text-secondary-foreground w-fit'
                          : 'bg-accent text-accent-foreground w-fit'
                    }
                  >
                    {event.name}
                  </Badge>
                  <CardTitle className="text-lg mt-2">{event.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        {event.time.start} 〜 {event.time.end}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="text-sm mt-4 text-muted-foreground line-clamp-2">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/events">
              <Button variant="outline" size="lg">
                イベント詳細を見る
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 梨花祭賞 */}
      <section className="py-16">
        <div className="container">
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="py-12">
              <div className="max-w-2xl mx-auto text-center space-y-6">
                <Trophy className="h-16 w-16 mx-auto text-primary" />
                <h2 className="font-bold">梨花祭賞に投票しよう</h2>
                <p className="text-muted-foreground">
                  あなたが最も良いと思った企画に投票してください。
                  <br />
                  投票は梨花祭開催期間中に受け付けています。
                </p>
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

      {/* クイックリンク */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-bold mb-4">クイックリンク</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Link href="/about">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="py-8 text-center">
                  <Info className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold">梨花祭について</h3>
                </CardContent>
              </Card>
            </Link>
            <Link href="/access/map">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="py-8 text-center">
                  <MapPin className="h-8 w-8 mx-auto mb-4 text-secondary" />
                  <h3 className="font-semibold">校内マップ</h3>
                </CardContent>
              </Card>
            </Link>
            <Link href="/media">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="py-8 text-center">
                  <Sparkles className="h-8 w-8 mx-auto mb-4 text-accent" />
                  <h3 className="font-semibold">広報資料</h3>
                </CardContent>
              </Card>
            </Link>
            <Link href="/live">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="py-8 text-center">
                  <Clock className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold">リアルタイム情報</h3>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
