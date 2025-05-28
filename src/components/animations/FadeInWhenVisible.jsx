import { motion } from "framer-motion";

export default function FadeInWhenVisible({ children, delay = 0, duration = 1, yOffset = 20 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      viewport={{ once: true, amount: 0.01 }}
    >
      {children}
    </motion.div>
  );
}
