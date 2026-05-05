function NotFoundPage({ pathname }) {
  return (
    <main className="policy-shell">
      <div className="policy-card">
        <p className="policy-eyebrow">404</p>
        <h1>Página não encontrada</h1>
        <p>A rota <code>{pathname}</code> não existe neste site.</p>
        <a className="policy-link" href="/">
          Voltar para a home
        </a>
      </div>
    </main>
  );
}

export default NotFoundPage;
