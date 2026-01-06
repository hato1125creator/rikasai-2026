# Vercelへのデプロイメント手順

このガイドでは、梨花祭2026のサイトをVercelにデプロイする方法を説明します。

## ステップ1: Vercelアカウントを作成

1. [Vercel公式サイト](https://vercel.com) にアクセス
2. 「Sign Up」をクリック
3. GitHubアカウントで登録（推奨）、またはメールアドレスで登録
4. メール確認を完了

## ステップ2: プロジェクトをアップロード

### 方法A: GitHubを使用（推奨）

1. GitHubで新しいリポジトリを作成
2. ローカルで以下のコマンドを実行：
   ```bash
   git clone https://github.com/your-username/rikasai-2026.git
   cd rikasai-2026
   # ZIPファイルを解凍したファイルをコピー
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```
3. Vercelダッシュボードで「New Project」をクリック
4. GitHubリポジトリを選択
5. 「Import」をクリック

### 方法B: ZIPファイルをアップロード

1. Vercelダッシュボードにログイン
2. 「New Project」をクリック
3. 「Upload」を選択
4. ZIPファイル（`rikasai-2026.zip`）をアップロード

## ステップ3: プロジェクト設定

1. **Project Name**: `rikasai-2026` など、わかりやすい名前を入力
2. **Framework**: 「Vite」を選択
3. **Root Directory**: `./` のままでOK
4. 「Deploy」をクリック

## ステップ4: 環境変数を設定

1. Vercelダッシュボードで、デプロイしたプロジェクトを開く
2. 「Settings」をクリック
3. 左側メニューから「Environment Variables」をクリック
4. 以下の環境変数を追加：

   | キー | 値 |
   |------|-----|
   | `VITE_GAS_DEPLOYMENT_URL` | Google Apps ScriptのデプロイメントURL（例：`https://script.google.com/macros/d/.../usercontent`） |

5. 「Save」をクリック

## ステップ5: デプロイを確認

1. Vercelダッシュボードで「Deployments」タブをクリック
2. 最新のデプロイが「Ready」状態になるまで待つ
3. 「Visit」ボタンをクリックしてサイトを確認

## ステップ6: カスタムドメインを設定（オプション）

1. Vercelダッシュボードで「Settings」をクリック
2. 「Domains」をクリック
3. 「Add Domain」をクリック
4. ドメイン名を入力
5. DNS設定を完了

## トラブルシューティング

### デプロイが失敗する場合

1. **ビルドログを確認**
   - Vercelダッシュボードで「Deployments」をクリック
   - 失敗したデプロイをクリック
   - 「Build Logs」でエラーメッセージを確認

2. **Node.jsバージョンを確認**
   - `package.json` の `engines` フィールドを確認
   - Vercelが対応しているバージョンか確認

3. **依存関係をインストール**
   - ローカルで `pnpm install` を実行
   - `pnpm-lock.yaml` をコミット

### サイトが表示されない場合

1. **環境変数を確認**
   - Vercelダッシュボードで「Settings」→「Environment Variables」を確認
   - `VITE_GAS_DEPLOYMENT_URL` が正しく設定されているか確認

2. **キャッシュをクリア**
   - ブラウザのキャッシュをクリア（Ctrl+Shift+Delete）
   - サイトをリロード

3. **GASのURLが正しいか確認**
   - Google Apps Scriptのデプロイメント設定を確認
   - URLの末尾が `/usercontent` で終わっているか確認

## 自動デプロイの設定

Vercelはデフォルトで以下の場合に自動デプロイします：

- GitHubのメインブランチにプッシュした場合
- プルリクエストを作成した場合（プレビューデプロイ）

手動でデプロイする場合：
1. Vercelダッシュボードで「Deployments」をクリック
2. 「Redeploy」ボタンをクリック

## パフォーマンス最適化

Vercelは以下の最適化を自動的に行います：

- **自動画像最適化**: 画像を最適なフォーマットに変換
- **キャッシング**: 静的ファイルをグローバルCDNにキャッシュ
- **圧縮**: JavaScriptとCSSを自動圧縮
- **自動スケーリング**: アクセス数に応じて自動スケール

## 本番環境でのチェックリスト

デプロイ前に以下を確認してください：

- [ ] すべてのページが正常に表示される
- [ ] リンクが正しく動作する
- [ ] GASからのデータ取得が正常に動作する
- [ ] モバイルでの表示が正常である
- [ ] 環境変数が正しく設定されている
- [ ] エラーメッセージが表示されていない

## よくある質問

**Q: 無料でデプロイできますか？**
A: はい、Vercelは無料プランを提供しています。月間100GBまでのバンド幅が含まれます。

**Q: カスタムドメインは必須ですか？**
A: いいえ、Vercelが提供するサブドメイン（例：`rikasai-2026.vercel.app`）を使用できます。

**Q: デプロイ後に変更を反映させるには？**
A: GitHubにプッシュするか、Vercelダッシュボードで「Redeploy」をクリックします。

**Q: 環境変数を変更した場合は？**
A: 環境変数を変更した後、Vercelダッシュボードで「Redeploy」をクリックして再デプロイしてください。
