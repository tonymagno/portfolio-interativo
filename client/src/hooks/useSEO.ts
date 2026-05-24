import { useEffect } from 'react';

/**
 * Interface para configuração de SEO
 */
export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  canonical?: string;
}

/**
 * Hook para gerenciar meta tags e SEO
 * Atualiza dinamicamente as meta tags da página
 *
 * @param config - Configuração de SEO
 */
export function useSEO(config: SEOConfig) {
  useEffect(() => {
    // Atualizar título
    if (config.title) {
      document.title = config.title;
    }

    // Função auxiliar para atualizar meta tags
    const updateMetaTag = (
      name: string,
      content: string,
      isProperty?: boolean
    ) => {
      let tag = document.querySelector(
        `meta[${isProperty ? 'property' : 'name'}="${name}"]`
      ) as HTMLMetaElement;

      if (!tag) {
        tag = document.createElement('meta');
        if (isProperty) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }

      tag.content = content;
    };

    // Atualizar meta tags
    if (config.description) {
      updateMetaTag('description', config.description);
      updateMetaTag('og:description', config.description, true);
    }

    if (config.keywords) {
      updateMetaTag('keywords', config.keywords);
    }

    if (config.ogImage) {
      updateMetaTag('og:image', config.ogImage, true);
    }

    if (config.ogUrl) {
      updateMetaTag('og:url', config.ogUrl, true);
    }

    if (config.ogType) {
      updateMetaTag('og:type', config.ogType, true);
    }

    if (config.twitterCard) {
      updateMetaTag('twitter:card', config.twitterCard);
    }

    // Atualizar canonical URL
    if (config.canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = config.canonical;
    }
  }, [config]);
}

