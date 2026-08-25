import "../styles/fireflies.css";
import "../styles/not-found.css";

function NotFoundPage({ theme = "dark" }) {
  return (
    <main className="not-found-page" data-theme={theme}>
      <section className="not-found-content" aria-labelledby="not-found-title">
        <div className="not-found-number-wrap" aria-hidden="true">
          <h1 id="not-found-title" className="not-found-number">404</h1>
          <div className="not-found-fireflies hero-fireflies">
            <span className="not-found-firefly hero-firefly hero-firefly--north" />
            <span className="not-found-firefly hero-firefly hero-firefly--middle" />
            <span className="not-found-firefly hero-firefly hero-firefly--south" />
          </div>
        </div>
        <p className="not-found-message">
          Nada para ver por aqui... <a href="/">Volte para o início.</a>
        </p>
      </section>
    </main>
  );
}

export default NotFoundPage;