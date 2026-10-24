import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import MotionLayer from './components/MotionLayer'
import { About, Skills, Education, Experience, Projects, Resume, Contact } from './components/Sections'
import { profile } from './data'

export default function App() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <MotionLayer />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects />
    
        <Contact />
      </main>
      <footer>
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <span>Designed with motion, built to stay clear.</span>
      </footer>
      <AnimatePresence>
        {showTop && (
          <motion.button
            className="totop"
            aria-label="Back to top"
            initial={{ opacity: 0, y: 16, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.8 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
