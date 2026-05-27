import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
}
export function AnimatedCounter({
  value,
  duration = 2,
  suffix = ''
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-50px'
  });
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalFrames = Math.round(duration * 60);
      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(end * (1 - Math.pow(1 - progress, 3))); // easeOutCubic
        setCount(currentCount);
        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, 1000 / 60);
      return () => clearInterval(counter);
    }
  }, [isInView, value, duration]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>);

}