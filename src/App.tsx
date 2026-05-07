import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import { SocialLayout } from './components/SocialLayout/SocialLayout'
import { ContactSection } from './components/Contact/ContactSection'

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <Navbar />
      <SocialLayout onOpenContact={() => setIsContactOpen(true)} />
      {isContactOpen && (
        <ContactSection isModal={true} onClose={() => setIsContactOpen(false)} />
      )}
    </>
  )
}

export default App
