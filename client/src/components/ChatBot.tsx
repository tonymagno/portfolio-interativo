import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGeminiChat, type Message } from '@/hooks/useGeminiChat';
import { CHAT_MESSAGES } from '@/config/gemini';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Componente ChatBot
 * Chatbot flutuante com integração Google Gemini 2.0 Flash
 * Design: Minimalismo Sofisticado com animações suaves
 */
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Usar hook do Gemini Chat
  const { messages, isLoading, error, sendMessage, clearMessages, hasApiKey } =
    useGeminiChat();

  // Auto-scroll para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Avisar se API key não está configurada
  useEffect(() => {
    if (!hasApiKey && isOpen) {
      toast.error('Chave de API do Gemini não configurada');
    }
  }, [hasApiKey, isOpen]);

  // Lidar com envio de mensagem
  const handleSendMessage = async (e: React.FormEvent) => {
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

  // Variantes de animação
  const chatVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-20 right-0 w-96 max-w-[calc(100vw-2rem)] bg-card rounded-lg shadow-2xl border border-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-accent p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <h3 className="font-display font-semibold">Assistente IA</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-smooth"
                aria-label="Fechar chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 h-96 space-y-4">
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center text-center">
                  <div className="space-y-2">
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
                        <p className="text-sm text-muted-foreground">
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
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-accent text-white rounded-br-none'
                        : 'bg-muted text-foreground rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
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
                  <div className="bg-muted px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">
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
                  <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-lg text-sm">
                    Erro: {error}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-border p-4 flex gap-2"
            >
              <Input
                type="text"
                placeholder={
                  hasApiKey ? 'Escreva sua pergunta...' : 'API não configurada'
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading || !hasApiKey}
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim() || !hasApiKey}
                className="bg-gradient-accent hover:opacity-90 text-white"
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
              <div className="border-t border-border px-4 py-2 flex justify-center">
                <button
                  onClick={clearMessages}
                  className="text-xs text-muted-foreground hover:text-foreground transition-smooth"
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
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-accent text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-smooth"
        aria-label="Abrir chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <MessageCircle className="w-6 h-6" />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}

