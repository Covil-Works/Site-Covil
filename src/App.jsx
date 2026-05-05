import HomePage from "./pages/HomePage";
import AppLandingPage from "./pages/AppLandingPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import NotFoundPage from "./pages/NotFoundPage";

const APP_REGISTRY = {
  splitup: {
    name: "SplitUp",
  },
};

const APP_PAGE_REGISTRY = {
  privacypoly: PrivacyPolicyPage,
};

function normalizePath(pathname) {
  if (!pathname) {
    return "/";
  }

  const normalized = pathname.replace(/\/+$/, "");
  return normalized === "" ? "/" : normalized;
}

function App() {
  const pathname = normalizePath(window.location.pathname);

  if (pathname === "/") {
    return <HomePage />;
  }

  const parts = pathname.slice(1).split("/").filter(Boolean);

  if (parts[0] !== "apps") {
    return <NotFoundPage pathname={pathname} />;
  }

  if (parts.length === 2) {
    const appSlug = parts[1];
    const appInfo = APP_REGISTRY[appSlug];

    if (!appInfo) {
      return <NotFoundPage pathname={pathname} />;
    }

    return <AppLandingPage appSlug={appSlug} appName={appInfo.name} />;
  }

  if (parts.length === 3) {
    const [, appSlug, pageSlug] = parts;
    const appInfo = APP_REGISTRY[appSlug];

    if (!appInfo) {
      return <NotFoundPage pathname={pathname} />;
    }

    const PageComponent = APP_PAGE_REGISTRY[pageSlug];

    if (!PageComponent) {
      return <NotFoundPage pathname={pathname} />;
    }

    return <PageComponent appSlug={appSlug} appName={appInfo.name} />;
  }

  return <NotFoundPage pathname={pathname} />;
}

export default App;
