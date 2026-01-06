import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertCircle, ShoppingBag, Instagram, RotateCw, Bell, ChevronRight } from 'lucide-react';
import { useRealTimeInfo } from '@/hooks/useRealTimeInfo';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { useState } from 'react';
import type { Announcement } from '@/types/announcement';

export default function Live() {
  const { data: realTimeInfo, loading, refetch } = useRealTimeInfo();
  const { data: announcements, refetch: refetchAnnouncements } = useAnnouncements();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([refetch(), refetchAnnouncements()]);
    setIsRefreshing(false);
  };

  const lostItems = realTimeInfo.filter(item => item.type === 'lost');
  const soldOutItems = realTimeInfo.filter(item => item.type === 'sold_out');
  return (
    <Layout>
      {/* ヘッダー */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="font-bold">リアルタイム情報</h1>
            <p className="text-lg text-muted-foreground">
              落とし物、売り切れ情報、最新のお知らせをお届けします
            </p>
          </div>
        </div>
      </section>

      {/* 最新情報 */}
      <section className="py-12">
        <div className="container max-w-4xl">
          {/* Instagram連携案内 */}
          <Card className="mb-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="py-8">
              <div className="text-center space-y-4">
                <Instagram className="h-12 w-12 mx-auto text-primary" />
                <div>
                  <h3 className="font-bold text-xl mb-2">公式Instagram</h3>
                  <p className="text-muted-foreground">
                    最新情報は公式Instagramでも随時更新中
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    ハッシュタグ: <span className="font-semibold">#梨花祭2026</span>
                  </p>
                </div>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Badge className="bg-primary text-primary-foreground text-base px-4 py-2 cursor-pointer hover:opacity-80 transition-opacity">
                    Instagramを見る
                  </Badge>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* 売り切れ情報 */}
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-destructive" />
                売り切れ情報
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={loading || isRefreshing}
              >
                <RotateCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {soldOutItems.length > 0 ? (
                  soldOutItems.map(item => (
                    <div key={item.id} className="flex items-start justify-between gap-4 p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          場所: {item.location}
                        </p>
                      </div>
                      <Badge variant="destructive">売り切れ</Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    現在、売り切れ情報はありません
                  </p>
                )}
                <p className="text-xs text-muted-foreground text-center pt-2">
                  <Clock className="h-3 w-3 inline mr-1" />
                  自動更新: 5分ごと
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 落とし物情報 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-accent" />
                落とし物情報
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lostItems.length > 0 ? (
                  lostItems.map(item => (
                    <div key={item.id} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <p className="font-semibold">{item.title}</p>
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.timestamp).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                        <br />
                        発見場所: {item.location}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    現在、落とし物情報はありません
                  </p>
                )}
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold text-primary mb-1">
                    落とし物のお問い合わせ
                  </p>
                  <p className="text-xs text-muted-foreground">
                    落とし物に関するお問い合わせは、本部（体育館入口）までお越しください。
                    <br />
                    身分証明書をご持参の上、落とし物の特徴をお伝えください。
                  </p>
                </div>
                <p className="text-xs text-muted-foreground text-center pt-2">
                  <Clock className="h-3 w-3 inline mr-1" />
                  自動更新: 5分ごと
                </p>
              </div>
            </CardContent>
          </Card>

          {/* お知らせ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                最新のお知らせ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {announcements.length > 0 ? (
                  announcements.map((announcement: Announcement) => {
                    const priorityColor = announcement.priority >= 5 ? 'destructive' : announcement.priority >= 4 ? 'secondary' : 'default';
                    return (
                      <div
                        key={announcement.id}
                        className="p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedAnnouncement(announcement);
                          setAnnouncementModalOpen(true);
                        }}
                      >
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <p className="font-semibold flex-1">{announcement.title}</p>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge variant={priorityColor as any}>
                              {announcement.type === 'important' ? '緊急' : announcement.type === 'warning' ? '注意' : '情報'}
                            </Badge>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {announcement.content}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(announcement.timestamp).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    現在、お知らせはありません
                  </p>
                )}
                <p className="text-xs text-muted-foreground text-center pt-2">
                  <Clock className="h-3 w-3 inline mr-1" />
                  自動更新: 5分ごと
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* お知らせ詳細モーダル */}
      {selectedAnnouncement && (
        <Dialog open={announcementModalOpen} onOpenChange={setAnnouncementModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="flex items-start justify-between gap-4">
                <DialogTitle className="flex-1">{selectedAnnouncement.title}</DialogTitle>
                <Badge
                  variant={
                    selectedAnnouncement.priority >= 5
                      ? 'destructive'
                      : selectedAnnouncement.priority >= 4
                        ? 'secondary'
                        : 'default'
                  }
                >
                  {selectedAnnouncement.type === 'important'
                    ? '緊急'
                    : selectedAnnouncement.type === 'warning'
                      ? '注意'
                      : '情報'}
                </Badge>
              </div>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">投稿日時</p>
                <p className="text-sm">
                  {new Date(selectedAnnouncement.timestamp).toLocaleString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">内容</p>
                <p className="text-sm whitespace-pre-wrap">{selectedAnnouncement.content}</p>
              </div>
            </div>
            <DialogClose asChild>
              <Button variant="outline" className="w-full">
                閉じる
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
    </Layout>
  );
}
