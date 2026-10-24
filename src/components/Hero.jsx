import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Download, Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data'

function useTyping(words) {
  const [i, setI] = useState(0)
  const [n, setN] = useState(0)
  const [del, setDel] = useState(false)
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduce) return
    const w = words[i]
    const t = setTimeout(() => {
      if (!del && n < w.length) setN(n + 1)
      else if (!del) setDel(true)
      else if (n > 0) setN(n - 1)
      else {
        setDel(false)
        setI((i + 1) % words.length)
      }
    }, del ? 36 : n === w.length ? 1600 : 72)
    return () => clearTimeout(t)
  }, [n, del, i, words, reduce])

  return reduce ? words[0] : words[i].slice(0, n)
}

export default function Hero() {
  const typed = useTyping(profile.roles)
  const [imgOk, setImgOk] = useState(true)
  const wrap = useRef(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 50, damping: 20 })
  const sy = useSpring(py, { stiffness: 50, damping: 20 })
  const photoX = useTransform(sx, (v) => v * 18)
  const photoY = useTransform(sy, (v) => v * 18)
  const blobX = useTransform(sx, (v) => v * -40)
  const blobY = useTransform(sy, (v) => v * -28)
  const blob2X = useTransform(sx, (v) => v * 30)
  const blob2Y = useTransform(sy, (v) => v * 24)

  const onMove = (e) => {
    const r = wrap.current?.getBoundingClientRect()
    if (!r) return
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  const up = (d) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { type: 'spring', stiffness: 70, damping: 16, delay: d },
  })

  return (
    <section id="home" className="hero" ref={wrap} onPointerMove={onMove}>
      <motion.div className="blob b1" style={{ x: blobX, y: blobY }} />
      <motion.div className="blob b2" style={{ x: blob2X, y: blob2Y }} />
      <div className="hero-text">
        <motion.p {...up(0.05)} className="live">
          <span className="pulse" /> Open to full-stack & AI/ML roles
        </motion.p>
        <motion.p {...up(0.12)} className="hi">Hello, I’m</motion.p>
        <motion.h1 {...up(0.2)}>{profile.name}</motion.h1>
        <motion.p {...up(0.3)} className="role">
          {typed}<span className="caret" />
        </motion.p>
        <motion.p {...up(0.4)} className="lead">
          {profile.title}. Building responsive web applications and exploring AI chatbots.
        </motion.p>
        <motion.div {...up(0.5)} className="cta">
          <motion.a className="btn primary" href="/resume.pdf" download whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <Download size={18} /> Download Resume
          </motion.a>
          <motion.a className="btn ghost" href="#projects" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            View My Projects
          </motion.a>
        </motion.div>
        <motion.div {...up(0.6)} className="social">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email"><Mail /></a>
        </motion.div>
      </div>
      <motion.div
        className="photo"
        style={{ x: photoX, y: photoY }}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 60, damping: 14, delay: 0.25 }}
      >
        {imgOk ? (
       
<img
  src={`${import.meta.env.BASE_URL}profile.png`}
  alt="Portrait of Kakara Dharani"
  onError={() => setImgOk(false)}
/>

        ) : (
          <span className="initials" aria-hidden>KD</span>
        )}
      </motion.div>
    </section>
  )
}
