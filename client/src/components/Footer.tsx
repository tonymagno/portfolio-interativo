import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Componente Footer
 * Rodapé com links sociais e informações de contato
 * Design: Minimalismo Sofisticado
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: '#',
      color: 'hover:text-foreground',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: '#',
      color: 'hover:text-blue-600',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: '#',
      color: 'hover:text-blue-400',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:contato@example.com',
      color: 'hover:text-accent',
    },
  ];

  const footerLinks = [
    { label: 'Início', href: '#home' },
    { label: 'Projetos', href: '#projects' },
    { label: 'Sobre', href: '#about' },
    { label: 'Contato', href: '#contact' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <footer className="bg-card border-t border-border mt-20 md:mt-32">
      <div className="container py-12 md:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center">
                  <span className="text-white font-display font-bold text-lg">
                    P
                  </span>
                </div>
                <span className="font-display font-bold text-lg">
                  Portfólio
                </span>
              </div>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Desenvolvedor full-stack criando experiências digitais
                inovadoras com design elegante e tecnologia robusta.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="font-display font-semibold">Links Rápidos</h4>
              <nav className="flex flex-col gap-2">
                {footerLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-foreground/70 hover:text-foreground transition-smooth text-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="font-display font-semibold">Contato</h4>
              <div className="space-y-2 text-sm">
                <p className="text-foreground/70">
                  Email:{' '}
                  <a
                    href="mailto:contato@example.com"
                    className="text-accent hover:underline"
                  >
                    contato@example.com
                  </a>
                </p>
                <p className="text-foreground/70">
                  Localização: São Paulo, Brasil
                </p>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="h-px bg-border"
          />

          {/* Bottom Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            {/* Copyright */}
            <p className="text-foreground/60 text-sm">
              © {currentYear} Portfólio Interativo. Todos os direitos
              reservados.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`text-foreground/60 transition-smooth ${link.color}`}
                    aria-label={link.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}

