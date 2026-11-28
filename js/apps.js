/**
 * 公開アプリ＆ゲーム一覧データ
 *
 * 新しいアプリやゲームを追加したいときは、この配列に1オブジェクト追加するだけで
 * トップページのカード一覧・カテゴリ絞り込み・件数表示へ自動的に反映されます。
 */
export const APPS_DATA = [
  {
    id: "monolith-quake",
    repoName: "monolith-quake",
    title: "MONOLITH",
    subtitle: "3D地球儀リアルタイム地震モニター & Lo-Fiプレイヤー",
    category: "tool",
    categoryLabel: "べんりツール",
    badge: "3D・Lo-Fi自動生成",
    actionLabel: "MONOLITHを開く",
    description:
      "ホワイトベース・完全モノクロームの3D地球儀で世界中の地震をリアルタイム監視。過去30日間のタイムライン再生と、Web Audio APIによるLo-Fiチルミュージック自動生成を搭載しています。",
    tags: ["3D地球儀", "リアルタイム地震", "Lo-Fi音楽", "モノクローム"],
    privacyNote: "登録不要・単一HTML動作",
    playUrl: "https://noppe7856.github.io/monolith-quake/",
    detailUrl: "./apps/monolith-quake.html",
    repoUrl: "https://github.com/noppe7856/monolith-quake",
    updatedAt: "2026-11-25"
  },
  {
    id: "kanji-flashcard",
    repoName: "kanji-flashcard",
    title: "漢字読みマスター！",
    subtitle: "小4〜高校 イメージ漢字フラッシュカード",
    category: "study",
    categoryLabel: "学習",
    badge: "PWA対応",
    actionLabel: "漢字を練習する",
    description:
      "イラストと音声でイメージしながら漢字の読みを覚えられるフラッシュカード。学年別フィルタ、苦手単語の集中復習、毎日の連続記録に対応しています。",
    tags: ["小4〜高校", "音声読み上げ", "苦手克服", "スマホ対応"],
    privacyNote: "端末内保存のみ・登録不要",
    playUrl: "https://noppe7856.github.io/kanji-flashcard/",
    detailUrl: "./apps/kanji-flashcard.html",
    repoUrl: "https://github.com/noppe7856/kanji-flashcard",
    updatedAt: "2026-11-23"
  },
  {
    id: "tebata-trainer",
    repoName: "tebata-trainer",
    title: "手旗信号 3D トレーナー",
    subtitle: "ボーイスカウト向け 和文手旗3D学習スタジオ",
    category: "study",
    categoryLabel: "学習・トレーニング",
    badge: "3D・10〜400字/分",
    actionLabel: "手旗を練習する",
    description:
      "Three.js の3Dモデルで和文手旗信号を本格トレーニング。スピード調整、基本原画・50音分解の「教えるモード」、好きな言葉を打てる自由送信モードを備えています。",
    tags: ["ボーイスカウト", "3Dアニメ", "自動出題", "自由送信"],
    privacyNote: "端末内保存のみ・登録不要",
    playUrl: "https://noppe7856.github.io/tebata-trainer/",
    detailUrl: "./apps/tebata-trainer.html",
    repoUrl: "https://github.com/noppe7856/tebata-trainer",
    updatedAt: "2026-11-23"
  }
];

export const CATEGORIES = [
  { id: "all", label: "すべて" },
  { id: "study", label: "学習・トレーニング" },
  { id: "tool", label: "べんりツール" },
  { id: "game", label: "ミニゲーム" }
];
