import { SITE_CONFIG } from "./site-config.js";
import { APPS_DATA, CATEGORIES } from "./apps.js";
import { trackEvent } from "./analytics.js";

function showToast(message) {
  let toast = document.getElementById("portal-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "portal-toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

/**
 * 各作品の個性を表現するカスタムSVGアートワーク（汎用グラデーション＋絵文字の代替）
 */
function getAppArtwork(appId) {
  if (appId === "monolith-quake") {
    return `
      <svg viewBox="0 0 560 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="560" height="320" fill="#f2f3f0"/>
        <g stroke="#d4d8d1" stroke-width="1">
          <line x1="0" y1="80" x2="560" y2="80"/>
          <line x1="0" y1="160" x2="560" y2="160"/>
          <line x1="0" y1="240" x2="560" y2="240"/>
          <line x1="140" y1="0" x2="140" y2="320"/>
          <line x1="280" y1="0" x2="280" y2="320"/>
          <line x1="420" y1="0" x2="420" y2="320"/>
        </g>
        <!-- Porcelain monochrome globe -->
        <circle cx="280" cy="155" r="102" fill="#ffffff" stroke="#161b22" stroke-width="1.6"/>
        <ellipse cx="280" cy="155" rx="52" ry="102" fill="none" stroke="#cbd1c8" stroke-width="1"/>
        <ellipse cx="280" cy="155" rx="84" ry="102" fill="none" stroke="#d8ddd5" stroke-width="1"/>
        <ellipse cx="280" cy="155" rx="102" ry="38" fill="none" stroke="#cbd1c8" stroke-width="1"/>
        <ellipse cx="280" cy="155" rx="102" ry="72" fill="none" stroke="#d8ddd5" stroke-width="1"/>
        <!-- Seismic ripple rings at Pacific rim -->
        <circle cx="322" cy="128" r="36" fill="none" stroke="#161b22" stroke-opacity="0.22" stroke-width="1.2"/>
        <circle cx="322" cy="128" r="22" fill="none" stroke="#161b22" stroke-opacity="0.48" stroke-width="1.4"/>
        <circle cx="322" cy="128" r="10" fill="none" stroke="#161b22" stroke-width="1.6"/>
        <circle cx="322" cy="128" r="4" fill="#161b22"/>
        <!-- Secondary quake ripple -->
        <circle cx="236" cy="186" r="18" fill="none" stroke="#161b22" stroke-opacity="0.25" stroke-width="1"/>
        <circle cx="236" cy="186" r="3.5" fill="#161b22"/>
        <!-- Minimal Lo-Fi waveform bar -->
        <g transform="translate(86, 266)" stroke="#161b22" stroke-width="2" stroke-linecap="round">
          <line x1="0" y1="8" x2="0" y2="18"/>
          <line x1="8" y1="3" x2="8" y2="23"/>
          <line x1="16" y1="10" x2="16" y2="16"/>
          <line x1="24" y1="0" x2="24" y2="26"/>
          <line x1="32" y1="6" x2="32" y2="20"/>
          <line x1="40" y1="11" x2="40" y2="15"/>
          <line x1="48" y1="4" x2="48" y2="22"/>
          <line x1="56" y1="8" x2="56" y2="18"/>
        </g>
        <text x="474" y="284" text-anchor="end" font-family="ui-monospace, monospace" font-size="11" fill="#4b5563" letter-spacing="1.2">LIVE / 30D</text>
      </svg>
    `;
  }

  if (appId === "kanji-flashcard") {
    return `
      <svg viewBox="0 0 480 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="480" height="240" fill="#eef3fb"/>
        <!-- Back card tilted -->
        <g transform="translate(260, 124) rotate(7)">
          <rect x="-112" y="-76" width="224" height="152" rx="10" fill="#dbe6f9" stroke="#93b4e8" stroke-width="1.5"/>
        </g>
        <!-- Main flashcard (Genkouyoushi style) -->
        <g transform="translate(228, 120) rotate(-3)">
          <rect x="-116" y="-80" width="232" height="160" rx="10" fill="#ffffff" stroke="#1d4ed8" stroke-width="1.8"/>
          <!-- Grid inside card -->
          <rect x="-56" y="-44" width="112" height="100" fill="none" stroke="#cbd5e1" stroke-width="1"/>
          <line x1="0" y1="-44" x2="0" y2="56" stroke="#e2e8f0" stroke-dasharray="3 3"/>
          <line x1="-56" y1="6" x2="56" y2="6" stroke="#e2e8f0" stroke-dasharray="3 3"/>
          <text x="0" y="-52" text-anchor="middle" font-size="12" font-weight="700" fill="#1d4ed8">としょかん</text>
          <text x="0" y="28" text-anchor="middle" font-size="56" font-weight="900" fill="#161b22">漢</text>
          <!-- Red teacher stamp circle -->
          <circle cx="80" cy="-46" r="18" fill="none" stroke="#d93829" stroke-width="2.4"/>
          <circle cx="80" cy="-46" r="13" fill="none" stroke="#d93829" stroke-width="1.2"/>
        </g>
      </svg>
    `;
  }

  if (appId === "tebata-trainer") {
    return `
      <svg viewBox="0 0 480 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="480" height="240" fill="#eef4f0"/>
        <!-- Angle guide protractor arcs -->
        <circle cx="240" cy="136" r="78" fill="none" stroke="#c3d4c8" stroke-width="1.2" stroke-dasharray="4 4"/>
        <circle cx="240" cy="136" r="46" fill="none" stroke="#d5e2d9" stroke-width="1"/>
        <!-- Scout silhouette -->
        <circle cx="240" cy="84" r="14" fill="#161b22"/>
        <rect x="228" y="102" width="24" height="58" rx="10" fill="#161b22"/>
        <!-- Left arm (viewer's left = right hand = Red Flag) -->
        <line x1="230" y1="114" x2="162" y2="74" stroke="#161b22" stroke-width="6" stroke-linecap="round"/>
        <line x1="162" y1="74" x2="112" y2="44" stroke="#4b5563" stroke-width="3" stroke-linecap="round"/>
        <polygon points="114,45 148,66 132,94 98,74" fill="#d93829" stroke="#161b22" stroke-width="1.2"/>
        <!-- Right arm (viewer's right = left hand = White Flag) -->
        <line x1="250" y1="114" x2="318" y2="114" stroke="#161b22" stroke-width="6" stroke-linecap="round"/>
        <line x1="318" y1="114" x2="378" y2="114" stroke="#4b5563" stroke-width="3" stroke-linecap="round"/>
        <rect x="332" y="114" width="44" height="34" fill="#ffffff" stroke="#161b22" stroke-width="1.4"/>
        <!-- Ground line -->
        <line x1="90" y1="204" x2="390" y2="204" stroke="#b8c9bd" stroke-width="1.5"/>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 480 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="480" height="240" fill="#eef0eb"/>
      <rect x="190" y="70" width="100" height="100" rx="14" fill="#ffffff" stroke="#161b22" stroke-width="1.5"/>
    </svg>
  `;
}

function hydrateSiteText() {
  document.querySelectorAll("[data-site-name]").forEach((el) => {
    el.textContent = SITE_CONFIG.siteName;
  });
  document.querySelectorAll("[data-site-sub]").forEach((el) => {
    el.textContent = SITE_CONFIG.siteSub;
  });
  document.querySelectorAll("[data-support-message]").forEach((el) => {
    el.textContent = SITE_CONFIG.support.message;
  });
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

function hydrateSupportUI() {
  const supportContainer = document.getElementById("support-action-area");
  if (!supportContainer) return;

  const { enabled, url, serviceName, buttonLabel } = SITE_CONFIG.support;
  if (enabled && url) {
    supportContainer.innerHTML = `
      <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="btn btn-support" data-track-event="support_click" data-track-label="${escapeHtml(serviceName)}">
        <span>${escapeHtml(buttonLabel)}（${escapeHtml(serviceName)}）</span>
      </a>
    `;
  } else {
    supportContainer.innerHTML = `
      <div class="support-status-note">
        <strong>応援ページは現在準備中です</strong><br />
        SNSでのシェアやご感想をいただけると、次の作品づくりの励みになります。
      </div>
    `;
  }
}

function hydrateContactUI() {
  const formBox = document.getElementById("contact-form-box");
  if (!formBox) return;

  const { formUrl, githubIssuesUrl } = SITE_CONFIG.contact;
  if (formUrl) {
    formBox.innerHTML = `
      <a href="${escapeHtml(formUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" data-track-event="contact_click" data-track-label="form">
        お問い合わせフォームを開く
      </a>
      <a href="${escapeHtml(githubIssuesUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" data-track-event="contact_click" data-track-label="github_issues">
        GitHub Issues で送る
      </a>
    `;
  } else {
    formBox.innerHTML = `
      <a href="${escapeHtml(githubIssuesUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" data-track-event="contact_click" data-track-label="github_issues">
        GitHub Issues で感想・リクエストを送る
      </a>
    `;
  }
}

function hydrateAdSense() {
  const { enabled, clientId, slots } = SITE_CONFIG.adsense;
  if (!enabled || !clientId) return;

  const adContainers = document.querySelectorAll("[data-ad-slot]");
  if (!adContainers.length) return;

  if (!document.querySelector('script[data-adsense-loader="true"]')) {
    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.adsenseLoader = "true";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`;
    document.head.appendChild(script);
  }

  adContainers.forEach((wrapper) => {
    const slotKey = wrapper.getAttribute("data-ad-slot");
    const slotId = slots?.[slotKey];
    if (!slotId) return;

    wrapper.classList.add("is-active");
    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.setAttribute("data-ad-client", clientId);
    ins.setAttribute("data-ad-slot", slotId);
    ins.setAttribute("data-ad-format", "auto");
    ins.setAttribute("data-full-width-responsive", "true");
    wrapper.appendChild(ins);

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (_) {
      // AdSense script will initialize once loaded
    }
  });
}

function initShareButtons() {
  document.querySelectorAll("[data-share]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const type = btn.getAttribute("data-share");
      const shareUrl = btn.getAttribute("data-share-url") || window.location.href;
      const shareText =
        btn.getAttribute("data-share-text") ||
        `${document.title} | ${SITE_CONFIG.siteName}`;

      trackEvent("share_click", { label: type, share_url: shareUrl });

      if (type === "x") {
        const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(xUrl, "_blank", "noopener,noreferrer");
      } else if (type === "line") {
        const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`;
        window.open(lineUrl, "_blank", "noopener,noreferrer");
      } else if (type === "copy") {
        try {
          await navigator.clipboard.writeText(shareUrl);
          showToast("URLをコピーしました");
        } catch (_) {
          showToast("URLのコピーに失敗しました");
        }
      }
    });
  });
}

function initPortalCatalog() {
  const grid = document.getElementById("apps-grid");
  const filterWrap = document.getElementById("filter-tabs");
  const searchInput = document.getElementById("app-search");
  const countBadge = document.getElementById("app-count");
  if (!grid || !filterWrap) return;

  let activeCategory = "all";
  let keyword = "";

  filterWrap.innerHTML = CATEGORIES.map(
    (cat) => `
      <button type="button" class="filter-btn ${cat.id === "all" ? "active" : ""}" data-category="${cat.id}" role="tab" aria-selected="${cat.id === "all" ? "true" : "false"}">
        ${escapeHtml(cat.label)}
      </button>
    `
  ).join("");

  const render = () => {
    const q = keyword.trim().toLowerCase();
    const filtered = APPS_DATA.filter((app) => {
      const catMatch = activeCategory === "all" || app.category === activeCategory;
      if (!catMatch) return false;
      if (!q) return true;
      const haystack = [app.title, app.subtitle, app.description, app.categoryLabel, ...app.tags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });

    if (countBadge) {
      countBadge.textContent = `${filtered.length}作品`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-result">
          <strong>条件に合うアプリはまだありません</strong>
          <p style="margin:8px 0 16px;">別のキーワードで探すか、「こんなアプリが欲しい」というアイデアを送ってください。</p>
          <a href="./contact.html" class="btn btn-secondary">リクエストを送る</a>
        </div>
      `;
      return;
    }

    const useFeaturedLead = activeCategory === "all" && !q && filtered.length >= 2;

    const cardsHtml = filtered
      .map((app, index) => {
        const isFeatured = useFeaturedLead && index === 0;
        return `
        <article class="app-card ${isFeatured ? "is-featured" : ""}">
          <a href="${escapeHtml(app.playUrl)}" class="app-art" aria-label="${escapeHtml(app.title)}を開く" data-track-event="play_app" data-app-id="${escapeHtml(app.id)}">
            ${getAppArtwork(app.id)}
          </a>
          <div class="app-body">
            <div class="app-meta-row">
              <span class="app-category-label">${escapeHtml(app.categoryLabel)}</span>
              <span>${escapeHtml(app.badge)}</span>
            </div>
            <h3 class="app-title">${escapeHtml(app.title)}</h3>
            <p class="app-subtitle">${escapeHtml(app.subtitle)}</p>
            <p class="app-desc">${escapeHtml(app.description)}</p>
            <div class="tag-list">
              ${app.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
            </div>
            <div class="app-trust-meta">
              <span>${escapeHtml(app.privacyNote || "端末内保存のみ")}</span>
              <a href="${escapeHtml(app.repoUrl)}" target="_blank" rel="noopener noreferrer" data-track-event="source_code_click" data-app-id="${escapeHtml(app.id)}">ソースコードを見る</a>
            </div>
            <div class="app-actions">
              <a href="${escapeHtml(app.playUrl)}" class="btn btn-primary" data-track-event="play_app" data-app-id="${escapeHtml(app.id)}">${escapeHtml(app.actionLabel || "アプリを開く")}</a>
              <a href="${escapeHtml(app.detailUrl)}" class="btn btn-secondary" data-track-event="view_detail" data-app-id="${escapeHtml(app.id)}">くわしく見る</a>
            </div>
          </div>
        </article>
      `;
      })
      .join("");

    const comingSoonHtml =
      activeCategory === "all" && !q
        ? `
        <article class="app-card coming-soon">
          <div>
            <h3 class="app-title" style="margin-bottom:4px;font-size:1.12rem;">次のアプリ・ゲームを制作中</h3>
            <p class="app-desc" style="margin:0;">
              「こんな学習ツールが欲しい」「こんなミニゲームで遊びたい」といったリクエストを受け付けています。
            </p>
          </div>
          <div class="app-actions" style="flex-shrink:0;">
            <a href="./contact.html" class="btn btn-secondary" data-track-event="request_click">アイデアを送る</a>
          </div>
        </article>
      `
        : "";

    grid.innerHTML = cardsHtml + comingSoonHtml;
  };

  filterWrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    activeCategory = btn.getAttribute("data-category") || "all";
    filterWrap.querySelectorAll(".filter-btn").forEach((el) => {
      const isSelected = el === btn;
      el.classList.toggle("active", isSelected);
      el.setAttribute("aria-selected", String(isSelected));
    });
    render();
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      keyword = e.target.value;
      render();
    });
  }

  render();
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
  hydrateSiteText();
  hydrateSupportUI();
  hydrateContactUI();
  hydrateAdSense();
  initShareButtons();
  initPortalCatalog();
});
