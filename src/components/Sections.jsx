import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ExternalLink, Github, Upload, Download, Send, Mail, Phone, MapPin, GraduationCap, Briefcase, Code2 } from 'lucide-react'
import Reveal from './Reveal'
import { profile, skills, education, training, work, projects } from '../data'

function Tilt({ children, className }) {
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 160, damping: 18 })
  const sry = useSpring(ry, { stiffness: 160, damping: 18 })

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * 7)
    rx.set(py * -7)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={() => { rx.set(0); ry.set(0) }}
    >
      {children}
    </motion.div>
  )
}

const Sec = ({ id, kicker, title, children }) => (
  <section id={id} className="sec">
    <Reveal>
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
    </Reveal>
    {children}
  </section>
)

export const About = () => (
  <Sec id="about" kicker="01 — Intro" title="About me">
    <div className="grid2">
      <Reveal className="card">
        <h3>Profile</h3>
        <p>{profile.summary}</p>
      </Reveal>
      <Reveal className="card" delay={0.08}>
        <h3>Career interests</h3>
        <ul>{profile.interests.map((i) => <li key={i}>{i}</li>)}</ul>
        <h3>Also</h3>
        <p>Languages: {profile.languages}<br />{profile.extra}</p>
      </Reveal>
    </div>
  </Sec>
)

export const Skills = () => (
  <Sec id="skills" kicker="02 — Stack" title="Technical skills">
    <div className="grid3">
      {Object.entries(skills).map(([cat, items], i) => (
        <Reveal key={cat} delay={i * 0.05} className="card lift">
          <h3><Code2 size={18} /> {cat}</h3>
          <div className="chips">
            {items.map((s, j) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 + j * 0.03 }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  </Sec>
)

const TL = ({ children }) => <div className="timeline">{children}</div>
const Item = ({ icon, title, org, meta, children, i = 0 }) => (
  <Reveal delay={i * 0.08} className="tl-item card">
    <span className="dot">{icon}</span>
    <h3>{title}</h3>
    <p className="org">{org}</p>
    {meta && <p className="meta">{meta}</p>}
    {children}
  </Reveal>
)

export const Education = () => (
  <Sec id="education" kicker="03 — Path" title="Education & training">
    <TL>
      <Item icon={<GraduationCap size={16} />} title={training.title} org={`Professional training – ${training.org}`}>
        <ul>{training.points.map((p) => <li key={p}>{p}</li>)}</ul>
      </Item>
      {education.map((e, i) => (
        <Item key={e.title} i={i + 1} icon={<GraduationCap size={16} />} title={e.title} org={e.org} meta={`${e.year} · ${e.meta}`} />
      ))}
    </TL>
  </Sec>
)

export const Experience = () => (
  <Sec id="experience" kicker="04 — Work" title="Work experience">
    <TL>
      <Item icon={<Briefcase size={16} />} title={work.title} org={work.org} meta={work.period}>
        <ul>{work.points.map((p) => <li key={p}>{p}</li>)}</ul>
      </Item>
    </TL>
  </Sec>
)

export const Projects = () => (
  <Sec id="projects" kicker="05 — Build" title="Projects">
    <div className="grid3">
      {projects.map((p, i) => (
        <Reveal key={p.name} delay={i * 0.08}>
          <Tilt className="card proj">
            <div className="shot">
              {p.image ? <img src={p.image} alt={`${p.name} screenshot`} /> : <span>{p.name.split(' ')[0]}</span>}
            </div>
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <div className="chips">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>
            <div className="cta sm">
              {p.live
                ? <a className="btn primary" href={p.live} target="_blank" rel="noreferrer"><ExternalLink size={16} /> View Project</a>
                : <span className="btn off" title="No live demo yet">Live demo: add link</span>}
              {p.code
                ? <a className="btn ghost" href={p.code} target="_blank" rel="noreferrer"><Github size={16} /> Source Code</a>
                : <span className="btn off" title="Edit src/data.js">Source: add link</span>}
            </div>
          </Tilt>
        </Reveal>
      ))}
    </div>
  </Sec>
)

export function Resume() {
  const [url, setUrl] = useState('/resume.pdf')
  const [msg, setMsg] = useState(null)
  const canUpload = import.meta.env.DEV
  const onFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    if (f.type !== 'application/pdf') return setMsg({ ok: false, t: 'Only PDF files are accepted.' })
    if (f.size > 5 * 1024 * 1024) return setMsg({ ok: false, t: 'File is larger than 5 MB. Choose a smaller PDF.' })
    setUrl(URL.createObjectURL(f))
    setMsg({ ok: true, t: 'Loaded for local preview only. It is not saved. To publish it, replace public/resume.pdf and redeploy.' })
  }
  return (
    <Sec id="resume" kicker="06 — CV" title="Resume">
      <Reveal className="card">
        <a className="btn primary" href={url} download="Kakara_Dharani_Resume.pdf">
          <Download size={18} /> Download My Resume
        </a>
        <iframe className="pdf" src={url} title="Resume preview" />
        {canUpload && (
          <div className="upload">
            <label className="btn ghost">
              <Upload size={16} /> Replace resume (dev only)
              <input type="file" accept="application/pdf" onChange={onFile} hidden />
            </label>
          </div>
        )}
        {msg && <p role="status" className={msg.ok ? 'ok' : 'err'}>{msg.t}</p>}
      </Reveal>
    </Sec>
  )
}

export function Contact() {
  const [f, setF] = useState({ name: '', email: '', subject: '', message: '' })
  const [msg, setMsg] = useState(null)
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT
  const submit = async (e) => {
    e.preventDefault()
    if (!f.name.trim() || !f.subject.trim() || f.message.trim().length < 10) {
      return setMsg({ ok: false, t: 'Fill in name, subject and a message of at least 10 characters.' })
    }
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setMsg({ ok: false, t: 'Enter a valid email address.' })
    if (!endpoint) return setMsg({ ok: false, t: 'The form is not connected to a service yet, so nothing was sent. Please email me directly.' })
    try {
      const r = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(f),
      })
      if (!r.ok) throw new Error()
      setMsg({ ok: true, t: 'Message sent. Thank you!' })
      setF({ name: '', email: '', subject: '', message: '' })
    } catch {
      setMsg({ ok: false, t: 'Sending failed. Please try again or email me directly.' })
    }
  }
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  return (
    <Sec id="contact" kicker="07 — Hello" title="Contact">
      <div className="grid2">
        <Reveal className="card">
          <h3>Get in touch</h3>
          <p className="row"><Mail size={18} /><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
          <p className="row"><Phone size={18} />{profile.phone}</p>
          <p className="row"><MapPin size={18} />{profile.location}</p>
          <p className="row"><Github size={18} /><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></p>
        </Reveal>
        <Reveal className="card" delay={0.08}>
          <form onSubmit={submit} noValidate>
            <input placeholder="Name" value={f.name} onChange={set('name')} aria-label="Name" />
            <input placeholder="Email" type="email" value={f.email} onChange={set('email')} aria-label="Email" />
            <input placeholder="Subject" value={f.subject} onChange={set('subject')} aria-label="Subject" />
            <textarea rows="5" placeholder="Message" value={f.message} onChange={set('message')} aria-label="Message" />
            <motion.button whileTap={{ scale: 0.96 }} whileHover={{ y: -2 }} className="btn primary" type="submit">
              <Send size={16} /> Send message
            </motion.button>
            {msg && <p role="status" className={msg.ok ? 'ok' : 'err'}>{msg.t}</p>}
          </form>
        </Reveal>
      </div>
    </Sec>
  )
}
