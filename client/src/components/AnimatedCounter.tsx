import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Interface para props do contador
 */
interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

/**
 * Componente AnimatedCounter
 * Anima números ao entrar na viewport
 * Útil para estatísticas e métricas
 */
export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const counterObjRef = useRef({ value: from });

  useEffect(() => {
    if (!counterRef.current) return;

    gsap.to(counterObjRef.current, {
      value: to,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: counterRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${prefix}${counterObjRef.current.value.toFixed(decimals)}${suffix}`;
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [to, duration, suffix, prefix, decimals]);

  return <span ref={counterRef}>{`${prefix}${from}${suffix}`}</span>;
}

