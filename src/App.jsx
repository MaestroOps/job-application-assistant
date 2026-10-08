function App() {
  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">JOB APPLICATION ASSISTANT</p>
        <h1>Stop guessing. Start matching.</h1>
        <p className="subtitle">
          Compare your CV against a job description and find out where you
          actually stand.
        </p>
      </section>

      <section className="workspace">
        <div className="panel">
          <label htmlFor="cv">Your CV</label>
          <textarea
            id="cv"
            placeholder="Paste your CV here..."
            rows="18"
          />
        </div>

        <div className="panel">
          <label htmlFor="job">Job description</label>
          <textarea
            id="job"
            placeholder="Paste the job description here..."
            rows="18"
          />
        </div>
      </section>

      <button className="analyse-button" type="button">
        Analyse Match
      </button>
    </main>
  )
}

export default App
