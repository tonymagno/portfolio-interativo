import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Code2, Zap, Users, Trophy } from 'lucide-react';

/**
 * Interface para skill
 */
interface Skill {
  name: string;
  level: number;
  category: string;
}

/**
 * Skills de Tony Magno por categoria
 */
const SKILLS: Skill[] = [
  // Frontend
  { name: 'React', level: 85, category: 'Frontend' },
  { name: 'JavaScript', level: 90, category: 'Frontend' },
  { name: 'HTML5 & CSS3', level: 92, category: 'Frontend' },
  { name: 'Responsivo', level: 95, category: 'Frontend' },
  { name: 'UI/UX', level: 88, category: 'Frontend' },

  // Backend
  { name: 'Python', level: 85, category: 'Backend' },
  { name: 'PostgreSQL', level: 82, category: 'Backend' },
  { name: 'Streamlit', level: 80, category: 'Backend' },
  { name: 'Autenticação', level: 85, category: 'Backend' },
  { name: 'APIs REST', level: 88, category: 'Backend' },

  // Tools
  { name: 'Git & GitHub', level: 90, category: 'Tools' },
  { name: 'Linux & Windows', level: 85, category: 'Tools' },
  { name: 'Suporte Técnico', level: 90, category: 'Tools' },
  { name: 'DNS & TCP/IP', level: 80, category: 'Tools' },
];

/**
 * Componente SkillBar
 */
function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      key={skill.name}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{skill.name}</span>
        <span className="text-xs text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-accent rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.05 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
}

/**
 * Componente AboutSection
 * Seção sobre com skills e experiência
 * Design: Minimalismo Sofisticado
 */
export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: '6+', label: 'Projetos Completos' },
    { value: '3+', label: 'Anos de Experiência' },
    { value: '100%', label: 'Dedicação' },
    { value: '24/7', label: 'Suporte Técnico' },
  ];

  const experiences = [
    {
      title: 'Desenvolvedor Full Stack Júnior',
      company: 'YnoHost TI (Autônomo)',
      period: '2024 - Atual',
      description: 'Desenvolvimento de projetos web, soluções digitais, interfaces responsivas e suporte técnico.',
    },
    {
      title: 'Desenvolvedor SaaS Full Stack',
      company: 'Orçamento Premium',
      period: '2025 - Atual',
      description: 'Plataforma SaaS com autenticação, PostgreSQL, geração de PDFs e painel administrativo.',
    },
    {
      title: 'Especialista em Suporte TI',
      company: 'Experiência Profissional',
      period: '2023 - Atual',
      description: 'Suporte técnico, organização de sistemas, DNS, TCP/IP, DHCP e resolução de problemas.',
    },
  ];

  return (
    <section
      id="about"
      className="py-20 md:py-32 space-y-16"
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
            Sobre Mim
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Desenvolvedor Full Stack Júnior baseado em Ilhabela, SP, com paixão por criar soluções digitais inovadoras.
          </p>
        </motion.div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Quem sou eu?</h3>
              <p className="text-foreground/70 leading-relaxed">
                Sou um desenvolvedor full-stack apaixonado por criar interfaces fluidas, automação inteligente e soluções que combinam design e tecnologia. Com experiência em Python, React, JavaScript e suporte técnico, trabalho em projetos próprios e para clientes.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Meu foco é desenvolver aplicações responsivas, implementar autenticação segura, gerenciar bancos de dados e publicar soluções em produção. Sempre buscando aprender novas tecnologias e resolver problemas de forma criativa.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-lg bg-accent/5 border border-accent/10"
                >
                  <div className="text-2xl font-bold gradient-accent-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Experience */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">Experiência</h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-lg bg-card border border-border hover:border-accent/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{exp.title}</h4>
                      <p className="text-sm text-accent">{exp.company}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/70">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h3 className="text-2xl font-bold">Habilidades Técnicas</h3>

          {/* Skills by Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {['Frontend', 'Backend', 'Tools'].map((category) => (
              <div key={category} className="space-y-4">
                <h4 className="font-semibold text-accent">{category}</h4>
                <div className="space-y-4">
                  {SKILLS.filter((s) => s.category === category).map(
                    (skill, index) => (
                      <SkillBar
                        key={skill.name}
                        skill={skill}
                        index={index}
                      />
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
