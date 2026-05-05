import "../styles/apps.css";

function AppLandingPage({ appSlug, appName }) {
  return (
    <main className="policy-shell">
      <div className="policy-card">
        <p className="policy-eyebrow">{appSlug}</p>
        <h1>{appName}</h1>
        <p>
          Esta rota esta reservada para a pagina principal do app. A estrutura ja esta pronta para receber conteudo.
        </p>
        <a className="policy-link" href={`/apps/${appSlug}/privacypoly`}>
          Ver politica de privacidade
        </a>
      </div>
    </main>
  );
}

export default AppLandingPage;
