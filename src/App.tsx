import './App.css'
import { Navbar }           from './components/Navbar/Navbar'
import { HeroAboutSequence } from './components/HeroAbout/HeroAboutSequence'
import { WorkSection }       from './components/Work/WorkSection'
import { ProjectsSection }   from './components/Projects/ProjectsSection'
import { SkillsSection }     from './components/Skills/SkillsSection'
import { EducationSection }  from './components/Education/EducationSection'
import { ContactSection }    from './components/Contact/ContactSection'
function App() {
  return (
    <>
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
