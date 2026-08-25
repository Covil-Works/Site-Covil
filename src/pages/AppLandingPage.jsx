import "../styles/apps.css";

const APP_LOGOS = {
  splitup: "/img/logo-splitup.png",
  mywl: "/img/logo-mywl.png",
};

function AppLandingPage({ appSlug, appName, theme = "dark" }) {
  const logo = APP_LOGOS[appSlug] || `/img/logo-${appSlug}.png`;

  return (
    <main className="policy-shell" data-theme={theme}>
      <div className="policy-card">
        {logo && (
          <div className="policy-logo-wrap">
            <img src={logo} alt={`Logo ${appName}`} className="policy-logo" />
          </div>
        )}
        <p className="policy-eyebrow">{appSlug}</p>
        <h1>{appName}</h1>
        <p>
          Esta rota está reservada para a página principal do app. A estrutura já está pronta para receber conteúdo.
        </p>
        <a className="policy-link" href={`/apps/${appSlug}/privacypoly`}>
          Ver política de privacidade
        </a>
      </div>
    </main>
  );
}

export default AppLandingPage;
