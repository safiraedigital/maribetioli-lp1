import { useEffect } from "react";
import pageHtml from "./poderdoparto-elementor.html?raw";

const bodyClass =
  "wp-singular page-template-default page page-id-518 wp-embed-responsive wp-theme-hello-elementor qodef-qi--touch qi-addons-for-elementor-1.10 hello-elementor-default elementor-default elementor-template-canvas elementor-kit-5 elementor-page elementor-page-518";

export default function App() {
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

  return (
    <div
      className="cloned-elementor-page"
      dangerouslySetInnerHTML={{ __html: pageHtml }}
    />
  );
}
