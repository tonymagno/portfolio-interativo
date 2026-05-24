import { ReactNode, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Interface para props do wrapper
 */
interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideUp';
  duration?: number;
  delay?: number;
  parallaxStrength?: number;
}

/**
 * Componente ScrollAnimationWrapper
 * Wrapper que aplica animações ao scroll para qualquer conteúdo
 * Design: Minimalismo Sofisticado
 */
export function ScrollAnimationWrapper({
  children,
  className = '',
  animation = 'fadeInUp',
  duration = 0.8,
  delay = 0,
  parallaxStrength = 0,
}: ScrollAnimationWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const animationConfig = {
      fadeInUp: {
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0 },
      },
      fadeInLeft: {
        from: { opacity: 0, x: -40 },
        to: { opacity: 1, x: 0 },
      },
      fadeInRight: {
        from: { opacity: 0, x: 40 },
        to: { opacity: 1, x: 0 },
      },
      scaleIn: {
        from: { opacity: 0, scale: 0.95 },
        to: { opacity: 1, scale: 1 },
      },
      slideUp: {
        from: { opacity: 0, y: 60 },
        to: { opacity: 1, y: 0 },
      },
    };

    const config = animationConfig[animation];

    gsap.fromTo(
      containerRef.current,
      config.from,
      {
        ...config.to,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
          markers: false,
        },
      }
    );

    // Aplicar parallax se configurado
    if (parallaxStrength > 0) {
      gsap.to(containerRef.current, {
        y: () => window.innerHeight * parallaxStrength,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          markers: false,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [animation, duration, delay, parallaxStrength]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

