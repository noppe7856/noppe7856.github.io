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

function hydrateSiteText() {
  document.querySelectorAll("[data-site-name]").forEach((el) => {
    el.textContent = SITE_CONFIG.siteName;
  });
  document.querySelectorAll("[data-site-sub]").forEach((el) => {
    el.textContent = SITE_CONFIG.siteSub;
  });
  document.querySelectorAll("[data-site-tagline]").forEach((el) => {
    el.textContent = SITE_CONFIG.tagline;
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
        <span>☕</span>
        <span>${escapeHtml(buttonLabel)}（${escapeHtml(serviceName)}）</span>
      </a>
    `;
  } else {
    supportContainer.innerHTML = `
      <div class="support-status-note">
        <strong>☕ 応援リンクは準備中です</strong><br />
        まずは SNS でのシェアや感想をいただけると、とっても励みになります！
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
        ✉️ お問い合わせ・リクエストフォームを開く
      </a>
      <a href="${escapeHtml(githubIssuesUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" data-track-event="contact_click" data-track-label="github_issues">
        💬 GitHub Issues で相談する
      </a>
    `;
  } else {
    formBox.innerHTML = `
      <a href="${escapeHtml(githubIssuesUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" data-track-event="contact_click" data-track-label="github_issues">
        💬 GitHub Issues で感想・リクエストを送る
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
          showToast("URLをコピーしました！");
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
      <button type="button" class="filter-btn ${cat.id === "all" ? "active" : ""}" data-category="${cat.id}">
        ${cat.emoji} ${escapeHtml(cat.label)}
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
          <div style="font-size:2rem;margin-bottom:8px;">🔍</div>
          <strong>条件に合うアプリはまだありません</strong>
          <p style="margin:6px 0 0;">「こんなゲーム・アプリが欲しい！」があれば、ぜひ下の問い合わせからリクエストしてください！</p>
        </div>
      `;
      return;
    }

    const cardsHtml = filtered
      .map(
        (app) => `
        <article class="app-card">
          <a href="${escapeHtml(app.playUrl)}" class="app-thumb" style="background: linear-gradient(135deg, ${app.accentFrom}, ${app.accentTo});" aria-label="${escapeHtml(app.title)}をすぐ遊ぶ" data-track-event="play_app" data-app-id="${escapeHtml(app.id)}">
            <span class="app-badge">${escapeHtml(app.badge)}</span>
            <div class="app-thumb-icon">${escapeHtml(app.iconText)}</div>
            <span class="app-category-chip">${escapeHtml(app.categoryLabel)}</span>
          </a>
          <div class="app-body">
            <h3 class="app-title">${escapeHtml(app.title)}</h3>
            <p class="app-subtitle">${escapeHtml(app.subtitle)}</p>
            <p class="app-desc">${escapeHtml(app.description)}</p>
            <div class="tag-list">
              ${app.tags.map((t) => `<span class="tag">#${escapeHtml(t)}</span>`).join("")}
            </div>
            <div class="app-trust-meta">
              <span>🔒 ${escapeHtml(app.privacyNote || "端末内保存のみ")}</span>
              <a href="${escapeHtml(app.repoUrl)}" target="_blank" rel="noopener noreferrer" data-track-event="source_code_click" data-app-id="${escapeHtml(app.id)}">ソース公開 ↗</a>
            </div>
            <div class="app-actions">
              <a href="${escapeHtml(app.playUrl)}" class="btn btn-primary" data-track-event="play_app" data-app-id="${escapeHtml(app.id)}">▶ すぐ遊ぶ</a>
              <a href="${escapeHtml(app.detailUrl)}" class="btn btn-secondary" data-track-event="view_detail" data-app-id="${escapeHtml(app.id)}">くわしく</a>
            </div>
          </div>
        </article>
      `
      )
      .join("");

    const comingSoonHtml =
      activeCategory === "all" && !q
        ? `
        <article class="app-card coming-soon">
          <div class="coming-emoji">🚀</div>
          <h3 class="app-title" style="margin-bottom:6px;">新作アプリ・ゲーム準備中！</h3>
          <p class="app-desc" style="flex:0;margin-bottom:16px;">
            「こんなミニゲームが遊びたい」「こんな学習ツールが欲しい」などのリクエストも大歓迎です。
          </p>
          <a href="./contact.html" class="btn btn-secondary" data-track-event="request_click">💡 アイデアをリクエストする</a>
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
      el.classList.toggle("active", el === btn);
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
