import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Componente ContactSection
 * Seção de contato com formulário e informações de Tony Magno
 * Design: Minimalismo Sofisticado
 */
export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'Tony_brak@hotmail.com',
      href: 'mailto:Tony_brak@hotmail.com',
    },
    {
      icon: Phone,
      label: 'Telefone',
      value: '+55 (12) 99999-9999',
      href: 'tel:+5512999999999',
    },
    {
      icon: MapPin,
      label: 'Localização',
      value: 'Ilhabela, SP - Brasil',
      href: '#',
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
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-32 space-y-12"
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
            Vamos Conversar?
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Tenho interesse em ouvir sobre novos projetos e oportunidades. Sinta-se à vontade para entrar em contato.
          </p>
        </motion.div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Informações de Contato</h3>
              <p className="text-foreground/70">
                Estou sempre aberto a novas oportunidades e colaborações. Entre em contato através de qualquer um dos canais abaixo.
              </p>
            </div>

            {/* Contact Items */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:border-accent/30 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{info.label}</h4>
                      <p className="text-foreground/70 group-hover:text-foreground transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="space-y-4 pt-4">
              <h4 className="font-semibold">Redes Sociais</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/tonymagno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
                  title="GitHub"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/tony-magno-07112913b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
                  title="LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.736 0-9.646h3.554v1.348c.421-.649 1.175-1.574 2.847-1.574 2.081 0 3.641 1.356 3.641 4.27v5.602zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.955.77-1.715 1.959-1.715 1.188 0 1.914.76 1.938 1.715 0 .953-.75 1.715-1.982 1.715zm1.946 11.597H3.392V9.806h3.891v10.646zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
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
                className="flex flex-col items-center justify-center p-8 rounded-lg bg-accent/10 border border-accent/20"
              >
                <CheckCircle className="w-12 h-12 text-accent mb-4" />
                <h4 className="text-lg font-semibold mb-2">Mensagem Enviada!</h4>
                <p className="text-foreground/70 text-center">
                  Obrigado pelo contato. Responderei em breve.
                </p>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="Seu Nome"
                    required
                    disabled={isSubmitting}
                  />
                  <Input
                    type="email"
                    placeholder="Seu Email"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <Input
                  type="text"
                  placeholder="Assunto"
                  required
                  disabled={isSubmitting}
                />

                <Textarea
                  placeholder="Sua Mensagem"
                  rows={5}
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
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
