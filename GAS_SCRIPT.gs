/**
 * 梨花祭2026 Google Apps Script
 * スプレッドシートのデータをWebアプリケーションとして公開
 * 
 * 使用方法:
 * 1. Google Driveで新しいスプレッドシートを作成
 * 2. 拡張機能 > Apps Script を開く
 * 3. このコードをコピー＆ペースト
 * 4. デプロイ > 新しいデプロイ > ウェブアプリ
 * 5. 実行者: 自分のアカウント
 * 6. アクセス: 全員（匿名ユーザーを含む）
 * 7. デプロイして、URLをコピー
 * 8. サイトの環境変数 VITE_GAS_DEPLOYMENT_URL に設定
 */

// グローバル設定
const SHEET_NAME = 'Programs'; // シート名
const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

/**
 * doGet: GETリクエストを処理
 */
function doGet(e) {
  try {
    const programs = getProgramsData();
    
    const response = {
      success: true,
      programs: programs,
      timestamp: new Date().toISOString(),
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.message,
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * スプレッドシートから企画データを取得
 */
function getProgramsData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    throw new Error(`Sheet "${SHEET_NAME}" not found`);
  }
  
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  // ヘッダー行をスキップ（1行目）
  const programs = [];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    
    // 空行をスキップ
    if (!row[0]) continue;
    
    programs.push(row);
  }
  
  return programs;
}

/**
 * テスト用: ローカルで動作確認
 */
function testGetProgramsData() {
  const data = getProgramsData();
  Logger.log('Programs count: ' + data.length);
  Logger.log('First program: ' + JSON.stringify(data[0]));
}

/**
 * デプロイ後のテスト用: URLを確認
 */
function getDeploymentUrl() {
  const url = ScriptApp.getService().getUrl();
  Logger.log('Deployment URL: ' + url);
  return url;
}
