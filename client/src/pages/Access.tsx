import Layout from '@/components/Layout';
import { MapPin, Clock, Train, Bus, Car } from 'lucide-react';

export default function Access() {
  return (
    <Layout>
      {/* ヘッダー */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="font-bold">アクセス・会場案内</h1>
            <p className="text-lg text-muted-foreground">
              千葉英和高等学校へのアクセス方法と会場案内をご紹介します
            </p>
          </div>
        </div>
      </section>

      {/* アクセス情報 */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* 学校情報 */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  千葉英和高等学校
                </h2>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-4">住所</h3>
                <p className="text-muted-foreground">
                  〒270-1431<br />
                  千葉県印西市小林北1-1-1
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-4">電話番号</h3>
                <p className="text-muted-foreground">
                  0476-46-1231
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  開催時間
                </h3>
                <p className="text-muted-foreground">
                  2026年7月18日（土）<br />
                  10:00～16:00
                </p>
              </div>
            </div>

            {/* 交通情報 */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">交通アクセス</h2>

              {/* 電車 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Train className="h-5 w-5 text-primary" />
                  電車でのアクセス
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <strong>北総線「印西牧の原駅」から</strong><br />
                    駅からバス約10分またはタクシー約5分
                  </li>
                  <li>
                    <strong>成田線「成田駅」から</strong><br />
                    駅からバス約30分またはタクシー約25分
                  </li>
                </ul>
              </div>

              {/* バス */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Bus className="h-5 w-5 text-primary" />
                  バスでのアクセス
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <strong>印西牧の原駅から</strong><br />
                    北総バス「千葉英和高等学校」行き<br />
                    約10分
                  </li>
                  <li>
                    <strong>スクールバス</strong><br />
                    梨花祭当日、複数ルートで運行予定
                  </li>
                </ul>
              </div>

              {/* 車 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  車でのアクセス
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <strong>東関東自動車道「印西IC」から</strong><br />
                    約15分
                  </li>
                  <li>
                    <strong>駐車場</strong><br />
                    学校駐車場および周辺駐車場をご利用ください
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 校内マップへのリンク */}
      <section className="py-12 bg-muted/50">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-6">校内マップ</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            校内のインタラクティブマップで、各企画の場所を確認できます
          </p>
          <a href="/access/map" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            校内マップを見る
          </a>
        </div>
      </section>

      {/* 注意事項 */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">ご来場時のお願い</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">駐車場について</h3>
              <p className="text-sm text-blue-800">
                駐車場は限られています。可能な限り公共交通機関のご利用をお願いします。
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">来場時間</h3>
              <p className="text-sm text-green-800">
                午前中は混雑が予想されます。午後のご来場をおすすめします。
              </p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-900 mb-3">持ち物</h3>
              <p className="text-sm text-yellow-800">
                天候に備えて、傘や帽子などをお持ちください。
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-3">ルール遵守</h3>
              <p className="text-sm text-purple-800">
                学校のルールに従い、安全で楽しい梨花祭をお過ごしください。
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
