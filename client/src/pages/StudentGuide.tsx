import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, Clock, MapPin, Users, Zap, FileText } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface RuleSection {
  title: string;
  icon: React.ComponentType<any>;
  items: {
    label: string;
    description: string;
  }[];
}

const ruleSections: RuleSection[] = [
  {
    title: '参加形態と基本方針',
    icon: Users,
    items: [
      {
        label: '文化祭の目的',
        description:
          '各団体内で交流を深め、主体性や協調性を育み、「生徒一人ひとりが理想とする自分に向かって進むことができる学校」の実現を目指します。',
      },
      {
        label: 'テーマ',
        description:
          '「イロトリドリ」。各クラス、部活動はテーマを解釈し具現化を目指します。優秀な団体には梨花祭賞が授与されます。',
      },
      {
        label: 'クラス参加',
        description:
          '梨花祭は学校行事であり、1〜3学年いずれもクラス全員でクラス企画に取り組むこと。',
      },
      {
        label: '部活動参加',
        description:
          '部活動の活動だけでなく、クラスの活動にも必ず参加すること。部活動も事前に「企画書」を提出する必要があります。',
      },
      {
        label: '企画書の記載',
        description:
          '企画の内容を具体的に記載し、「誰もが同じ出し物をイメージできる精度」で記入すること。',
      },
    ],
  },
  {
    title: '準備期間中のルール（7月14日〜17日）',
    icon: Clock,
    items: [
      {
        label: '準備時間',
        description: '放課後に校内で準備をする場合は18:30までとします。完全下校は19:00。',
      },
      {
        label: '前日準備の延長',
        description:
          '7月17日(木)の準備延長は、申請の上、担任監督のもと17:30までとします。',
      },
      {
        label: '土日の作業',
        description:
          '担任または顧問が必ずついて指導・監督すること。担任や顧問が不在のときは原則として作業を認めません。',
      },
      {
        label: 'スマートフォンの利用',
        description:
          '企画準備に必要な動画撮影などは、担任または顧問に目的を申告し、必要と認められた場合はネームタグを着用して使用可能。生徒間での渡し合いは禁止。',
      },
      {
        label: 'スマートフォン不正利用の罰則',
        description:
          'ネームタグ着用時でも、SNSやゲーム等の使用が見られた場合、通常の預かり指導に加え、準備期間中のスマートフォン使用を禁止します。',
      },
      {
        label: '買い出し時の服装',
        description:
          '買い出し等の外出の際は、必ず制服を着用すること。クラスTシャツ、ジャージなどは厳禁。',
      },
      {
        label: '外出の制限',
        description: '発表に関する買い出し以外の外出は禁止とします。',
      },
      {
        label: '机・椅子の移動',
        description:
          '移動可能時間は13:10〜15:00。使用しないものは原則教室保管。移動する際は、机・椅子全てに養生テープでクラス表示をすること。',
      },
      {
        label: '前日準備後の確認',
        description:
          'クラス解散は15:45以降。解散後もクラスの代表者は残り、学年主任および生徒会顧問によるチェックを受け、指摘箇所を修正すること。',
      },
    ],
  },
  {
    title: '装飾・展示に関するルール',
    icon: Zap,
    items: [
      {
        label: 'テープ使用',
        description:
          '生徒会から配布される養生テープのみ使用可能。貼付可能期間は「前日準備日〜発表2日目」とします。',
      },
      {
        label: '貼り付け場所',
        description:
          '塗装面を除き、ガラス、天井、ロッカーなど含め全面使用できます。ただし、自団体の発表教室の壁面以外に許可なく貼り紙をしないこと。',
      },
      {
        label: '床への貼付',
        description:
          '床に養生テープを使用する際は、一度肌に貼り粘着力を弱めて使用すること。',
      },
      {
        label: '禁止される装飾方法',
        description:
          '天井への画鋲使用、ホワイトボードへの強力磁石や磁石付きダーツの使用は禁止。廊下の装飾は通行の妨げにならないこと。',
      },
      {
        label: '著作権',
        description:
          '著作物を取り扱うのは原則禁止。使用する場合は著作権所有者のガイドラインや日本の法律に沿う根拠を生徒会に示すこと。',
      },
      {
        label: '教室照明',
        description:
          '教室天井の照明は全て点灯させること。一部でも消灯する場合は、安全確保の方法を企画書に詳しく記載すること。',
      },
    ],
  },
  {
    title: '異装（団体Tシャツ・衣装）に関するルール',
    icon: Users,
    items: [
      {
        label: '異装届',
        description:
          '団体Tシャツ、衣装ともに異装届の提出が必要です。業者へ送付する実際の書類を送付前に提出してください。',
      },
      {
        label: '団体Tシャツ着用',
        description:
          'クラス・部活の全員が着用必須。教室外での着用も可能です。',
      },
      {
        label: '衣装着用',
        description:
          '一部の人でも着用可能。発表教室内のみでの着用。教室外での着用が必要な場合は要相談。',
      },
      {
        label: 'デザインの制限',
        description:
          '商標権、著作権を侵害しないこと。既存のロゴやキャラクターを模したデザインは禁止。作成したTシャツへの加工は禁止。衣装は企画の趣旨、コンセプトに沿うこと。',
      },
    ],
  },
  {
    title: '飲食団体に関するルール',
    icon: MapPin,
    items: [
      {
        label: '飲食団体の制限',
        description:
          '最大10団体（調理部、1年1団体、2年4団体、3年4団体）とします。別途キッチンカー誘致予定。',
      },
      {
        label: '提供範囲',
        description:
          '「密封されたものを加工せず販売」するもの以外の飲食物も取り扱い可能。',
      },
      {
        label: '家庭科室の使用',
        description:
          '調理部と2年または3年の1団体のみ使用可能。提供場所は家庭科室横の教室とします。',
      },
      {
        label: '検便',
        description:
          '飲食物を扱う団体は提出必須。費用は各団体に支給される補助金（3万円）より実費を請求します。',
      },
      {
        label: '食券の販売',
        description:
          '食券での販売を希望する場合、前売りは禁止とし、当日券のみとします。食券は事前に生徒会に提出し確認を受けること。',
      },
      {
        label: '金銭管理',
        description:
          '食券・お金は全て各団体で責任をもって管理すること。',
      },
      {
        label: '飲食スペース',
        description:
          '食事についてはコモンホールまたはクラスのみの飲食スペースを指定します（飲み物については指定なし）。',
      },
    ],
  },
  {
    title: '中・後夜祭（イベント）のルール',
    icon: Zap,
    items: [
      {
        label: '入場方法',
        description: '生徒対象の抽選制とします。',
      },
      {
        label: '応援グッズ',
        description:
          'ペンライト、うちわ等の応援グッズは使用可能。点滅する（チカチカする）系は禁止。使用時は自分の頭より下にすること。最大2本まで。',
      },
      {
        label: 'ゴミが出る装飾',
        description:
          'キラキラモールなど、ゴミが出る装飾は禁止。使い捨てのゴミは持ち帰ること。',
      },
      {
        label: 'グッズの管理',
        description: 'グッズに必ず名前を記入すること。',
      },
      {
        label: '出演者の異装',
        description: '出演者の異装ルールは明確に定められます。',
      },
    ],
  },
  {
    title: '禁止事項',
    icon: AlertCircle,
    items: [
      {
        label: '下品な企画',
        description:
          '人前で抱き合う、キスを強要するといった下品な企画は禁止。生徒会の許可を得ていない企画も禁止。',
      },
      {
        label: '校則違反品の販売',
        description:
          '指輪、イヤリング、ネックレス、ピアスなど校則で身に着けることを禁止されている装飾品を販売、譲渡する企画は禁止。',
      },
      {
        label: '法律に関わる企画',
        description:
          '法律で禁止されているものを彷彿させる企画（例：カジノ）は禁止。',
      },
      {
        label: '水鉄砲の使用',
        description: '水鉄砲を使用する企画は別途条件があります。',
      },
    ],
  },
  {
    title: '会計処理のルール',
    icon: FileText,
    items: [
      {
        label: '補助金',
        description:
          'クラス団体：30,000円。文化部：20,000円。',
      },
      {
        label: '私的利用禁止',
        description:
          '補助金で、交通費（収益がある場合を除く）や個人で消費されるもの（クラスTシャツ、飲食物、景品等）を購入することはできず、自己負担となります。',
      },
      {
        label: '収益の扱い',
        description:
          '収益は生徒会へ全額返金します。ただし、徴収金が発生している場合は、その金額分を個人に返金可能。余剰金が生徒会へ返金されます。',
      },
      {
        label: 'レシート・領収書',
        description:
          '物品購入の際は必ず取得し、宛名（「千葉英和高等学校〇年〇組」または「千葉英和高等学校〇〇部」）の記載や、具体的な購入品目の印字など、指定された6条件を満たすこと。',
      },
      {
        label: '提出書類',
        description:
          '『梨花祭会計報告書』はペンまたはボールペンで記入し、担任/顧問の押印を忘れずに貰うこと。',
      },
      {
        label: '提出期限',
        description:
          '会計報告書の提出期限は7月22日（火）13：30です。',
      },
    ],
  },
];

const faqs: FAQItem[] = [
  {
    id: 'faq-001',
    question: '企画の変更・キャンセルはできますか？',
    answer:
      '変更・キャンセルは事前に生徒会に申請してください。期限内での申請が必要です。詳細は生徒会に確認してください。',
  },
  {
    id: 'faq-002',
    question: '当日、急に人数が変わった場合はどうしますか？',
    answer:
      '生徒会に速やかに報告してください。会場の都合上、対応できない場合もあります。',
  },
  {
    id: 'faq-003',
    question: '雨天の場合、企画はどうなりますか？',
    answer:
      '屋外企画は中止または変更になる可能性があります。詳細は当日朝に生徒会から連絡します。',
  },
  {
    id: 'faq-004',
    question: '音響・照明機材は借りられますか？',
    answer:
      '申請により借用可能です。事前に生徒会に相談し、使用方法の説明を受けてください。',
  },
  {
    id: 'faq-005',
    question: '企画中にトラブルが発生したら？',
    answer:
      '速やかに生徒会に報告してください。生徒会が対応します。緊急の場合は教職員に連絡してください。',
  },
  {
    id: 'faq-006',
    question: '企画の宣伝はどのようにしたらいいですか？',
    answer:
      'サイトの企画紹介ページに情報を登録できます。SNSでの宣伝も可能ですが、不適切な内容は控えてください。',
  },
  {
    id: 'faq-007',
    question: '来場者からのクレームがあった場合は？',
    answer:
      '生徒会に報告してください。適切に対応します。決して感情的にならないようお願いします。',
  },
  {
    id: 'faq-008',
    question: '企画に必要な物品は自分たちで用意ですか？',
    answer:
      '基本的に各企画で用意してください。学校の物品を借用する場合は、事前に申請が必要です。',
  },
];

export default function StudentGuide() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  return (
    <Layout>
      {/* ヘッダー */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge className="bg-primary/20 text-primary">生徒向けガイド</Badge>
            <h1 className="font-bold">梨花祭2026 生徒ルール・ガイド</h1>
            <p className="text-lg text-muted-foreground">
              梨花祭を安全に、楽しく開催するためのルールと注意事項をご紹介します。
              すべての生徒が守るべき重要な内容です。必ずご確認ください。
            </p>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* 重要な注意事項 */}
            <Card className="border-destructive/50 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-5 w-5" />
                  重要な注意事項
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>安全第一</strong>
                    ：すべての活動は安全を最優先に行ってください。危険な行為は厳禁です。
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>ルール遵守</strong>
                    ：学校のルールと梨花祭のルールを必ず守ってください。違反者は処罰の対象になります。
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>報告・連絡・相談</strong>
                    ：問題が発生した場合は、速やかに生徒会に報告してください。
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* ルール詳細 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">ルール詳細</h2>
              {ruleSections.map((section, index) => {
                const Icon = section.icon;
                const isExpanded = expandedSection === section.title;
                return (
                  <Card
                    key={index}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => toggleSection(section.title)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-start justify-between gap-4">
                        <span className="flex items-center gap-2 text-left">
                          <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                          {section.title}
                        </span>
                        <span className="text-2xl text-muted-foreground flex-shrink-0">
                          {isExpanded ? '−' : '+'}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    {isExpanded && (
                      <CardContent className="pt-0 space-y-4">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="border-l-2 border-primary/20 pl-4 py-2">
                            <p className="font-semibold text-sm text-primary mb-1">{item.label}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        ))}
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">よくある質問</h2>
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <Card
                    key={faq.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-start justify-between gap-4">
                        <span className="text-left">{faq.question}</span>
                        <span className="text-2xl text-muted-foreground flex-shrink-0">
                          {expandedFAQ === faq.id ? '−' : '+'}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    {expandedFAQ === faq.id && (
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* 連絡先 */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  問い合わせ・相談
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">生徒会</p>
                  <p className="font-semibold">梨花祭運営委員会</p>
                  <p className="text-sm text-muted-foreground">
                    ご質問・ご相談は、生徒会室または問い合わせフォームからお願いします。
                  </p>
                </div>
                <Button className="w-full" variant="default">
                  問い合わせフォームを開く
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
