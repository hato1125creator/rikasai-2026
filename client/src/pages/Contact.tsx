import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <Layout>
      {/* ヘッダー */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="font-bold">運営・問い合わせ</h1>
            <p className="text-lg text-muted-foreground">
              梨花祭に関するお問い合わせはこちらから
            </p>
          </div>
        </div>
      </section>

      {/* 問い合わせフォーム */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                お問い合わせフォーム
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  梨花祭に関するご質問・ご意見は、以下のフォームからお送りください。
                </p>
                {/* Googleフォーム埋め込み予定エリア */}
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Mail className="h-16 w-16 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">
                      [Googleフォーム埋め込み予定]
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  ※お問い合わせへの回答には数日かかる場合がございます。あらかじめご了承ください。
                  <br />
                  ※緊急のお問い合わせは、下記の電話番号までご連絡ください。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 連絡先情報 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>梨花祭実行委員会 連絡先</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">メールアドレス</p>
                    <p className="text-muted-foreground">
                      rikasai2026@example.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-semibold">電話番号</p>
                    <p className="text-muted-foreground">03-1234-5678</p>
                    <p className="text-xs text-muted-foreground">
                      （平日 9:00〜17:00）
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-semibold">所在地</p>
                    <p className="text-muted-foreground">
                      〒123-4567 東京都○○区○○町1-2-3
                      <br />
                      梨花学園 生徒会室
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 当日の問い合わせ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                梨花祭当日のお問い合わせ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  梨花祭開催期間中（7月18日・19日）は、校内本部でお問い合わせを受け付けています。
                </p>
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <p className="font-semibold mb-2">本部所在地</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    体育館入口
                    <br />
                    受付時間: 9:30〜16:30
                  </p>
                  <p className="font-semibold mb-2">対応内容</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>落とし物のお問い合わせ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>企画・イベントに関するご質問</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>体調不良・怪我の対応</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>その他のお困りごと</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* よくある質問 */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="font-bold text-center mb-8">よくある質問</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Q. 入場料はかかりますか?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A. 入場は無料です。ただし、飲食物の購入や一部の企画には料金がかかる場合があります。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Q. 駐車場はありますか?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A. 申し訳ございませんが、来場者用の駐車場はございません。公共交通機関をご利用ください。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Q. 雨天の場合は開催されますか?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A. 雨天決行です。ただし、荒天の場合は一部企画が中止・変更となる可能性があります。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Q. 小さな子供を連れて行っても大丈夫ですか?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A. もちろん大丈夫です。ファミリー向けの企画も多数ご用意しています。ただし、お子様から目を離さないようお願いいたします。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
