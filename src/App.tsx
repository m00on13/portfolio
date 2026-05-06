import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import { SocialLayout } from './components/SocialLayout/SocialLayout'
import { ContactSection } from './components/Contact/ContactSection'

function App() {
  return (
    <>
      <Navbar />
      <SocialLayout />
      <ContactSection />
    </>
  )
}

export default App
