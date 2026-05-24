import { useEffect, useState } from 'react';

/**
 * Hook para detectar preferência de movimento reduzido do usuário
 * Útil para respeitar acessibilidade e preferências de usuário
 *
 * @returns true se o usuário prefere movimento reduzido
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Verificar preferência inicial
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Escutar mudanças de preferência
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook para obter configuração de animação baseada em preferência do usuário
 *
 * @param normalDuration - Duração normal em ms
 * @param reducedDuration - Duração reduzida em ms
 * @returns Duração apropriada baseada na preferência
 */
export function useAnimationDuration(
  normalDuration: number = 300,
  reducedDuration: number = 0
): number {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? reducedDuration : normalDuration;
}

