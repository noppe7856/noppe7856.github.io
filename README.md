# のっぺのアプリ広場 (`noppe7856.github.io`)

登録不要・無料で安心して遊べるWebアプリ＆ミニゲームの公開ポータルサイトです。
- 公開URL: https://noppe7856.github.io/
- アクセス解析の確認は、ログイン保護された各公式管理画面（GA4 / GoatCounter / Cloudflare / Google Search Console / GitHub Insights）から行います。

---

## 運用ガイド

### 1. 客観的アクセス計測を ON にする方法（ポータル＋全アプリ一括）

本サイトおよび各アプリ（`kanji-flashcard` / `tebata-trainer`）は共通モジュール [`js/analytics.js`](./js/analytics.js) を読み込んでいます。
[`js/site-config.js`](./js/site-config.js) の `analytics` に ID を設定して push するだけで、**ポータル全体＋各アプリのPV・訪問者数・流入元・アプリ起動イベントが一括で計測**されます。

- **GoatCounter（おすすめ・最速・Cookie不要・無料）**: https://www.goatcounter.com/signup
- **Google Analytics 4 (GA4)（詳細分析・無料）**: https://analytics.google.com/
- **Cloudflare Web Analytics（Cookie不要・無料）**: https://dash.cloudflare.com/
- **Google Search Console（検索流入・検索語句の客観データ）**: https://search.google.com/search-console

```js
analytics: {
  ga4: { enabled: true, measurementId: "G-XXXXXXXXXX" },
  goatcounter: { enabled: true, code: "noppe7856", publicDashboard: false },
  cloudflare: { enabled: false, beaconToken: "" },
  searchConsoleVerification: "Google Search Consoleの確認コード"
}
```

### 2. 応援（投げ銭）ボタンを ON にする方法

OFUSE / Buy Me a Coffee / Ko-fi / BOOTH などのアカウントを作成したら、[`js/site-config.js`](./js/site-config.js) の `support` を書き換えて push するだけです。

```js
support: {
  enabled: true,
  serviceName: "OFUSE",
  url: "https://ofuse.me/あなたのID",
  buttonLabel: "開発を応援する",
  message: "..."
}
```

### 3. Google AdSense 広告を ON にする方法

Google AdSense の審査を通過したら、[`js/site-config.js`](./js/site-config.js) の `adsense` を設定して push します。

```js
adsense: {
  enabled: true,
  clientId: "ca-pub-xxxxxxxxxxxxxxxx",
  slots: {
    portalMid: "1234567890",
    detailBottom: "0987654321"
  }
}
```

### 4. 新しいアプリやゲームを追加する方法

1. 新しいリポジトリで GitHub Pages を有効化（例：`https://noppe7856.github.io/my-new-game/`）
2. アプリの `index.html` の `</body>` 直前に以下を1行追加するとアクセス計測も自動で統合されます：
   ```html
   <script type="module" src="https://noppe7856.github.io/js/analytics.js" data-app-id="my-new-game"></script>
   ```
3. [`js/apps.js`](./js/apps.js) の `APPS_DATA` 配列に1件追加
4. `apps/my-new-game.html` に紹介ページを作成し、`sitemap.xml` にもURLを追加して `git push`
