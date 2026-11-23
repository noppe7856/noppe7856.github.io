import { SITE_CONFIG } from "./site-config.js";

/**
 * ポータル＆全アプリ共通 客観的アクセス計測モジュール
 *
 * 使い方（各アプリから読み込む場合）:
 *   <script type="module" src="https://noppe7856.github.io/js/analytics.js" data-app-id="kanji-flashcard"></script>
 *
 * 特徴:
 * - SITE_CONFIG.analytics を1箇所設定するだけで、ポータル＋全アプリのPV・流入元・イベントを一括計測
 * - GA4 / GoatCounter / Cloudflare Web Analytics に対応（複数併用可）
 * - オフラインやブロッカー環境でも例外を出さず、アプリの動作に影響を与えません
 * - ?debug_analytics=1 を付けて開くと、イベント送信ログを画面で確認できます
 */

const eventLog = [];

function isDebugMode() {
  try {
    return new URLSearchParams(window.location.search).get("debug_analytics") === "1";
  } catch (_) {
    return false;
  }
}

function recordLog(provider, eventName, payload) {
  const entry = {
    time: new Date().toISOString(),
    provider,
    eventName,
    payload
  };
  eventLog.push(entry);
  if (typeof window !== "undefined") {
    window.__NOPPE_ANALYTICS_LOG__ = eventLog;
  }
  if (isDebugMode()) {
    console.info("[noppe-analytics]", provider, eventName, payload);
  }
}

export function initGA4(config) {
  if (!config?.enabled || !config?.measurementId) return false;
  const id = String(config.measurementId).trim();
  if (!id) return false;

  if (!document.querySelector('script[data-noppe-ga4="true"]')) {
    const s = document.createElement("script");
    s.async = true;
    s.dataset.noppeGa4 = "true";
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(s);
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  window.gtag("js", new Date());
  window.gtag("config", id, {
    anonymize_ip: true,
    transport_type: "beacon"
  });

  recordLog("ga4", "init", { measurementId: id, path: window.location.pathname });
  return true;
}

export function initGoatCounter(config) {
  if (!config?.enabled || !config?.code) return false;
  const code = String(config.code).trim();
  if (!code) return false;

  if (!document.querySelector('script[data-noppe-goatcounter="true"]')) {
    const s = document.createElement("script");
    s.async = true;
    s.dataset.noppeGoatcounter = "true";
    s.setAttribute("data-goatcounter", `https://${encodeURIComponent(code)}.goatcounter.com/count`);
    s.src = "https://gc.zgo.at/count.js";
    document.head.appendChild(s);
  }

  recordLog("goatcounter", "init", { code, path: window.location.pathname });
  return true;
}

export function initCloudflareAnalytics(config) {
  if (!config?.enabled || !config?.beaconToken) return false;
  const token = String(config.beaconToken).trim();
  if (!token) return false;

  if (!document.querySelector('script[data-noppe-cf="true"]')) {
    const s = document.createElement("script");
    s.defer = true;
    s.dataset.noppeCf = "true";
    s.src = "https://static.cloudflareinsights.com/beacon.min.js";
    s.setAttribute("data-cf-beacon", JSON.stringify({ token }));
    document.head.appendChild(s);
  }

  recordLog("cloudflare", "init", { path: window.location.pathname });
  return true;
}

export function trackEvent(eventName, params = {}) {
  try {
    const analytics = SITE_CONFIG.analytics || {};
    const enriched = {
      page_path: typeof window !== "undefined" ? window.location.pathname : "",
      ...params
    };

    if (analytics.ga4?.enabled && typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, enriched);
      recordLog("ga4", eventName, enriched);
    }

    if (
      analytics.goatcounter?.enabled &&
      typeof window !== "undefined" &&
      window.goatcounter &&
      typeof window.goatcounter.count === "function"
    ) {
      window.goatcounter.count({
        path: `event/${eventName}/${params.app_id || params.label || "general"}`,
        title: `${eventName}: ${params.app_id || params.label || ""}`.trim(),
        event: true
      });
      recordLog("goatcounter", eventName, enriched);
    }

    if (!analytics.ga4?.enabled && !analytics.goatcounter?.enabled) {
      recordLog("dry-run", eventName, enriched);
    }
  } catch (_) {
    // Never break app behavior due to analytics
  }
}

export function initAnalytics(overrideConfig) {
  const analytics = overrideConfig || SITE_CONFIG.analytics || {};
  const activeProviders = [];

  try {
    if (initGA4(analytics.ga4)) activeProviders.push("ga4");
    if (initGoatCounter(analytics.goatcounter)) activeProviders.push("goatcounter");
    if (initCloudflareAnalytics(analytics.cloudflare)) activeProviders.push("cloudflare");

    // Inject Google Search Console meta tag if configured
    if (
      analytics.searchConsoleVerification &&
      typeof document !== "undefined" &&
      !document.querySelector('meta[name="google-site-verification"]')
    ) {
      const meta = document.createElement("meta");
      meta.name = "google-site-verification";
      meta.content = analytics.searchConsoleVerification;
      document.head.appendChild(meta);
    }

    // Track clicks on elements with data-track-event
    if (typeof document !== "undefined" && !document.documentElement.dataset.noppeAnalyticsBound) {
      document.documentElement.dataset.noppeAnalyticsBound = "true";
      document.addEventListener("click", (e) => {
        const target = e.target?.closest?.("[data-track-event]");
        if (!target) return;
        const eventName = target.getAttribute("data-track-event");
        const appId = target.getAttribute("data-app-id") || "";
        const label = target.getAttribute("data-track-label") || target.textContent?.trim()?.slice(0, 40) || "";
        trackEvent(eventName, { app_id: appId, label });
      });
    }

    // Detect if loaded inside an individual app via data-app-id
    if (typeof document !== "undefined") {
      const selfScript = document.querySelector('script[src*="analytics.js"][data-app-id]');
      const appId = selfScript?.getAttribute("data-app-id");
      if (appId) {
        trackEvent("app_open", { app_id: appId });
      }
    }
  } catch (_) {
    // Graceful no-op
  }

  return activeProviders;
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initAnalytics());
  } else {
    initAnalytics();
  }
}
