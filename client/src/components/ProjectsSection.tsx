import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

/**
 * Interface para dados de projeto
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

/**
 * Dados dos projetos reais de Tony Magno com screenshots
 */
const PROJECTS: Project[] = [
  {
    id: '0',
    title: 'Enterprise Operations Dashboard',
    description:
      'Plataforma corporativa de monitoramento operacional com KPIs executivos, telemetria em tempo real, alertas, gestão de usuários e RBAC com autenticação JWT.',
    image: '/images/enterprise-dashboard.webp',
    tags: ['React', 'TypeScript', 'JWT', 'Dashboard'],
    link: 'https://github.com/tonymagno/Enterprise-Operations-Dashboard',
    github: 'https://github.com/tonymagno/Enterprise-Operations-Dashboard',
  },
  {
    id: '1',
    title: 'Lumine Joias 2025',
    description:
      'E-commerce moderno para joalheria com catálogo de produtos, integração WhatsApp e experiência responsiva.',
    image: '/images/lumine-joias.webp',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'E-commerce'],
    link: 'https://tonymagno.github.io/tonymagno-Lumine-Joias-2025/',
    github: 'https://github.com/tonymagno/tonymagno-Lumine-Joias-2025',
  },
  {
    id: '2',
    title: 'YnoHost',
    description:
      'Landing page profissional para hospedagem, criação de sites e soluções digitais.',
    image: '/images/ynohost.webp',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Landing Page'],
    link: 'https://tonymagno.github.io/YnotHost/',
    github: 'https://github.com/tonymagno/YnotHost',
  },
  {
    id: '3',
    title: 'Orçamento Premium SaaS',
    description:
      'Sistema SaaS para gestão de clientes, propostas, orçamentos e processos empresariais.',
    image: '/images/orcamento-premium.webp',
    tags: ['React', 'Node.js', 'PostgreSQL', 'SaaS'],
    link: 'https://orcamento-premium-prod.onrender.com',
    github: 'https://github.com/tonymagno/Or-amento-App',
  },
  {
    id: '4',
    title: 'Karine Lashes Designer',
    description:
      'Website profissional para extensão de cílios, design de sobrancelhas e presença digital premium.',
    image: '/images/karine-lashes.webp',
    tags: ['HTML5', 'CSS3', 'UX/UI', 'Responsivo'],
    link: 'https://tonymagno.github.io/Karine-Lashes-Designer-site-oficial-/',
    github: 'https://github.com/tonymagno/Karine-Lashes-Designer-site-oficial-',
  },
  {
    id: '5',
    title: 'Dark Money Robô Dólar',
    description:
      'Projeto de automação financeira com análise técnica e estratégias para mercado futuro.',
    image: '/images/dark-money.webp',
    tags: ['Python', 'Automação', 'Trading', 'B3'],
    link: '#',
    github: '#',
  },
  {
    id: '6',
    title: 'Portfólio Digital',
    description:
      'Portfólio interativo desenvolvido em React, TypeScript e Vite com animações avançadas.',
    image: '/images/portfolio.webp',
    tags: ['React', 'TypeScript', 'Vite', 'Portfolio'],
    link: 'https://portfolio-interativo-taupe.vercel.app',
    github: 'https://github.com/tonymagno/portfolio-interativo',
  },
];
/**
 * Componente ProjectCard
 * Card individual de projeto com animações
 */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
      className="group"
    >
      <div className="bg-card rounded-lg overflow-hidden border border-border hover-lift">
        {/* Image Container */}
        <div className="relative h-48 md:h-56 overflow-hidden bg-muted">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="font-display text-xl font-semibold mb-2">
              {project.title}
            </h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full border border-accent/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-2 pt-2">
            {project.link && project.link !== '#' && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 group/btn"
                asChild
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-1 group-hover/btn:translate-x-1 transition-transform" />
                  Ver
                </a>
              </Button>
            )}
            {project.github && project.github !== '#' && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 group/btn"
                asChild
              >
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-1 group-hover/btn:translate-x-1 transition-transform" />
                  Código
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Componente ProjectsSection
 * Seção de projetos com grid responsivo e animações em cascata
 * Design: Minimalismo Sofisticado
 */
export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="projects"
      className="py-20 md:py-32 space-y-12"
      ref={containerRef}
    >
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Projetos em Destaque
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Seleção dos meus trabalhos mais recentes, demonstrando expertise em desenvolvimento full-stack, design responsivo e soluções em produção.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center pt-12"
        >
          <Button
            size="lg"
            className="bg-gradient-accent hover:opacity-90 text-white"
            asChild
          >
            <a href="https://github.com/tonymagno" target="_blank" rel="noopener noreferrer">
              Ver Todos os Projetos no GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
