import { SITE_CONFIG } from "./site-config.js";
import { APPS_DATA } from "./apps.js";

function renderProviderCards() {
  const container = document.getElementById("analytics-status-grid");
  if (!container) return;

  const { ga4, goatcounter, cloudflare, searchConsoleVerification } = SITE_CONFIG.analytics || {};

  const providers = [
    {
      name: "GoatCounter（おすすめ・最速）",
      active: Boolean(goatcounter?.enabled && goatcounter?.code),
      detail: goatcounter?.code
        ? `計測先: https://${goatcounter.code}.goatcounter.com`
        : "未設定（Cookie不要・無料・3分で開始可）",
      dashboardUrl: goatcounter?.code
        ? `https://${goatcounter.code}.goatcounter.com`
        : "https://www.goatcounter.com/signup",
      dashboardLabel: goatcounter?.code ? "集計画面を開く ↗" : "無料アカウント作成 ↗"
    },
    {
      name: "Google Analytics 4 (GA4)",
      active: Boolean(ga4?.enabled && ga4?.measurementId),
      detail: ga4?.measurementId
        ? `測定ID: ${ga4.measurementId}`
        : "未設定（PV・UU・流入元・アプリ起動イベント計測）",
      dashboardUrl: "https://analytics.google.com/",
      dashboardLabel: "GA4 管理画面を開く ↗"
    },
    {
      name: "Cloudflare Web Analytics",
      active: Boolean(cloudflare?.enabled && cloudflare?.beaconToken),
      detail: cloudflare?.beaconToken
        ? "ビーコン設定済み"
        : "未設定（Cookie不要・パフォーマンス計測対応）",
      dashboardUrl: "https://dash.cloudflare.com/",
      dashboardLabel: "Cloudflare を開く ↗"
    },
    {
      name: "Google Search Console",
      active: Boolean(searchConsoleVerification),
      detail: searchConsoleVerification
        ? "所有権確認メタタグ設定済み"
        : "未設定（Google検索の表示回数・クリック数・検索語句を確認）",
      dashboardUrl: "https://search.google.com/search-console",
      dashboardLabel: "Search Console を開く ↗"
    }
  ];

  container.innerHTML = providers
    .map(
      (p) => `
      <div class="status-card">
        <div class="status-head">
          <strong>${escapeHtml(p.name)}</strong>
          <span class="${p.active ? "pill-ok" : "pill-off"}">${p.active ? "● 計測中" : "○ 未設定"}</span>
        </div>
        <p style="margin:0 0 12px;font-size:0.84rem;color:var(--text-subtle);">${escapeHtml(p.detail)}</p>
        <a href="${escapeHtml(p.dashboardUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width:100%;font-size:0.82rem;padding:8px 12px;">
          ${escapeHtml(p.dashboardLabel)}
        </a>
      </div>
    `
    )
    .join("");
}

async function renderGitHubReposTable() {
  const tbody = document.getElementById("repo-stats-body");
  if (!tbody) return;

  const targets = [
    {
      title: `${SITE_CONFIG.siteName}（ポータル本体）`,
      repoName: "noppe7856.github.io",
      url: `${SITE_CONFIG.baseUrl}/`
    },
    ...APPS_DATA.map((app) => ({
      title: app.title,
      repoName: app.repoName || app.id,
      url: app.playUrl
    }))
  ];

  tbody.innerHTML = targets
    .map(
      (t) => `
      <tr data-repo="${escapeHtml(t.repoName)}">
        <td><strong>${escapeHtml(t.title)}</strong></td>
        <td><a href="${escapeHtml(t.url)}" target="_blank" rel="noopener noreferrer" style="color:var(--primary);text-decoration:underline;">${escapeHtml(t.url)}</a></td>
        <td data-col="stars">読込中...</td>
        <td data-col="updated">読込中...</td>
        <td>
          <a href="https://github.com/${SITE_CONFIG.authorName}/${escapeHtml(t.repoName)}/graphs/traffic" target="_blank" rel="noopener noreferrer" style="color:var(--primary);font-weight:700;">
            Traffic ↗
          </a>
        </td>
      </tr>
    `
    )
    .join("");

  await Promise.all(
    targets.map(async (t) => {
      const row = tbody.querySelector(`tr[data-repo="${CSS.escape(t.repoName)}"]`);
      if (!row) return;
      try {
        const res = await fetch(`https://api.github.com/repos/${SITE_CONFIG.authorName}/${encodeURIComponent(t.repoName)}`);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        row.querySelector('[data-col="stars"]').textContent = `⭐ ${data.stargazers_count ?? 0}`;
        const d = data.pushed_at ? new Date(data.pushed_at).toLocaleDateString("ja-JP") : "-";
        row.querySelector('[data-col="updated"]').textContent = d;
      } catch (_) {
        row.querySelector('[data-col="stars"]').textContent = "-";
        row.querySelector('[data-col="updated"]').textContent = "-";
      }
    })
  );
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

document.addEventListener("DOMContentLoaded", () => {
  renderProviderCards();
  renderGitHubReposTable();
});
