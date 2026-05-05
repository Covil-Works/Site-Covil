function AppLandingPage({ appSlug, appName }) {
  return (
    <main className="policy-shell">
      <div className="policy-card">
        <p className="policy-eyebrow">{appSlug}</p>
        <h1>{appName}</h1>
        <p>
          Esta rota está reservada para a página principal do app. A estrutura já está pronta para receber conteúdo.
        </p>
        <a className="policy-link" href={`/${appSlug}/privacypoly`}>
          Ver política de privacidade
        </a>
      </div>
    </main>
  );
}

export default AppLandingPage;
