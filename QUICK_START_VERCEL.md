# Vercelへの高速デプロイガイド

## 必要な準備

1. **Vercelアカウント**: https://vercel.com で登録
2. **GASのデプロイメントURL**: Google Apps Scriptから取得
3. **ZIPファイル**: `rikasai-2026.zip`

## デプロイ手順（5分で完了）

### ステップ1: Vercelにログイン

1. https://vercel.com にアクセス
2. 「Log In」をクリック
3. GitHubアカウントでログイン

### ステップ2: プロジェクトをアップロード

1. Vercelダッシュボードで「Add New」をクリック
2. 「Project」を選択
3. 「Upload」をクリック
4. `rikasai-2026.zip` をドラッグ＆ドロップ
5. 「Upload」をクリック

### ステップ3: 環境変数を設定

1. デプロイ完了後、「Settings」をクリック
2. 左側メニューから「Environment Variables」をクリック
3. 「Add New」をクリック
4. 以下を入力：
   - **Name**: `VITE_GAS_DEPLOYMENT_URL`
   - **Value**: Google Apps ScriptのURL（例：`https://script.google.com/macros/d/...`)
5. 「Save」をクリック

### ステップ4: 再デプロイ

1. 「Deployments」タブをクリック
2. 最新のデプロイの「...」をクリック
3. 「Redeploy」をクリック
4. 「Redeploy」を確認

### ステップ5: 完了

1. デプロイが「Ready」になるまで待つ
2. 「Visit」ボタンをクリック
3. サイトが表示されることを確認

## トラブルシューティング

| 問題 | 解決方法 |
|------|---------|
| デプロイが失敗 | ビルドログを確認（Deployments → ログを見る） |
| データが表示されない | 環境変数を確認、GASのURLが正しいか確認 |
| ページが表示されない | キャッシュをクリア（Ctrl+Shift+Delete） |

## 本番環境の確認

デプロイ後、以下を確認してください：

- [ ] すべてのページが表示される
- [ ] 企画紹介ページでスプレッドシートのデータが表示される
- [ ] モバイルで正常に表示される
- [ ] エラーメッセージが表示されていない

## よくある質問

**Q: 無料でデプロイできますか？**
A: はい、Vercelの無料プランで十分です。

**Q: ドメインを変更できますか？**
A: はい、Settings → Domains で設定できます。

**Q: 更新を反映させるには？**
A: Deployments → Redeploy をクリックするか、GitHubにプッシュします。

---

詳細は `VERCEL_DEPLOYMENT.md` と `DEPLOYMENT_CHECKLIST.md` を参照してください。
