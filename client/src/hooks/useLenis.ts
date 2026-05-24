import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Hook para inicializar Lenis smooth scroll
 * Proporciona scroll suave e fluido em toda a página
 *
 * @param options - Configurações do Lenis
 */
export function useLenis(options?: {
  duration?: number;
  easing?: (t: number) => number;
  direction?: 'vertical' | 'horizontal' | 'both';
  gestureDirection?: 'vertical' | 'horizontal' | 'both';
  smooth?: boolean;
  smoothTouch?: boolean;
  touchMultiplier?: number;
  wheelMultiplier?: number;
  autoRaf?: boolean;
}) {
  useEffect(() => {
    // Inicializar Lenis
    const lenis = new Lenis({
      duration: options?.duration || 1.2,
      easing: options?.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      direction: options?.direction || 'vertical',
      gestureDirection: options?.gestureDirection || 'vertical',
      smooth: options?.smooth !== false,
      smoothTouch: options?.smoothTouch !== false,
      touchMultiplier: options?.touchMultiplier || 2,
      wheelMultiplier: options?.wheelMultiplier || 1,
      autoRaf: options?.autoRaf !== false,
    });

    // Integrar com GSAP ScrollTrigger se disponível
    try {
      const gsap = require('gsap');
      const ScrollTrigger = require('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } catch (e) {
      // GSAP não disponível, usar RAF padrão
      let raf: number;
      const raf_callback = () => {
        lenis.raf(Date.now());
        raf = requestAnimationFrame(raf_callback);
      };
      raf = requestAnimationFrame(raf_callback);

      return () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    }

    return () => {
      lenis.destroy();
    };
  }, [options]);
}

