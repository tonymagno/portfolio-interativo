import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Interface para props do texto animado
 */
interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerAmount?: number;
}

/**
 * Componente AnimatedText
 * Anima texto com efeito de aparecimento letra por letra
 * Design: Minimalismo Sofisticado
 */
export function AnimatedText({
  text,
  className = '',
  delay = 0,
  duration = 0.5,
  staggerAmount = 0.05,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dividir texto em caracteres
    const chars = text.split('');
    containerRef.current.innerHTML = chars
      .map((char) => `<span class="inline-block opacity-0">${char}</span>`)
      .join('');

    const spans = containerRef.current.querySelectorAll('span');

    gsap.to(spans, {
      opacity: 1,
      duration,
      stagger: staggerAmount,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [text, delay, duration, staggerAmount]);

  return <div ref={containerRef} className={className} />;
}

