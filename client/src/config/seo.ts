/**
 * Configuração de SEO e Meta Tags
 * Otimizações para motores de busca e compartilhamento social
 */

export const SEO_CONFIG = {
  title: 'Portfólio Interativo | Desenvolvedor Full-Stack',
  description:
    'Portfólio interativo com animações fluidas, projetos em destaque e chatbot IA. Desenvolvedor full-stack especializado em React, Node.js e TypeScript.',
  keywords:
    'desenvolvedor, full-stack, react, node.js, typescript, portfolio, web development',
  author: 'Seu Nome',
  ogImage: 'https://example.com/og-image.png',
  ogUrl: 'https://portfolio.example.com',
  twitterHandle: '@seu_twitter',
};

/**
 * Estrutura de dados JSON-LD para Schema.org
 * Melhora a compreensão do conteúdo pelos motores de busca
 */
export const SCHEMA_ORG = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Seu Nome',
  url: 'https://portfolio.example.com',
  image: 'https://example.com/profile.jpg',
  jobTitle: 'Full-Stack Developer',
  description:
    'Desenvolvedor full-stack com 5+ anos de experiência em React, Node.js e TypeScript.',
  sameAs: [
    'https://github.com/seu-usuario',
    'https://linkedin.com/in/seu-usuario',
    'https://twitter.com/seu-usuario',
  ],
  contact: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'contato@example.com',
  },
};

/**
 * Configurações de Performance
 */
export const PERFORMANCE_CONFIG = {
  // Lazy loading de imagens
  lazyLoadImages: true,
  // Preload de fontes críticas
  preloadFonts: ['Poppins', 'Inter'],
  // Cache strategy
  cacheStrategy: 'stale-while-revalidate',
};

/**
 * Configurações de Acessibilidade
 */
export const ACCESSIBILITY_CONFIG = {
  // Contraste mínimo WCAG AA
  minContrast: 4.5,
  // Tamanho mínimo de fonte
  minFontSize: 14,
  // Suporte a modo reduzido de movimento
  respectReducedMotion: true,
  // Suporte a modo escuro
  darkModeSupport: true,
};

