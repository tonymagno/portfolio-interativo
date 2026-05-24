import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook customizado para sincronizar animações GSAP 3 com scroll
 * Sincroniza elementos ao entrar na viewport com animações fluidas
 *
 * @param options - Configurações de animação
 * @returns Ref para ser anexado ao elemento
 */
export function useScrollAnimation(options?: {
  duration?: number;
  delay?: number;
  stagger?: number;
  from?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const defaults = {
      duration: 0.8,
      delay: 0,
      stagger: 0.1,
      from: {
        opacity: 0,
        y: 40,
        x: 0,
        scale: 0.95,
      },
      ...options,
    };

    // Animar elemento ao entrar na viewport
    gsap.fromTo(
      ref.current,
      {
        opacity: defaults.from.opacity,
        y: defaults.from.y,
        x: defaults.from.x,
        scale: defaults.from.scale,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: defaults.duration,
        delay: defaults.delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [options]);

  return ref;
}

/**
 * Hook para parallax effect com scroll
 * Cria efeito de profundidade ao rolar a página
 *
 * @param speed - Velocidade do parallax (0-1, onde 0 é imóvel e 1 é velocidade normal)
 * @returns Ref para ser anexado ao elemento
 */
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: () => window.innerHeight * speed,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [speed]);

  return ref;
}

/**
 * Hook para sincronizar múltiplos elementos com stagger
 * Anima uma lista de elementos em cascata
 *
 * @param itemCount - Número de itens a animar
 * @param options - Configurações de animação
 * @returns Array de refs para cada item
 */
export function useStaggerAnimation(
  itemCount: number,
  options?: {
    duration?: number;
    staggerDelay?: number;
    from?: {
      opacity?: number;
      y?: number;
    };
  }
) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const defaults = {
      duration: 0.6,
      staggerDelay: 0.1,
      from: {
        opacity: 0,
        y: 30,
      },
      ...options,
    };

    refs.current.forEach((el, index) => {
      if (!el) return;

      gsap.fromTo(
        el,
        {
          opacity: defaults.from.opacity,
          y: defaults.from.y,
        },
        {
          opacity: 1,
          y: 0,
          duration: defaults.duration,
          delay: index * defaults.staggerDelay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [itemCount, options]);

  return refs;
}
