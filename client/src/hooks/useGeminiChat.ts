import { useState, useCallback, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_CONFIG, SYSTEM_PROMPT, GENERATION_CONFIG } from '@/config/gemini';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface UseGeminiChatOptions {
  apiKey?: string;
  systemPrompt?: string;
  model?: string;
}

/**
 * Hook customizado para integrar Google Gemini 2.0 Flash API
 * Gerencia conversas com IA sobre projetos e trabalho
 *
 * @param options - Configurações da API Gemini
 * @returns Objeto com estado e funções para gerenciar chat
 */
export function useGeminiChat(options?: UseGeminiChatOptions) {
  const {
    apiKey = GEMINI_CONFIG.apiKey,
    systemPrompt = SYSTEM_PROMPT,
    model = GEMINI_CONFIG.model,
  } = options || {};

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientRef = useRef<GoogleGenerativeAI | null>(null);
  const chatRef = useRef<any>(null);

  // Inicializar cliente Gemini
  const initializeClient = useCallback(() => {
    if (!clientRef.current) {
      clientRef.current = new GoogleGenerativeAI(apiKey);
    }
    return clientRef.current;
  }, [apiKey]);

  // Enviar mensagem para IA
  const sendMessage = useCallback(
    async (userMessage: string) => {
      if (!userMessage.trim()) {
        setError('Mensagem não pode estar vazia');
        return null;
      }

      setError(null);
      setIsLoading(true);

      try {
        const client = initializeClient();

        // Criar chat se não existir
        if (!chatRef.current) {
          const model = client.getGenerativeModel({
            model: model,
            systemInstruction: systemPrompt,
          });

          chatRef.current = model.startChat({
            history: [],
            generationConfig: GENERATION_CONFIG,
          });
        }

        // Adicionar mensagem do usuário ao estado
        const userMsg: Message = {
          id: `user-${Date.now()}`,
          role: 'user',
          content: userMessage,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);

        // Enviar para IA
        const response = await chatRef.current.sendMessage(userMessage);
        const assistantText = response.response.text();

        // Adicionar resposta da IA ao estado
        const assistantMsg: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: assistantText,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
        return assistantMsg;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao conectar com IA';
        setError(errorMessage);
        console.error('Erro no chat:', err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [initializeClient, systemPrompt, model]
  );

  // Limpar histórico de mensagens
  const clearMessages = useCallback(() => {
    setMessages([]);
    chatRef.current = null;
    setError(null);
  }, []);

  // Resetar chat
  const resetChat = useCallback(() => {
    clearMessages();
  }, [clearMessages]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    resetChat,
    hasApiKey: !!apiKey,
  };
}
