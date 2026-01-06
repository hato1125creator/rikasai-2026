// 環境変数から文言を読み込む
export const textConfig = {
  // サイト全体
  siteTitle: import.meta.env.VITE_SITE_TITLE || "千葉英和高等学校 梨花祭2026",
  siteDescription: import.meta.env.VITE_SITE_DESCRIPTION || "未来へ繋ぐ、私たちの物語",
  
  // トップページ
  homeHeroTitle: import.meta.env.VITE_HOME_HERO_TITLE || "千葉英和高等学校 梨花祭2026",
  homeHeroSubtitle: import.meta.env.VITE_HOME_HERO_SUBTITLE || "未来へ繋ぐ、私たちの物語",
  homeEventDate: import.meta.env.VITE_HOME_EVENT_DATE || "2026年7月18日（土）",
  homeEventTime: import.meta.env.VITE_HOME_EVENT_TIME || "10:00～16:00",
  homeAccessButton: import.meta.env.VITE_HOME_ACCESS_BUTTON || "アクセス",
  
  // ナビゲーション
  navAbout: import.meta.env.VITE_NAV_ABOUT || "梨花祭について",
  navPrograms: import.meta.env.VITE_NAV_PROGRAMS || "企画紹介",
  navAccess: import.meta.env.VITE_NAV_ACCESS || "アクセス",
  navEvents: import.meta.env.VITE_NAV_EVENTS || "イベント情報",
  navMedia: import.meta.env.VITE_NAV_MEDIA || "広報資料",
  navLive: import.meta.env.VITE_NAV_LIVE || "リアルタイム情報",
  navStudentGuide: import.meta.env.VITE_NAV_STUDENT_GUIDE || "生徒ガイド",
  navClassroomMap: import.meta.env.VITE_NAV_CLASSROOM_MAP || "校内マップ",
  navContact: import.meta.env.VITE_NAV_CONTACT || "問い合わせ",
  
  // フッター
  footerSchoolName: import.meta.env.VITE_FOOTER_SCHOOL_NAME || "千葉英和高等学校",
  footerAddress: import.meta.env.VITE_FOOTER_ADDRESS || "〒270-1431 千葉県印西市小林北1-1-1",
  footerPhone: import.meta.env.VITE_FOOTER_PHONE || "Tel: 0476-46-1231",
  footerCopyright: import.meta.env.VITE_FOOTER_COPYRIGHT || "© 2026 千葉英和高等学校 梨花祭実行委員会. All rights reserved.",
  
  // 共通ボタン
  buttonViewDetails: import.meta.env.VITE_BUTTON_VIEW_DETAILS || "詳細を見る",
  buttonClose: import.meta.env.VITE_BUTTON_CLOSE || "閉じる",
  buttonRetry: import.meta.env.VITE_BUTTON_RETRY || "再試行",
  
  // エラーメッセージ
  errorLoadingData: import.meta.env.VITE_ERROR_LOADING_DATA || "申し訳ございません。データの読み込みに失敗しました",
  errorNetworkError: import.meta.env.VITE_ERROR_NETWORK_ERROR || "ネットワークエラーが発生しました。インターネット接続を確認してください。",
  errorTryAgain: import.meta.env.VITE_ERROR_TRY_AGAIN || "再度お試しください",
};

export default textConfig;
