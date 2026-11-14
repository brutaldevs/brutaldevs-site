import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxSection({ children, id }: { children: React.ReactNode, id?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.4]);

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{ y, opacity }}
      className="relative w-full max-w-7xl mx-auto px-6 py-24 border-t border-neutral-800"
    >
      {children}
    </motion.section>
  );
}
