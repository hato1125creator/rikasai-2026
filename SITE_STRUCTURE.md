# 梨花祭2026 サイト構造設計

## ルーティング構造

```
/ (トップページ)
├─ /about (梨花祭について)
│   ├─ /about/theme (テーマ・開催概要)
│   └─ /about/rules (ルール・注意事項)
├─ /access (アクセス・会場案内)
│   ├─ /access/map (校内マップ)
│   └─ /access/transportation (交通情報)
├─ /programs (企画紹介)
│   ├─ /programs/classes (クラス発表一覧)
│   ├─ /programs/clubs (部活動発表)
│   └─ /programs/food (飲食・キッチンカー)
├─ /events (イベント情報)
│   ├─ /events/festivals (中夜祭・後夜祭)
│   └─ /events/award (梨花祭賞・投票)
├─ /media (広報資料)
│   ├─ /media/poster (公式ポスター)
│   └─ /media/pamphlet (デジタルパンフレット)
├─ /live (リアルタイム情報)
│   ├─ /live/lost-found (落とし物情報)
│   └─ /live/updates (売り切れ・最新情報)
└─ /contact (運営・問い合わせ)
```

## ナビゲーション設計

### デスクトップ（トップナビゲーション）
- ロゴ（左）
- メインメニュー（中央）：梨花祭について / アクセス / 企画紹介 / イベント / 広報資料 / リアルタイム
- 問い合わせボタン（右）

### モバイル（下部固定バー）
- ホーム
- 企画
- イベント
- マップ
- メニュー（その他）

## データモデル設計

### 企画情報（Programs）
```typescript
interface Program {
  id: string;
  type: 'class' | 'club' | 'food';
  title: string;
  organizer: string; // クラス名 or 部活名
  description: string;
  location: string;
  schedule: {
    day1: { start: string; end: string; };
    day2: { start: string; end: string; };
  };
  images: string[];
  tags: string[];
  isFoodSoldOut?: boolean; // 飲食のみ
  menuItems?: MenuItem[]; // 飲食のみ
}

interface MenuItem {
  name: string;
  price: number;
  description?: string;
  isSoldOut: boolean;
}
```

### イベント情報（Events）
```typescript
interface Event {
  id: string;
  name: string;
  type: 'chuyasai' | 'kouyasai' | 'award';
  date: string;
  time: { start: string; end: string; };
  location: string;
  description: string;
  requiresTicket: boolean;
  ticketInfo?: string;
}
```

### リアルタイム情報（Live Updates）
```typescript
interface LiveUpdate {
  id: string;
  type: 'lost-found' | 'sold-out' | 'announcement';
  timestamp: string;
  content: string;
  relatedProgram?: string;
  images?: string[];
}
```

## 外部連携

### Googleスプレッドシート
- 企画情報の一元管理
- Google Sheets API経由で取得
- キャッシュ戦略：5分間隔で更新

### Instagram
- 公式アカウント埋め込み
- ハッシュタグ: #梨花祭2026
- 落とし物・売り切れ情報の投稿

### Googleフォーム
- 梨花祭賞投票フォーム
- 問い合わせフォーム
- iframe埋め込み
