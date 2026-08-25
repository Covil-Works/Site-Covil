import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import AppLandingPage from "./pages/AppLandingPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import NotFoundPage from "./pages/NotFoundPage";
import LinksPage from "./pages/LinksPage";
import EquipePage from "./pages/EquipePage";
import SolutionsPage from "./pages/SolutionsPage";
import SolutionPage from "./pages/SolutionPage";

const APP_REGISTRY = { splitup: { name: "SplitUp" } };
const SOLUTION_REGISTRY = {
  splitup: {
    name: "SplitUp",
    category: "Aplicativo mobile",
    description: "App Mobile Android que ajuda a dividir contas entre amigos em bares, restaurantes e supermercados.",
    details: "Kotlin · Room · Android",
    status: "Disponível",
    accent: "green",
    device: "phone",
    image: "/img/su-main.jpg",
    imageAlt: "Tela principal do SplitUp",
    phoneImages: { left: "/img/su-coomanda.jpg", right: "/img/su-amigos.jpg" },
    rotatePhonePreview: true,
  },
  mywl: {
    name: "MyWL",
    category: "Solução digital",
    description: "Aplicação Web para uma wishlist global compartilhada para presentes, aniversário, casamentos, etc.",
    details: "Next.js · PostgreSQL · Vercel",
    status: "Em construção",
    accent: "violet",
    device: "desktop",
    image: null,
    imageAlt: "Tela do MyWL",
    carouselImages: ["/img/mywl-1.png", "/img/mywl-2.png", "/img/mywl-3.png"],
  },
};
const APP_PAGE_REGISTRY = { privacypoly: PrivacyPolicyPage };

function normalizePath(pathname) {
  if (!pathname) return "/";
  const normalized = pathname.replace(/\/+$/, "");
  return normalized === "" ? "/" : normalized;
}

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("covil-theme");
    if (saved === "light" || saved === "dark") return saved;
    return "dark";
  });

  useEffect(() => {
    localStorage.setItem("covil-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    if (document.body) {
      document.body.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  const pathname = normalizePath(window.location.pathname);

  if (pathname === "/") return <HomePage theme={theme} toggleTheme={toggleTheme} />;
  if (pathname === "/equipe") return <EquipePage theme={theme} toggleTheme={toggleTheme} />;
  if (pathname === "/links") return <LinksPage theme={theme} toggleTheme={toggleTheme} />;
  if (pathname === "/solucoes") return <SolutionsPage solutions={SOLUTION_REGISTRY} theme={theme} toggleTheme={toggleTheme} />;

  const parts = pathname.slice(1).split("/").filter(Boolean);
  if (parts[0] === "solucoes" && parts.length === 2) {
    const solution = SOLUTION_REGISTRY[parts[1]];
    if (!solution) return <NotFoundPage pathname={pathname} theme={theme} toggleTheme={toggleTheme} />;
    return <SolutionPage solutionSlug={parts[1]} solution={solution} theme={theme} toggleTheme={toggleTheme} />;
  }

  if (parts[0] !== "apps") return <NotFoundPage pathname={pathname} theme={theme} toggleTheme={toggleTheme} />;

  if (parts.length === 2) {
    const appInfo = APP_REGISTRY[parts[1]];
    if (!appInfo) return <NotFoundPage pathname={pathname} theme={theme} toggleTheme={toggleTheme} />;
    return <AppLandingPage appSlug={parts[1]} appName={appInfo.name} theme={theme} toggleTheme={toggleTheme} />;
  }

  if (parts.length === 3) {
    const [, appSlug, pageSlug] = parts;
    const appInfo = APP_REGISTRY[appSlug];
    if (!appInfo) return <NotFoundPage pathname={pathname} theme={theme} toggleTheme={toggleTheme} />;
    const PageComponent = APP_PAGE_REGISTRY[pageSlug];
    if (!PageComponent) return <NotFoundPage pathname={pathname} theme={theme} toggleTheme={toggleTheme} />;
    return <PageComponent appSlug={appSlug} appName={appInfo.name} theme={theme} toggleTheme={toggleTheme} />;
  }

  return <NotFoundPage pathname={pathname} theme={theme} toggleTheme={toggleTheme} />;
}

export default App;