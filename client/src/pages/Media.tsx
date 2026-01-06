import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Image, Download } from 'lucide-react';
import PDFViewer from '@/components/PDFViewer';

export default function Media() {
  return (
    <Layout>
      {/* ヘッダー */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="font-bold">広報資料</h1>
            <p className="text-lg text-muted-foreground">
              公式ポスターやデジタルパンフレットをご覧いただけます
            </p>
          </div>
        </div>
      </section>

      {/* 公式ポスター */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5 text-primary" />
                公式ポスター
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  梨花祭2026の公式ポスターです。SNSでのシェアや印刷にご利用ください。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* ポスター1 */}
                  <div className="space-y-3">
                    <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <p className="text-4xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                          梨花祭2026
                        </p>
                        <p className="text-lg font-semibold">
                          未来へ繋ぐ、私たちの物語
                        </p>
                        <p className="text-sm text-muted-foreground">
                          2026.7.19 (SAT)
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      ダウンロード（メインビジュアル）
                    </Button>
                  </div>

                  {/* ポスター2 */}
                  <div className="space-y-3">
                    <div className="aspect-[3/4] bg-gradient-to-br from-accent/20 via-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <p className="text-3xl font-black">梨花祭2026</p>
                        <p className="text-base font-semibold">
                          7月19日（土）
                          <br />
                          10:00-16:00
                        </p>
                        <p className="text-sm text-muted-foreground">
                          梨花学園にて開催
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      ダウンロード（開催情報）
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  ※ポスターの商用利用はご遠慮ください。個人利用・SNSでのシェアは自由です。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* デジタルパンフレット */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-secondary" />
                デジタルパンフレット
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  梨花祭の全企画情報、会場マップ、タイムテーブルなどを掲載したデジタルパンフレットです。
                </p>

                {/* パンフレットプレビュー */}
                <div className="max-w-2xl mx-auto w-full">
                  <PDFViewer 
                    url="https://www.chiba-eiwa.ed.jp/wp-content/uploads/2024/06/rikasai_pamphlet_sample.pdf" 
                    title="梨花祭2026 デジタルパンフレット" 
                  />
                </div>

                {/* ダウンロードボタン */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button size="lg" className="w-full" asChild>
                    <a href="https://www.chiba-eiwa.ed.jp/wp-content/uploads/2024/06/rikasai_pamphlet_sample.pdf" download>
                      <Download className="h-4 w-4 mr-2" />
                      パンフレット（完全版）をダウンロード
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full" asChild>
                    <a href="https://www.chiba-eiwa.ed.jp/wp-content/uploads/2024/06/rikasai_map_sample.pdf" download>
                      <Download className="h-4 w-4 mr-2" />
                      会場マップのみダウンロード
                    </a>
                  </Button>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm font-semibold text-primary mb-2">
                    パンフレット内容
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>梨花祭テーマ・開催概要</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>全企画の詳細情報（クラス・部活動・飲食）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>校内マップ・各企画の場所</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>タイムテーブル・イベントスケジュール</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>アクセス情報・注意事項</span>
                    </li>
                  </ul>
                </div>

                <p className="text-xs text-muted-foreground">
                  ※デジタルパンフレットは随時更新されます。最新版をダウンロードしてご利用ください。
                  <br />
                  ※ファイルサイズ: 約15MB（完全版）、約3MB（会場マップのみ）
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SNSシェア */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-4xl">
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="py-8">
              <div className="text-center space-y-4">
                <h3 className="font-bold text-xl">SNSでシェアしよう</h3>
                <p className="text-muted-foreground">
                  梨花祭の情報をSNSでシェアして、たくさんの人に知らせましょう
                </p>
                <p className="text-sm text-muted-foreground">
                  ハッシュタグ: <span className="font-semibold">#梨花祭2026</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
