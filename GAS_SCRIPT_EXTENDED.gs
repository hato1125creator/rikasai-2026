/**
 * 梨花祭2026 Google Apps Script (拡張版)
 * スプレッドシートのデータをWebアプリケーションとして公開
 * 
 * 対応シート:
 * 1. Programs - 企画情報
 * 2. RealTimeInfo - リアルタイム情報（落とし物、売り切れ）
 * 3. Announcements - お知らせ
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
const PROGRAMS_SHEET_NAME = 'Programs'; // 企画情報シート
const REALTIME_SHEET_NAME = 'RealTimeInfo'; // リアルタイム情報シート
const ANNOUNCEMENTS_SHEET_NAME = 'Announcements'; // お知らせシート
const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

/**
 * doGet: GETリクエストを処理
 */
function doGet(e) {
  try {
    const type = e.parameter.type || 'all'; // 'programs', 'realtime', 'announcements', 'all'
    
    const response = {
      success: true,
      timestamp: new Date().toISOString(),
    };
    
    if (type === 'programs' || type === 'all') {
      response.programs = getProgramsData();
    }
    
    if (type === 'realtime' || type === 'all') {
      response.realTimeInfo = getRealTimeInfoData();
    }
    
    if (type === 'announcements' || type === 'all') {
      response.announcements = getAnnouncementsData();
    }
    
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
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PROGRAMS_SHEET_NAME);
  
  if (!sheet) {
    throw new Error('Sheet "' + PROGRAMS_SHEET_NAME + '" not found');
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
 * スプレッドシートからリアルタイム情報を取得
 */
function getRealTimeInfoData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REALTIME_SHEET_NAME);
  
  if (!sheet) {
    // シートが存在しない場合は空配列を返す
    return [];
  }
  
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  // ヘッダー行をスキップ（1行目）
  const realTimeInfo = [];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    
    // 空行をスキップ
    if (!row[0]) continue;
    
    realTimeInfo.push({
      id: row[0],
      type: row[1],
      title: row[2],
      description: row[3],
      location: row[4],
      timestamp: row[5],
      status: row[6],
    });
  }
  
  return realTimeInfo;
}

/**
 * スプレッドシートからお知らせを取得
 */
function getAnnouncementsData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ANNOUNCEMENTS_SHEET_NAME);
  
  if (!sheet) {
    // シートが存在しない場合は空配列を返す
    return [];
  }
  
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  // ヘッダー行をスキップ（1行目）
  const announcements = [];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    
    // 空行をスキップ
    if (!row[0]) continue;
    
    announcements.push({
      id: row[0],
      type: row[1],
      title: row[2],
      content: row[3],
      timestamp: row[4],
      priority: parseInt(row[5]) || 3,
    });
  }
  
  return announcements;
}

/**
 * テスト用: ローカルで動作確認
 */
function testGetData() {
  Logger.log('=== Programs Data ===');
  const programs = getProgramsData();
  Logger.log('Programs count: ' + programs.length);
  if (programs.length > 0) {
    Logger.log('First program: ' + JSON.stringify(programs[0]));
  }
  
  Logger.log('=== RealTime Info ===');
  const realTimeInfo = getRealTimeInfoData();
  Logger.log('RealTime info count: ' + realTimeInfo.length);
  if (realTimeInfo.length > 0) {
    Logger.log('First info: ' + JSON.stringify(realTimeInfo[0]));
  }
  
  Logger.log('=== Announcements ===');
  const announcements = getAnnouncementsData();
  Logger.log('Announcements count: ' + announcements.length);
  if (announcements.length > 0) {
    Logger.log('First announcement: ' + JSON.stringify(announcements[0]));
  }
}

/**
 * デプロイ後のテスト用: URLを確認
 */
function getDeploymentUrl() {
  const url = ScriptApp.getService().getUrl();
  Logger.log('Deployment URL: ' + url);
  return url;
}

/**
 * スプレッドシートのシート一覧を取得（デバッグ用）
 */
function listSheets() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = spreadsheet.getSheets();
  
  Logger.log('Available sheets:');
  for (let i = 0; i < sheets.length; i++) {
    Logger.log('- ' + sheets[i].getName());
  }
}
