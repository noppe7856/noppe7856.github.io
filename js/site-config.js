/**
 * サイト全体の設定ファイル（ここを編集するだけで全体へ反映されます）
 *
 * ■ 応援（投げ銭）ボタンを有効にする方法:
 *   support.enabled を true にして、support.serviceName と support.url を入力してください。
 *   例: OFUSE / Buy Me a Coffee / Ko-fi / BOOTH など
 *
 * ■ Google AdSense 広告を有効にする方法:
 *   adsense.enabled を true にして、adsense.clientId（ca-pub-...）と各 slot ID を入力してください。
 */
export const SITE_CONFIG = {
  siteName: "のっぺのアプリ広場",
  siteSub: "Noppe's App & Game Lab",
  tagline: "すぐ遊べて、ちょっと役立つ。みんなの無料Webアプリ＆ゲーム広場",
  description:
    "インストール不要・無料で楽しめる学習アプリやミニゲームを公開している「のっぺのアプリ広場」です。スマホ・PCどちらでもすぐ遊べます。",
  baseUrl: "https://noppe7856.github.io",
  authorName: "noppe7856",
  githubUrl: "https://github.com/noppe7856",

  // ① 応援（投げ銭）設定
  support: {
    enabled: false,
    serviceName: "応援ページ", // 例: "OFUSE", "Buy Me a Coffee", "BOOTH"
    url: "", // 例: "https://ofuse.me/your-id"
    buttonLabel: "開発を応援する",
    message:
      "すべてのアプリは無料で公開しています。「役に立った！」「楽しかった！」と思っていただけたら、コーヒー1杯分の応援をいただけると次の新作づくりの大きな励みになります。"
  },

  // ② Google AdSense 設定（審査通過後にIDを入力して enabled: true に変更）
  adsense: {
    enabled: false,
    clientId: "", // 例: "ca-pub-1234567890123456"
    slots: {
      portalMid: "", // トップページ中段の控えめな横長バナー
      detailBottom: "" // 各アプリ紹介ページ下部のバナー
    }
  },

  // ③ お問い合わせ・アプリリクエストフォーム（Googleフォーム等のURLを設定可能）
  contact: {
    formUrl: "", // 例: "https://forms.gle/xxxxxxxx"
    githubIssuesUrl: "https://github.com/noppe7856/noppe7856.github.io/issues"
  }
};
