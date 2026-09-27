import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 30, stiffness: 200 });
  const springY = useSpring(y, { damping: 30, stiffness: 200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
      if (!visible) setVisible(true);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y, visible]);

  return (
    <motion.div
      className="pointer-events-none fixed z-0 h-[400px] w-[400px] rounded-full bg-aurora-violet/20 blur-[100px]"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.6 } }}
    />
  );
}
