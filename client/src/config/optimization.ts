/**
 * Configurações de Otimização
 * Performance, acessibilidade e boas práticas
 */

/**
 * Configurações de Lazy Loading
 */
export const LAZY_LOADING_CONFIG = {
  // Threshold para observador de interseção
  threshold: 0.1,
  // Margem para começar a carregar antes de entrar na viewport
  rootMargin: '50px',
  // Habilitar lazy loading de imagens
  enabled: true,
};

/**
 * Configurações de Cache
 */
export const CACHE_CONFIG = {
  // Tempo de cache em segundos
  duration: 3600,
  // Estratégia de cache
  strategy: 'cache-first' as const,
  // Versão do cache
  version: 'v1',
};

/**
 * Configurações de Compressão
 */
export const COMPRESSION_CONFIG = {
  // Habilitar compressão de imagens
  imageCompression: true,
  // Qualidade de imagens (0-100)
  imageQuality: 80,
  // Formatos suportados
  supportedFormats: ['webp', 'jpg', 'png'],
};

/**
 * Configurações de Performance
 */
export const PERFORMANCE_CONFIG = {
  // Habilitar code splitting
  codeSplitting: true,
  // Habilitar tree shaking
  treeShaking: true,
  // Minificar CSS
  minifyCSS: true,
  // Minificar JavaScript
  minifyJS: true,
  // Remover comentários
  removeComments: true,
};

/**
 * Configurações de Acessibilidade
 */
export const ACCESSIBILITY_CONFIG = {
  // Respeitar preferência de movimento reduzido
  respectReducedMotion: true,
  // Suporte a modo escuro
  darkModeSupport: true,
  // Contraste mínimo (WCAG AA = 4.5:1)
  minContrast: 4.5,
  // Tamanho mínimo de fonte (px)
  minFontSize: 14,
  // Altura mínima de linha
  minLineHeight: 1.5,
  // Espaçamento mínimo entre elementos interativos
  minTouchTarget: 44,
};

/**
 * Configurações de Responsividade
 */
export const RESPONSIVE_CONFIG = {
  // Breakpoints
  breakpoints: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  // Densidade de pixels
  pixelDensity: 'auto',
};

/**
 * Configurações de Animação
 */
export const ANIMATION_CONFIG = {
  // Duração padrão de animações (ms)
  defaultDuration: 300,
  // Easing padrão
  defaultEasing: 'cubic-bezier(0.23, 1, 0.32, 1)',
  // Respeitar preferência de movimento reduzido
  respectReducedMotion: true,
  // Desabilitar animações em conexões lentas
  disableOnSlowConnection: true,
};

/**
 * Configurações de Fonte
 */
export const FONT_CONFIG = {
  // Fontes a carregar
  fonts: [
    {
      name: 'Poppins',
      weights: [400, 500, 600, 700, 800],
      display: 'swap',
    },
    {
      name: 'Inter',
      weights: [400, 500, 600, 700],
      display: 'swap',
    },
  ],
  // Fallback fonts
  fallback: 'system-ui, -apple-system, sans-serif',
};

