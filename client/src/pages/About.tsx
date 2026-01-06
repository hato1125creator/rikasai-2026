import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { festivalInfo } from '@/data/mockData';
import { Calendar, Clock, MapPin, Info, AlertCircle } from 'lucide-react';

export default function About() {
  return (
    <Layout>
      {/* ヘッダー */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="font-bold">梨花祭について</h1>
            <p className="text-lg text-muted-foreground">
              テーマ、開催概要、ルール・注意事項をご確認ください
            </p>
          </div>
        </div>
      </section>

      {/* テーマ・開催概要 */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                テーマ・開催概要
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-bold text-xl mb-2">
                  {festivalInfo.year}年度テーマ
                </h3>
                <p className="text-2xl font-bold text-primary">
                  {festivalInfo.theme}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3">開催日程</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">関係者公開日</p>
                      <p className="text-muted-foreground">
                        {festivalInfo.dates.staffDay}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <p className="font-semibold">一般公開日</p>
                      <p className="text-muted-foreground">
                        {festivalInfo.dates.publicDay}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-semibold">開催時間</p>
                      <p className="text-muted-foreground">10:00 〜 16:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">会場</p>
                      <p className="text-muted-foreground">
                        梨花学園 校内各所
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3">梨花祭とは</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {festivalInfo.description}
                  生徒たちが一丸となって準備を進め、来場者の皆様に楽しんでいただける企画を多数ご用意しています。
                  ぜひ、梨花祭で素敵な思い出を作ってください。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* ルール・注意事項 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                ルール・注意事項
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-3">来場者の皆様へ</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span>
                        校内では係員の指示に従い、安全にお過ごしください
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span>
                        ゴミは各自でお持ち帰りいただくか、指定のゴミ箱に分別して捨ててください
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span>
                        校内での喫煙、飲酒は固くお断りします
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span>
                        写真撮影は個人の範囲内でお願いします。SNSへの投稿時は、他の方の顔が写らないようご配慮ください
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span>
                        ペットの同伴はご遠慮ください（盲導犬・介助犬を除く）
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3">生徒の皆さんへ</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary font-bold mt-1">•</span>
                      <span>
                        スマートフォンの使用は、企画運営に必要な範囲内に限ります
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary font-bold mt-1">•</span>
                      <span>
                        異装（コスプレ等）は事前に申請し、許可を得たもののみ可能です
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary font-bold mt-1">•</span>
                      <span>
                        企画で使用する音楽や映像は、著作権に配慮し、適切な手続きを行ってください
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary font-bold mt-1">•</span>
                      <span>
                        飲食物を提供する企画は、衛生管理を徹底してください
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary font-bold mt-1">•</span>
                      <span>
                        トラブルが発生した場合は、速やかに教員や実行委員に報告してください
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <h4 className="font-semibold text-destructive mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    緊急時の対応
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    体調不良や怪我、その他緊急事態が発生した場合は、最寄りの係員または本部（体育館入口）までお知らせください。
                    AEDは保健室と体育館に設置されています。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
