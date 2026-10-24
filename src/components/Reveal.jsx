import { motion } from 'framer-motion'

const spring = { type: 'spring', stiffness: 80, damping: 18 }

export default function Reveal({ children, delay = 0, className, as: Tag = motion.div }) {
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 36, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ ...spring, delay }}
    >
      {children}
    </Tag>
  )
}
