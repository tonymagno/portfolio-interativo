import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  MessageCircle,
  Github,
  Linkedin,
  Download,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';

/**
 * Componente ContactSection
 * Seção de contato com foco em conversão, SEO local e canais profissionais.
 * Design: Futurista premium com CTA forte para contratação.
 */
export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const email = 'Tony_brak@hotmail.com';
  const phoneDisplay = '+55 (12) 97813-5300';
  const phoneHref = 'tel:+5512978135300';
  const whatsappHref =
    'https://wa.me/5512978135300?text=Ol%C3%A1%20Tony%2C%20vim%20pelo%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.';
  const githubHref = 'https://github.com/tonymagno';
  const linkedinHref = 'https://www.linkedin.com/in/tony-magno-07112913b/';
  const mapsHref = 'https://www.google.com/maps/search/?api=1&query=Ilhabela,+SP,+Brasil';
  const cvHref = '/Tony-Magno-Curriculo.pdf';

  const contactInfo = [
    {
      icon: Mail,
      label: 'E-mail',
      value: email,
      href: `mailto:${email}`,
      external: false,
    },
    {
      icon: Phone,
      label: 'Telefone',
      value: phoneDisplay,
      href: phoneHref,
      external: false,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: phoneDisplay,
      href: whatsappHref,
      external: true,
    },
    {
      icon: MapPin,
      label: 'Localização',
      value: 'Ilhabela, SP • Caraguatatuba • Litoral Norte SP',
      href: mapsHref,
      external: true,
    },
  ];

  const socialLinks = [
    {
      label: 'GitHub',
      href: githubHref,
      icon: Github,
    },
    {
      label: 'LinkedIn',
      href: linkedinHref,
      icon: Linkedin,
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      toast.success('Mensagem enviada com sucesso! Entrarei em contato em breve.');
      formRef.current?.reset();

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch {
      toast.error('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 space-y-12">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-10"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">
            Portfólio profissional • Litoral Norte SP
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Vamos Conversar?
          </h2>
          <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
            Estou aberto a novas oportunidades, projetos freelance e parcerias.
            Atendo clientes em Ilhabela, Caraguatatuba e em todo o Litoral Norte de SP,
            com foco em desenvolvimento Full Stack, IA e soluções digitais premium.
          </p>
        </motion.div>

        {/* CTA principal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 rounded-3xl border border-cyan-400/15 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">
                Disponível para contratação
              </p>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                Contrate um Desenvolvedor Full Stack com presença no Litoral Norte de SP.
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                Se você precisa de site institucional, portfólio premium, automação, integração com IA,
                ou suporte técnico com visão moderna de produto, este é o ponto de partida ideal.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="rounded-full bg-gradient-accent text-white hover:opacity-90">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  Falar no WhatsApp
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>

              <Button asChild variant="outline" className="rounded-full border-cyan-400/20 bg-transparent">
                <a href={cvHref} download>
                  <Download className="w-4 h-4 mr-2" />
                  Baixar Currículo
                </a>
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informações de contato */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Informações de Contato</h3>
              <p className="text-foreground/70 leading-relaxed">
                Você pode me chamar por e-mail, WhatsApp, LinkedIn ou GitHub.
                Também trabalho com projetos para Caraguatatuba, Ilhabela e todo o Litoral Norte.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    target={info.external ? '_blank' : undefined}
                    rel={info.external ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-card/80 border border-border hover:border-cyan-400/30 transition-smooth group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-cyan-300" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-base">{info.label}</h4>
                      <p className="text-foreground/70 group-hover:text-foreground transition-colors break-words">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            <div className="space-y-4 pt-4">
              <h4 className="font-semibold">Redes Profissionais</h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent/10 hover:bg-accent/20 border border-accent/20 transition-colors"
                      title={link.label}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-cyan-400/15 bg-slate-950/70 p-5">
              <p className="text-sm text-foreground/70 leading-relaxed">
                SEO local: Ilhabela, Caraguatatuba, São Sebastião, Ubatuba e Litoral Norte de SP.
                Ideal para quem busca presença digital premium, site moderno e conversão real.
              </p>
            </div>
          </motion.div>

          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">Enviar Mensagem</h3>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-8 rounded-2xl bg-accent/10 border border-accent/20"
              >
                <CheckCircle className="w-12 h-12 text-accent mb-4" />
                <h4 className="text-lg font-semibold mb-2">Mensagem Enviada!</h4>
                <p className="text-foreground/70 text-center">
                  Obrigado pelo contato. Retornarei o mais rápido possível.
                </p>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    type="text"
                    placeholder="Seu Nome"
                    required
                    disabled={isSubmitting}
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Seu Email"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <Input
                  name="subject"
                  type="text"
                  placeholder="Assunto"
                  required
                  disabled={isSubmitting}
                />

                <Textarea
                  name="message"
                  placeholder="Sua Mensagem"
                  rows={6}
                  required
                  disabled={isSubmitting}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-accent hover:opacity-90 text-white group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button asChild variant="outline" className="flex-1">
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </a>
                  </Button>

                  <Button asChild variant="outline" className="flex-1">
                    <a href={`mailto:${email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      E-mail
                    </a>
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}