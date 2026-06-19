const prefix = [
  "https://payment.hotmart.com",
  "https://pay.hotmart.com",
  "https://go.hotmart.com",
  "https://pay.kiwify.com.br",
  "https://sun.eduzz.com"
];

function getSckParam() {
  const url = new URL(window.location.href);
  const utm_source = url.searchParams.get("utm_source") || "";
  const utm_medium = url.searchParams.get("utm_medium") || "";
  const utm_campaign = url.searchParams.get("utm_campaign") || "";
  const utm_term = url.searchParams.get("utm_term") || "";
  const utm_content = url.searchParams.get("utm_content") || "";

  const sck = encodeURIComponent(
    `${utm_source}|${utm_campaign}|${utm_medium}|${utm_content}|${utm_term}`
  );
  return `sck=${sck}`;
}

function getXcodParam() {
  const url = new URL(window.location.href);

  const source = url.searchParams.get("utm_source") || "";
  const campaignName = url.searchParams.get("utm_campaign") || "";
  const campaignId = url.searchParams.get("campaign_id") || "";
  const adsetName = url.searchParams.get("utm_medium") || "";
  const adsetId = url.searchParams.get("adset_id") || "";
  const adName = url.searchParams.get("utm_content") || "";
  const adId = url.searchParams.get("ad_id") || "";
  const placement = url.searchParams.get("utm_term") || "";

  const xcod = encodeURIComponent(
    `${source}|${campaignName}|${campaignId}|${adsetName}|${adsetId}|${adName}|${adId}|${placement}`
  );
  return `xcod=${xcod}`;
}

function applyParams() {
  const currentParams = new URLSearchParams(window.location.search);
  const sckParam = getSckParam();
  const xcodParam = getXcodParam();

  if (currentParams.toString()) {
    document.querySelectorAll("a").forEach((link) => {
      for (let i = 0; i < prefix.length; i++) {
        if (link.href.includes(prefix[i])) {
          const connector = link.href.includes("?") ? "&" : "?";
          if (!link.href.includes("utm_source")) {
            link.href += `${connector}${currentParams.toString()}&${sckParam}&${xcodParam}`;
          }
        }
      }
    });
  }
}

applyParams();

const observer = new MutationObserver(() => {
  applyParams();
});

observer.observe(document.body, { childList: true, subtree: true });
