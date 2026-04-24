import './App.css'
import mansiIdImg from './assets/mansi-id.png'

function App() {
  return (
    <>
      {/* ── Hero Section ── */}
      <section id="hero">
        <div className="hero-badge-wrapper">
          <img
            src={mansiIdImg}
            alt="Mansi Patel ID Badge"
            className="hero-id"
          />
        </div>
      </section>
    </>
  )
}

export default App
