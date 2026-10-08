import { useMemo, useState } from 'react'

const STOP_WORDS = new Set([
  'about','above','after','again','against','also','among','and','any','are','because',
  'been','before','being','below','between','both','but','can','could','does','doing',
  'during','each','few','for','from','further','had','has','have','having','here','how',
  'into','its','itself','just','more','most','other','our','out','over','own','same',
  'should','some','such','than','that','the','their','them','then','there','these','they',
  'this','those','through','under','until','very','was','were','what','when','where','which',
  'while','who','will','with','would','you','your','role','work','working','experience',
  'years','year','required','requirements','responsibilities','skills','ability','strong'
])

function extractKeywords(text) {
  const words = text.toLowerCase().match(/[a-z][a-z+#.-]{1,}/g) || []
  const counts = new Map()
  for (const word of words) {
    const clean = word.replace(/^[.-]+|[.-]+$/g, '')
    if (clean.length < 3 || STOP_WORDS.has(clean) || /^\d+$/.test(clean)) continue
    counts.set(clean, (counts.get(clean) || 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([word]) => word)
}

function analyse(cv, job) {
  const cvText = cv.toLowerCase()
  const keywords = extractKeywords(job).slice(0, 40)
  const matched = keywords.filter((word) => cvText.includes(word))
  const missing = keywords.filter((word) => !cvText.includes(word))
  const score = keywords.length ? Math.round((matched.length / keywords.length) * 100) : 0
  return { score, matched, missing, total: keywords.length }
}

function App() {
  const [cv, setCv] = useState('')
  const [job, setJob] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const canAnalyse = cv.trim().length > 0 && job.trim().length > 0
  const scoreLabel = useMemo(() => {
    if (!result) return ''
    if (result.score >= 70) return 'Strong keyword overlap'
    if (result.score >= 40) return 'Some relevant overlap'
    return 'Low keyword overlap'
  }, [result])

  function handleAnalyse() {
    if (!cv.trim() || !job.trim()) {
      setError('Paste both your CV and the job description first.')
      setResult(null)
      return
    }
    setError('')
    setResult(analyse(cv, job))
  }

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">JOB APPLICATION ASSISTANT / 01</p>
        <h1>Stop guessing.<br />Start matching.</h1>
        <p className="subtitle">
          Compare your CV against a job description. Find matching keywords,
          spot gaps, and make your next edit count.
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
          />
        </div>

        <div className="panel">
          <div className="panel-heading">
            <label htmlFor="job">Job description</label>
            <span>{job.trim() ? job.trim().split(/\s+/).length : 0} words</span>
          </div>
          <textarea
            id="job"
            value={job}
            onChange={(event) => setJob(event.target.value)}
            placeholder="Paste the job description here..."
            rows="18"
          />
        </div>
      </section>

      <div className="action-row">
        <button className="analyse-button" type="button" onClick={handleAnalyse}>
          Analyse Match <span aria-hidden="true">↗</span>
        </button>
        <p className="privacy-note">Your text stays in this browser for now.</p>
      </div>

      {error && <p className="error-message" role="alert">{error}</p>}

      {result && (
        <section className="results" aria-live="polite">
          <div className="results-top">
            <div>
              <p className="eyebrow">YOUR FIRST PASS</p>
              <h2>{scoreLabel}</h2>
              <p className="result-description">
                {result.matched.length} of {result.total} extracted job keywords appear in your CV.
              </p>
            </div>
            <div className="score" aria-label={`Keyword overlap ${result.score} percent`}>
              <strong>{result.score}%</strong>
              <span>overlap</span>
            </div>
          </div>
          <p className="caveat">
            This is a simple keyword comparison, not an AI judgement or a prediction of hiring success.
            It can miss synonyms and context.
          </p>
          <div className="keyword-columns">
            <div className="keyword-group">
              <h3>Found in your CV <span>{result.matched.length}</span></h3>
              {result.matched.length ? (
                <div className="chips">{result.matched.map((word) => <span className="chip found" key={word}>{word}</span>)}</div>
              ) : <p className="empty-state">No keyword matches yet.</p>}
            </div>
            <div className="keyword-group">
              <h3>Potential gaps <span>{result.missing.length}</span></h3>
              {result.missing.length ? (
                <div className="chips">{result.missing.map((word) => <span className="chip missing" key={word}>{word}</span>)}</div>
              ) : <p className="empty-state">No gaps in this keyword pass.</p>}
            </div>
          </div>
        </section>
      )}
      <footer>EARLY BUILD · KEYWORD ANALYSIS ONLY · MORE COMING</footer>
    </main>
  )
}

export default App
