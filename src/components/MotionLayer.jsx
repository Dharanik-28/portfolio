import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useScroll } from 'framer-motion'

export default function MotionLayer() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const glowX = useSpring(x, { stiffness: 60, damping: 18, mass: 0.6 })
  const glowY = useSpring(y, { stiffness: 60, damping: 18, mass: 0.6 })
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28 })

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden />
      <motion.div className="cursor-glow" style={{ x: glowX, y: glowY }} aria-hidden />
    </>
  )
}
