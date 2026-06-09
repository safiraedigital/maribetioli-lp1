import { useEffect, useMemo, useState } from "react";
import pageHtml from "./poderdoparto-elementor.html?raw";

const bodyClass =
  "wp-singular page-template-default page page-id-518 wp-embed-responsive wp-theme-hello-elementor qodef-qi--touch qi-addons-for-elementor-1.10 hello-elementor-default elementor-default elementor-template-canvas elementor-kit-5 elementor-page elementor-page-518";

const DELAY_MS = 18 * 60 * 1000;
const delayedRoutes = ["/aula", "/aula-gratuita"];
const delayedStorageKey = "poder-do-parto-aula-started-at-v3";
const salesVturbPlayerScript =
  "https://scripts.converteai.net/639563c1-cf70-4484-8d65-6fd485e96ab9/players/6a288cff68519b4d1b50bf92/v4/player.js";
const lessonVturbPlayerScript =
  "https://scripts.converteai.net/639563c1-cf70-4484-8d65-6fd485e96ab9/players/6a28849f56303c2b198f3c7b/v4/player.js";
const nextSectionMarker =
  '<div class="elementor-element elementor-element-4704962f';

function injectScriptOnce(src) {
  const existingScript = document.querySelector(`script[src="${src}"]`);

  if (existingScript) {
    return;
  }

  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
}

function getDelayedPageParts() {
  const splitIndex = pageHtml.indexOf(nextSectionMarker);

  if (splitIndex === -1) {
    return {
      delayedHtml: pageHtml
    };
  }

  return {
    delayedHtml: pageHtml.slice(splitIndex)
  };
}

function DelayedFunnelHero() {
  useEffect(() => {
    injectScriptOnce(lessonVturbPlayerScript);
    return undefined;
  }, []);

  useEffect(() => {
    const headline = document.querySelector(".delayed-lesson-headline");
    const headlineLines = headline
      ? [...headline.querySelectorAll(".headline-line")]
      : [];

    if (!headline || headlineLines.length === 0) {
      return undefined;
    }

    const fitHeadline = () => {
      headline.style.removeProperty("--headline-font-size");

      let styles = window.getComputedStyle(headline);
      const maxFontSize = Number.parseFloat(styles.fontSize);
      const minFontSize = window.innerWidth <= 767 ? 10 : 24;

      const linesFit = () =>
        headlineLines.every((line) => line.scrollWidth <= headline.clientWidth + 1);

      if (linesFit()) {
        return;
      }

      let low = minFontSize;
      let high = maxFontSize;

      while (high - low > 0.25) {
        const mid = (low + high) / 2;
        headline.style.setProperty("--headline-font-size", `${mid}px`);
        styles = window.getComputedStyle(headline);

        if (linesFit()) {
          low = Number.parseFloat(styles.fontSize);
        } else {
          high = mid;
        }
      }

      headline.style.setProperty("--headline-font-size", `${low}px`);
    };

    fitHeadline();
    document.fonts?.ready.then(fitHeadline);
    window.addEventListener("resize", fitHeadline);

    return () => {
      window.removeEventListener("resize", fitHeadline);
    };
  }, []);

  return (
    <section className="delayed-lesson-hero" aria-label="Aula gratuita">
      <header className="delayed-lesson-header">
        <img
          src="/assets/imgi_30_o-poder-do-parto-2048x680-1.png"
          alt="O Poder do Parto"
          className="delayed-lesson-logo"
        />
      </header>

      <main className="delayed-lesson-main">
        <h1 className="delayed-lesson-headline">
          <span className="headline-line">
            <span className="headline-normal">
              A forma como você se prepara durante a gestação pode
            </span>
          </span>
          <span className="headline-line">
            <strong className="headline-strong">
              mudar completamente a sua experiência de parto.
            </strong>
          </span>
        </h1>

        <p className="delayed-lesson-subheadline">
          <span className="subheadline-line">
            Prepare seu acompanhante, evite a violência obstétrica
          </span>{" "}
          <span className="subheadline-line">
            e{" "}
            <span className="subheadline-highlight">
              viva o parto dos seus sonhos.
            </span>
          </span>
        </p>

        <div className="delayed-lesson-video delayed-lesson-vturb">
          <vturb-smartplayer
            id="vid-6a28849f56303c2b198f3c7b"
            style={{ display: "block", margin: "0 auto", width: "100%", maxWidth: "400px" }}
          />
        </div>
      </main>

      <footer className="delayed-lesson-footer">
        © 2025 Mariana Betioli. Todos os direitos reservados.
      </footer>
    </section>
  );
}

function getInitialDelayState(isDelayedFunnel) {
  if (!isDelayedFunnel) {
    return true;
  }

  if (typeof window === "undefined") {
    return false;
  }

  const startedAt = Number(window.localStorage.getItem(delayedStorageKey));

  if (!Number.isFinite(startedAt) || startedAt <= 0) {
    return false;
  }

  return Date.now() - startedAt >= DELAY_MS;
}

function getDelayStart() {
  const now = Date.now();
  const storedStart = Number(window.localStorage.getItem(delayedStorageKey));

  if (Number.isFinite(storedStart) && storedStart > 0) {
    return storedStart;
  }

  window.localStorage.setItem(delayedStorageKey, String(now));
  return now;
}

export default function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const normalizedPathname = window.location.pathname.replace(/\/$/, "") || "/";
  const isDelayedFunnel =
    delayedRoutes.includes(normalizedPathname) ||
    searchParams.get("funil") === "aula" ||
    searchParams.get("funil") === "aula-gratuita" ||
    searchParams.get("pagina") === "aula" ||
    searchParams.get("pagina") === "aula-gratuita";
  const [showDelayedContent, setShowDelayedContent] = useState(() =>
    getInitialDelayState(isDelayedFunnel)
  );
  const delayedParts = useMemo(getDelayedPageParts, []);

  useEffect(() => {
    const previousClass = document.body.className;
    document.body.className = bodyClass;

    const setDeviceMode = () => {
      const width = window.innerWidth;
      document.body.dataset.elementorDeviceMode =
        width <= 767 ? "mobile" : width <= 1024 ? "tablet" : "desktop";
    };

    setDeviceMode();
    window.addEventListener("resize", setDeviceMode);

    return () => {
      window.removeEventListener("resize", setDeviceMode);
      document.body.className = previousClass;
      delete document.body.dataset.elementorDeviceMode;
    };
  }, []);

  useEffect(() => {
    if (!isDelayedFunnel) {
      injectScriptOnce(salesVturbPlayerScript);
      setShowDelayedContent(true);
      return undefined;
    }

    const now = Date.now();
    const startedAt = getDelayStart();
    const remainingDelay = Math.max(DELAY_MS - (now - startedAt), 0);

    if (remainingDelay === 0) {
      setShowDelayedContent(true);
      return undefined;
    }

    setShowDelayedContent(false);
    const timeout = window.setTimeout(() => {
      setShowDelayedContent(true);
    }, remainingDelay);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isDelayedFunnel]);

  if (isDelayedFunnel) {
    return (
      <div className="cloned-elementor-page delayed-funnel-page">
        <DelayedFunnelHero />
        {showDelayedContent && (
          <div
            data-elementor-type="wp-page"
            data-elementor-id="518"
            className="delayed-funnel-content elementor elementor-518"
            data-elementor-post-type="page"
            dangerouslySetInnerHTML={{ __html: delayedParts.delayedHtml }}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className="cloned-elementor-page"
      dangerouslySetInnerHTML={{ __html: pageHtml }}
    />
  );
}
