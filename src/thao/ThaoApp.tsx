import { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import '../thao/thao.css'
import { ThaoNavbar } from './components/Navbar'
import { ThaoHero } from './sections/Hero'
import { ThaoProjects } from './sections/Projects'
import { ThaoSkills } from './sections/Skills'
import { ThaoCertifications } from './sections/Certifications'
import { ThaoContact } from './sections/Contact'

export function ThaoApp() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="thao-theme min-h-screen" style={{ background: 'var(--t-bg)', color: 'var(--t-fg)' }}>
      {/* Scroll progress */}
      <motion.div className="t-scroll-progress" style={{ scaleX, transformOrigin: '0%' }} />

      <ThaoNavbar />

      <main>
        <ThaoHero />
        <ThaoProjects />
        <ThaoSkills />
        <ThaoCertifications />
        <ThaoContact />
      </main>
    </div>
  )
}
