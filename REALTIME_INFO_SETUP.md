# リアルタイム情報スプレッドシート連携ガイド

## 概要

梨花祭2026のWebサイトでは、Google Appsスクリプト（GAS）を使用して、スプレッドシートから**リアルタイム情報**（落とし物、売り切れ情報）を自動取得できます。

## スプレッドシートの構造

同じスプレッドシート内に、以下の2つのシートを作成してください：

### 1. **Programs シート**（企画情報）

| 列 | 説明 | 例 |
|---|---|---|
| A | ID | prog-1 |
| B | タイプ | class |
| C | タイトル | 1年A組 お化け屋敷 |
| D | 主催者 | 1年A組 |
| E | 説明 | 暗闇の中で繰り広げられる恐怖体験... |
| F | 場所 | 1階 1-A教室 |
| G | 開始時間（日1） | 10:00 |
| H | 終了時間（日1） | 16:00 |
| I | 開始時間（日2） | 10:00 |
| J | 終了時間（日2） | 16:00 |

### 2. **RealTimeInfo シート**（リアルタイム情報）

| 列 | 説明 | 例 |
|---|---|---|
| A | ID | lost-001 |
| B | タイプ | lost / sold_out |
| C | タイトル | iPhone 15を落とされた方へ |
| D | 説明 | 黒色のiPhone 15が1階エントランスで見つかりました... |
| E | 場所 | 本部（体育館入口） |
| F | タイムスタンプ | 2026-07-19T10:30:00Z |
| G | ステータス | active / resolved |

## GASスクリプトの設定

### ステップ1: スプレッドシートを開く

Google Driveで、企画情報とリアルタイム情報を管理するスプレッドシートを開きます。

### ステップ2: Apps Scriptを開く

1. スプレッドシートのメニューから「拡張機能」をクリック
2. 「Apps Script」をクリック
3. 新しいタブでApps Scriptエディタが開きます

### ステップ3: コードを貼り付け

`GAS_SCRIPT_EXTENDED.gs` のコードをコピーして、Apps Scriptエディタに貼り付けます。

```javascript
// GAS_SCRIPT_EXTENDED.gs の全コードをコピー＆ペースト
```

### ステップ4: デプロイ

1. 左側の「デプロイ」アイコンをクリック
2. 「新しいデプロイ」をクリック
3. 設定：
   - **タイプ**: ウェブアプリ
   - **実行者**: 自分のアカウント
   - **アクセス**: 全員（匿名ユーザーを含む）
4. 「デプロイ」をクリック
5. 表示されたURLをコピー

### ステップ5: 環境変数を設定

Webサイトの管理UI → 設定 → シークレット → `VITE_GAS_DEPLOYMENT_URL` に、ステップ4でコピーしたURLを貼り付けます。

## データ取得方法

### 全データを取得

```
GET {GAS_DEPLOYMENT_URL}
```

レスポンス例：
```json
{
  "success": true,
  "programs": [...],
  "realTimeInfo": [...],
  "timestamp": "2026-07-19T10:30:00Z"
}
```

### 企画データのみ取得

```
GET {GAS_DEPLOYMENT_URL}?type=programs
```

### リアルタイム情報のみ取得

```
GET {GAS_DEPLOYMENT_URL}?type=realtime
```

## リアルタイム情報の更新方法

### 落とし物情報を追加

RealTimeInfo シートに新しい行を追加：

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| lost-003 | lost | AirPodsを落とされた方へ | 白色のAirPodsが中庭で見つかりました | 本部 | 2026-07-19T14:00:00Z | active |

### 売り切れ情報を追加

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| sold-003 | sold_out | 3年C組 たこ焼き屋台 本日売り切れ | 本日のたこ焼きが売り切れました | 中庭 | 2026-07-19T15:00:00Z | active |

### 解決済みに変更

G列（ステータス）を「resolved」に変更すると、Webサイトに表示されなくなります。

## キャッシュについて

Webサイトは5分間隔でリアルタイム情報をキャッシュします。更新が反映されるまで最大5分かかる場合があります。

### キャッシュをクリアする方法

1. ブラウザの開発者ツール（F12）を開く
2. コンソールタブで以下を実行：
   ```javascript
   localStorage.removeItem('rikasai_realtime_cache');
   ```
3. ページをリロード

## トラブルシューティング

### データが表示されない

1. GAS URLが正しく設定されているか確認
2. スプレッドシートのシート名が「Programs」「RealTimeInfo」か確認
3. ブラウザコンソール（F12）でエラーを確認

### GAS URLを確認する方法

Apps Scriptエディタで、以下を実行：

1. 関数「getDeploymentUrl」を選択
2. 実行ボタンをクリック
3. 実行ログにURLが表示されます

## 参考

- [Google Apps Script 公式ドキュメント](https://developers.google.com/apps-script)
- [Spreadsheet Service](https://developers.google.com/apps-script/reference/spreadsheet)
