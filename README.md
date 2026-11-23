# のっぺのアプリ広場 (`noppe7856.github.io`)

無料で遊べるWebアプリ＆ミニゲームの公開ポータルサイトです。
公開URL: https://noppe7856.github.io/

---

## 運用ガイド

### 1. 応援（投げ銭）ボタンを ON にする方法

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

※ 各アプリ（`kanji-flashcard` / `tebata-trainer`）の「☕ 応援」リンクはすべて `https://noppe7856.github.io/#support` を向いているため、ポータル側の設定1箇所を更新するだけで全アプリからの導線が有効化されます。

### 2. Google AdSense 広告を ON にする方法

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

### 3. 新しいアプリやゲームを追加する方法

1. 新しいリポジトリで GitHub Pages を有効化（例：`https://noppe7856.github.io/my-new-game/`）
2. [`js/apps.js`](./js/apps.js) の `APPS_DATA` 配列に1件追加
3. （おすすめ）`apps/my-new-game.html` に紹介ページを作成し、`sitemap.xml` にもURLを追加
4. `git push` で自動公開されます

### 4. お問い合わせフォーム（Googleフォーム等）を連携する方法

[`js/site-config.js`](./js/site-config.js) の `contact.formUrl` にフォームのURLを設定してください。
