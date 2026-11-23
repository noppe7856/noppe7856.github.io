/**
 * 公開アプリ＆ゲーム一覧データ
 *
 * 新しいアプリやゲームを追加したいときは、この配列に1オブジェクト追加するだけで
 * トップページのカード一覧・カテゴリ絞り込み・件数表示へ自動的に反映されます。
 */
export const APPS_DATA = [
  {
    id: "kanji-flashcard",
    title: "漢字読みマスター！",
    subtitle: "小4〜高校 イメージ漢字フラッシュカード",
    category: "study",
    categoryLabel: "学習",
    badge: "人気・PWA対応",
    description:
      "イラストと音声でイメージしながら楽しく漢字の読みを覚えられるフラッシュカードアプリ。学年別フィルタ・苦手克服・レベルアップ機能付き！",
    tags: ["小4〜高校", "音声読み上げ", "苦手克服", "スマホ対応"],
    playUrl: "https://noppe7856.github.io/kanji-flashcard/",
    detailUrl: "./apps/kanji-flashcard.html",
    repoUrl: "https://github.com/noppe7856/kanji-flashcard",
    accentFrom: "#6366f1",
    accentTo: "#ec4899",
    iconText: "漢",
    updatedAt: "2026-11"
  },
  {
    id: "tebata-trainer",
    title: "手旗信号 3D トレーナー",
    subtitle: "ボーイスカウト向け 和文手旗3D学習スタジオ",
    category: "study",
    categoryLabel: "学習・トレーニング",
    badge: "3D・超高速対応",
    description:
      "Three.js 3Dモデルで和文手旗信号を本格トレーニング！10〜400字/分のスピード調整、基本原画・50音分解の「教えるモード」、自由送信モードを搭載。",
    tags: ["ボーイスカウト", "3Dアニメ", "自動出題", "自由送信"],
    playUrl: "https://noppe7856.github.io/tebata-trainer/",
    detailUrl: "./apps/tebata-trainer.html",
    repoUrl: "https://github.com/noppe7856/tebata-trainer",
    accentFrom: "#0ea5e9",
    accentTo: "#10b981",
    iconText: "🚩",
    updatedAt: "2026-11"
  }
];

export const CATEGORIES = [
  { id: "all", label: "すべて", emoji: "✨" },
  { id: "study", label: "学習・トレーニング", emoji: "📚" },
  { id: "game", label: "ミニゲーム", emoji: "🎮" },
  { id: "tool", label: "べんりツール", emoji: "🛠️" }
];
