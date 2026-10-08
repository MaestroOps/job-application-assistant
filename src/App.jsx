import { useState } from 'react'

function App() {
  const [cv, setCv] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleAnalyse() {
    if (!cv.trim() || !jobDescription.trim()) {
      setError('Paste both your CV and the job description first.')
      setAnalysis(null)
      return
    }

    setError('')
    setAnalysis(null)
    setLoading(true)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cv, jobDescription }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Analysis failed. Please try again.')
      setAnalysis(data.analysis)
    } catch (err) {
      setError(err.message || 'Could not complete the analysis. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">JOB APPLICATION ASSISTANT / 02</p>
        <h1>Stop guessing.<br />Start matching.</h1>
        <p className="subtitle">
          Get an evidence-based comparison of your CV and a job description,
          with practical ways to strengthen your application.
        </p>
      </section>

      <section className="workspace">
        <div className="panel">
          <div className="panel-heading">
            <label htmlFor="cv">Your CV</label>
            <span>{cv.trim() ? cv.trim().split(/\s+/).length : 0} words</span>
          </div>
          <textarea
            id="cv"
            value={cv}
            onChange={(event) => setCv(event.target.value)}
            placeholder="Paste your CV here..."
            rows="18"
            autoComplete="off"
          />
        </div>

        <div className="panel">
          <div className="panel-heading">
            <label htmlFor="job-description">Job description</label>
            <span>{jobDescription.trim() ? jobDescription.trim().split(/\s+/).length : 0} words</span>
          </div>
          <textarea
            id="job-description"
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            placeholder="Paste the full job description here..."
            rows="18"
          />
        </div>
      </section>

      <div className="action-row">
        <button className="analyse-button" type="button" onClick={handleAnalyse} disabled={loading}>
          {loading ? 'Analysing…' : 'Analyse with AI'} <span aria-hidden="true">↗</span>
        </button>
        <p className="privacy-note">No CV database. Text is sent to the AI provider only when you request analysis.</p>
      </div>

      {error && <p className="error-message" role="alert">{error}</p>}

      {analysis && (
        <section className="results" aria-live="polite">
          <div className="results-top">
            <div>
              <p className="eyebrow">AI-ASSISTED ANALYSIS</p>
              <h2>{analysis.overall_assessment}</h2>
              <p className="result-description">
                An evidence-based estimate, not a prediction of hiring success.
              </p>
            </div>
            <div className="score" aria-label={`Estimated match ${analysis.match_score} percent`}>
              <strong>{analysis.match_score}%</strong>
              <span>estimated match</span>
            </div>
          </div>

          <div className="analysis-section">
            <h3>Where your CV aligns <span>{analysis.strengths.length}</span></h3>
            {analysis.strengths.length ? analysis.strengths.map((item, index) => (
              <article className="analysis-item" key={`strength-${index}`}>
                <h4>{item.requirement}</h4>
                <p><strong>CV evidence:</strong> {item.cv_evidence}</p>
                <p>{item.note}</p>
              </article>
            )) : <p className="empty-state">No strong matches were identified in the supplied CV.</p>}
          </div>

          <div className="analysis-section">
            <h3>Missing or weak evidence <span>{analysis.gaps.length}</span></h3>
            {analysis.gaps.length ? analysis.gaps.map((item, index) => (
              <article className="analysis-item gap-item" key={`gap-${index}`}>
                <div className="item-heading">
                  <h4>{item.requirement}</h4>
                  <span className="tag">{item.importance}</span>
                </div>
                <p><strong>{item.status === 'missing' ? 'Not found in CV' : 'Evidence could be stronger'}:</strong> {item.explanation}</p>
              </article>
            )) : <p className="empty-state">No significant gaps were identified.</p>}
          </div>

          <div className="analysis-section">
            <h3>Recommended next steps</h3>
            {analysis.recommendations.length ? (
              <ol className="recommendations">
                {analysis.recommendations.map((item, index) => <li key={index}>{item}</li>)}
              </ol>
            ) : <p className="empty-state">No recommendations returned.</p>}
          </div>
          <p className="caveat">AI can misunderstand or overlook details. Verify every finding and never add skills, qualifications, or achievements you cannot substantiate.</p>
        </section>
      )}

      <footer>PERSONAL TOOL · NO CV DATABASE · AI ANALYSIS</footer>
    </main>
  )
}

export default App
