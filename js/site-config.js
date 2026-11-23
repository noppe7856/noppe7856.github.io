/**
 * サイト全体の設定ファイル（ここを編集するだけでポータル＋全アプリへ反映されます）
 *
 * ■ ① 客観的アクセス計測を有効にする方法:
 *   analytics.ga4 / analytics.goatcounter / analytics.cloudflare のいずれか（複数併用も可）で
 *   enabled を true にして ID / コードを入力して push するだけで、
 *   ポータル全ページと各アプリ（kanji-flashcard / tebata-trainer 等）のアクセス数を一括計測できます。
 *
 * ■ ② 応援（投げ銭）ボタンを有効にする方法:
 *   support.enabled を true にして、support.serviceName と support.url を入力してください。
 *
 * ■ ③ Google AdSense 広告を有効にする方法:
 *   adsense.enabled を true にして、adsense.clientId（ca-pub-...）と各 slot ID を入力してください。
 */
export const SITE_CONFIG = {
  siteName: "のっぺのアプリ広場",
  siteSub: "Noppe's App & Game Lab",
  tagline: "すぐ遊べて、ちょっと役立つ。みんなの無料Webアプリ＆ゲーム広場",
  description:
    "インストール不要・会員登録不要・完全無料で安心して使える学習アプリやミニゲームを公開している「のっぺのアプリ広場」です。全アプリのソースコードをGitHubで公開しています。",
  baseUrl: "https://noppe7856.github.io",
  ogImageUrl: "https://noppe7856.github.io/assets/og-image.png",
  authorName: "noppe7856",
  githubUrl: "https://github.com/noppe7856",

  // ① 客観的アクセス計測設定（ポータル＋全アプリへ自動適用）
  analytics: {
    // Google Analytics 4（もっとも定番・無料。PV/UU/流入元/アプリ起動クリックを計測）
    ga4: {
      enabled: false,
      measurementId: "" // 例: "G-XXXXXXXXXX"
    },
    // GoatCounter（超軽量・Cookie不要・オープンソース・無料。管理画面がシンプルでおすすめ）
    goatcounter: {
      enabled: false,
      code: "", // 例: "noppe7856" -> https://noppe7856.goatcounter.com
      publicDashboard: false // GoatCounter側で公開設定にした場合 true にすると stats.html で閲覧可
    },
    // Cloudflare Web Analytics（Cookie不要・無料・プライバシー重視）
    cloudflare: {
      enabled: false,
      beaconToken: "" // 例: "0123456789abcdef..."
    },
    // Google Search Console 所有権確認コード（検索表示回数・クリック数・検索キーワードの客観計測用）
    searchConsoleVerification: ""
  },

  // ② 応援（投げ銭）設定
  support: {
    enabled: false,
    serviceName: "応援ページ", // 例: "OFUSE", "Buy Me a Coffee", "BOOTH"
    url: "", // 例: "https://ofuse.me/your-id"
    buttonLabel: "開発を応援する",
    message:
      "すべてのアプリは無料で公開しています。「役に立った！」「楽しかった！」と思っていただけたら、コーヒー1杯分の応援をいただけると次の新作づくりの大きな励みになります。"
  },

  // ③ Google AdSense 設定（審査通過後にIDを入力して enabled: true に変更）
  adsense: {
    enabled: false,
    clientId: "", // 例: "ca-pub-1234567890123456"
    slots: {
      portalMid: "", // トップページ中段の控えめな横長バナー
      detailBottom: "" // 各アプリ紹介ページ下部のバナー
    }
  },

  // ④ お問い合わせ・アプリリクエストフォーム（Googleフォーム等のURLを設定可能）
  contact: {
    formUrl: "", // 例: "https://forms.gle/xxxxxxxx"
    githubIssuesUrl: "https://github.com/noppe7856/noppe7856.github.io/issues"
  }
};
