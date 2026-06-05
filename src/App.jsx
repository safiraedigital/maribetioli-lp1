import { useEffect, useMemo, useState } from "react";
import pageHtml from "./poderdoparto-elementor.html?raw";

const bodyClass =
  "wp-singular page-template-default page page-id-518 wp-embed-responsive wp-theme-hello-elementor qodef-qi--touch qi-addons-for-elementor-1.10 hello-elementor-default elementor-default elementor-template-canvas elementor-kit-5 elementor-page elementor-page-518";

const DELAY_MS = 18 * 60 * 1000;
const delayedRoute = "/aula-gratuita";
const nextSectionMarker =
  '<div class="elementor-element elementor-element-4704962f';

function getDelayedPageParts() {
  const splitIndex = pageHtml.indexOf(nextSectionMarker);

  if (splitIndex === -1) {
    return {
      heroHtml: pageHtml,
      delayedHtml: ""
    };
  }

  const heroHtml = pageHtml
    .slice(0, splitIndex)
    .replace(
      "Aprenda tudo sobre a gestação e parto, prepare seu acompanhante, evite a violência obstétrica e",
      "Aprenda tudo sobre gestação e parto. Prepare seu acompanhante, evite a violência obstétrica e"
    )
    .replace(
      "Assista e entenda como conquistar um parto seguro e cheio de amor, tanto pelo SUS, quanto pelo particular.\n",
      "Assista e entenda como conquistar um parto seguro."
    );

  return {
    heroHtml,
    delayedHtml: pageHtml.slice(splitIndex)
  };
}

export default function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const isDelayedFunnel =
    window.location.pathname.replace(/\/$/, "") === delayedRoute ||
    searchParams.get("funil") === "aula-gratuita" ||
    searchParams.get("pagina") === "aula-gratuita";
  const [showDelayedContent, setShowDelayedContent] = useState(!isDelayedFunnel);
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
      setShowDelayedContent(true);
      return undefined;
    }

    const storageKey = "poder-do-parto-aula-gratuita-started-at";
    const now = Date.now();
    const storedStart = Number(window.localStorage.getItem(storageKey));
    const startedAt = Number.isFinite(storedStart) && storedStart > 0 ? storedStart : now;

    if (!storedStart) {
      window.localStorage.setItem(storageKey, String(startedAt));
    }

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
        <div dangerouslySetInnerHTML={{ __html: delayedParts.heroHtml }} />
        {showDelayedContent && (
          <div
            className="delayed-funnel-content"
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
