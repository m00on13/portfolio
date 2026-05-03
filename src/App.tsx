import './App.css'
import { Navbar }           from './components/Navbar/Navbar'
import { HeroAboutSequence } from './components/HeroAbout/HeroAboutSequence'
import { WorkSection }       from './components/Work/WorkSection'
import { ProjectsSection }   from './components/Projects/ProjectsSection'
import { SkillsSection }     from './components/Skills/SkillsSection'
import { EducationSection }  from './components/Education/EducationSection'
import { ContactSection }    from './components/Contact/ContactSection'
import SplashCursor          from './components/SplashCursor/SplashCursor'

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
      <Navbar />
      <HeroAboutSequence />
      <WorkSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </>
  )
}

export default App
