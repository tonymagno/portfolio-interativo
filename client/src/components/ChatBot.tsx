import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGeminiChat } from '@/hooks/useGeminiChat';
import { CHAT_MESSAGES } from '@/config/gemini';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

/**
 * Componente ChatBot
 * Chatbot flutuante com integração Google Gemini
 * Design: Futurista premium com animações suaves
 */
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { messages, isLoading, error, sendMessage, clearMessages, hasApiKey } =
    useGeminiChat();

  useEffect(() => {
    const openChat = () => setIsOpen(true);
    const closeChat = () => setIsOpen(false);

    window.addEventListener('open-chatbot', openChat);
    window.addEventListener('close-chatbot', closeChat);

    return () => {
      window.removeEventListener('open-chatbot', openChat);
      window.removeEventListener('close-chatbot', closeChat);
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });

      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 80);

    return () => window.clearTimeout(timer);
  }, [messages, isOpen]);

  useEffect(() => {
    if (!hasApiKey && isOpen) {
      toast.error('Chave de API do Gemini não configurada');
    }
  }, [hasApiKey, isOpen]);

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    if (!hasApiKey) {
      toast.error(
        'Chave de API do Gemini não configurada. Verifique as variáveis de ambiente.'
      );
      return;
    }

    const userInput = input;
    setInput('');
    await sendMessage(userInput);
  };

  const chatVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 18 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.25, ease: 'easeOut' as const },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: 18,
      transition: { duration: 0.18 },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.22 },
    },
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-18 right-0 w-[360px] sm:w-[380px] max-w-[calc(100vw-1rem)] max-h-[calc(100vh-6rem)] overflow-hidden rounded-3xl border border-cyan-400/15 bg-slate-950/95 shadow-[0_30px_100px_rgba(2,6,23,0.55)] backdrop-blur-xl flex flex-col"
          >
            {/* Header */}
            <div
              className="p-4 text-white flex items-center justify-between"
              style={{
                background:
                  'linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(37,99,235,0.92) 45%, rgba(124,58,237,0.95) 100%)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                </div>
                <div className="leading-tight">
                  <h3 className="font-display font-semibold">
                    Ynot AI Assistant
                  </h3>
                  <p className="text-xs text-white/75">
                    Assistente inteligente do portfólio
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/15 rounded-xl transition-smooth"
                aria-label="Fechar chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4"
              style={{
                scrollbarWidth: 'thin',
                scrollBehavior: 'smooth',
              }}
            >
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="min-h-[320px] flex items-center justify-center text-center">
                    <div className="space-y-3 max-w-[92%]">
                      {!hasApiKey ? (
                        <>
                          <AlertCircle className="w-12 h-12 mx-auto text-yellow-500" />
                          <p className="text-sm text-muted-foreground">
                            Chave de API não configurada
                          </p>
                        </>
                      ) : (
                        <>
                          <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground/30" />
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {CHAT_MESSAGES.welcome}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[86%] break-words whitespace-pre-wrap px-4 py-2.5 rounded-2xl shadow-sm ${
                        message.role === 'user'
                          ? 'text-white rounded-br-sm'
                          : 'bg-slate-800/90 text-slate-100 rounded-bl-sm border border-white/5'
                      }`}
                      style={
                        message.role === 'user'
                          ? {
                              background:
                                'linear-gradient(135deg, rgba(37,99,235,0.95) 0%, rgba(124,58,237,0.95) 100%)',
                            }
                          : undefined
                      }
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                      <span className="text-[11px] opacity-70 mt-1.5 block">
                        {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-start"
                  >
                    <div className="bg-slate-800/90 px-4 py-2.5 rounded-2xl rounded-bl-sm flex items-center gap-2 shadow-sm border border-white/5">
                      <Loader2 className="w-4 h-4 animate-spin text-cyan-300" />
                      <span className="text-sm text-slate-300">
                        {CHAT_MESSAGES.loading}
                      </span>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-center"
                  >
                    <div className="bg-destructive/10 text-destructive px-4 py-2.5 rounded-xl text-sm max-w-full text-center">
                      Erro: {error}
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-white/5 p-4 flex gap-2 bg-slate-950/95"
            >
              <Input
                type="text"
                placeholder={
                  hasApiKey ? 'Escreva sua pergunta...' : 'API não configurada'
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading || !hasApiKey}
                className="flex-1 rounded-2xl border-white/10 bg-slate-900/80 text-slate-100 placeholder:text-slate-400 focus-visible:ring-cyan-400/40"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim() || !hasApiKey}
                className="shrink-0 rounded-2xl text-white border border-cyan-400/20"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(37,99,235,0.95) 0%, rgba(124,58,237,0.95) 100%)',
                  boxShadow: '0 0 24px rgba(59,130,246,0.20)',
                }}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>

            {/* Clear Button */}
            {messages.length > 0 && (
              <div className="border-t border-white/5 px-4 py-2.5 flex justify-center bg-slate-950/95">
                <button
                  type="button"
                  onClick={clearMessages}
                  className="text-xs text-slate-400 hover:text-slate-100 transition-smooth"
                >
                  Limpar conversa
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full text-white flex items-center justify-center transition-smooth ring-1 ring-cyan-400/25"
        style={{
          background:
            'linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(37,99,235,0.92) 45%, rgba(124,58,237,0.95) 100%)',
          boxShadow: '0 0 28px rgba(59,130,246,0.28)',
        }}
        aria-label="Abrir chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <MessageCircle className="w-6 h-6" />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}