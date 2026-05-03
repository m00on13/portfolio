import './App.css'
import { HeroAboutSequence } from './components/HeroAbout/HeroAboutSequence'
import { WorkSection } from './components/Work/WorkSection'
import SplashCursor from './components/SplashCursor/SplashCursor'

function App() {
  return (
    <>
      <SplashCursor
        SIM_RESOLUTION={64}
        DYE_RESOLUTION={512}
        DENSITY_DISSIPATION={4.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.1}
        SPLAT_FORCE={1500}
        COLOR_UPDATE_SPEED={7}
      />
      <HeroAboutSequence />
      <WorkSection />
    </>
  )
}

export default App
