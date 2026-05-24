import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Componente AnimatedDivider
 * Linha animada que conecta seções com efeito de desenho
 * Design: Minimalismo Sofisticado
 */
export default function AnimatedDivider() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const path = svgRef.current.querySelector('path');
    if (!path) return;

    // Obter comprimento da linha
    const pathLength = (path as SVGPathElement).getTotalLength();

    // Animar o desenho da linha ao scroll
    gsap.fromTo(
      path,
      {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      },
      {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
          markers: false,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full h-32 flex items-center justify-center my-8 md:my-16">
      <svg
        ref={svgRef}
        viewBox="0 0 400 120"
        className="w-full h-full max-w-2xl"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Linha principal com curvas */}
        <path
          d="M 50 60 Q 100 20, 150 60 T 250 60 T 350 60"
          stroke="url(#gradientDivider)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Círculos decorativos */}
        <circle cx="50" cy="60" r="4" fill="url(#gradientDivider)" />
        <circle cx="150" cy="60" r="4" fill="url(#gradientDivider)" />
        <circle cx="250" cy="60" r="4" fill="url(#gradientDivider)" />
        <circle cx="350" cy="60" r="4" fill="url(#gradientDivider)" />

        {/* Gradiente */}
        <defs>
          <linearGradient id="gradientDivider" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.65 0.25 270)" />
            <stop offset="50%" stopColor="oklch(0.6 0.22 265)" />
            <stop offset="100%" stopColor="oklch(0.65 0.25 270)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

