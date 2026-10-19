import "./App.css";

function App() {
  return (
    <div className="shell">
      <header className="shell__header">
        <span className="eyebrow">🍲 AI Recipe Generator</span>
        <h1 className="shell__title">
          What's in <em>your</em> kitchen?
        </h1>
        <p className="shell__subtitle">
          Tell Simmer what you've got. It'll turn it into a real recipe —
          measured, timed, and ready to cook.
        </p>
      </header>

      <main>
        <p>Kitchen workspace loading...</p>
      </main>

      <footer className="shell__footer">simmer · powered by groq</footer>
    </div>
  );
}

export default App;
