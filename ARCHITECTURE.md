# Arquitetura Técnica - Portfólio Interativo Tony Magno

## 📋 Visão Geral

Portfólio interativo profissional desenvolvido com **React 19**, **TypeScript** e **Tailwind CSS 4**, apresentando animações avançadas com **GSAP 3**, **Framer Motion** e **ScrollTrigger**, integrado com **Google Gemini 2.0 Flash API** para um chatbot inteligente.

---

## 🏗️ Arquitetura do Projeto

### Stack Tecnológico

#### **Frontend**
- **React 19** - Framework UI moderno com renderização eficiente
- **TypeScript** - Type-safe JavaScript para melhor qualidade de código
- **Vite 7** - Build tool ultrarrápido com HMR (Hot Module Replacement)
- **Tailwind CSS 4** - Utility-first CSS framework com suporte a OKLCH
- **Wouter** - Router leve para SPA (Single Page Application)

#### **Animações & Interações**
- **GSAP 3** - GreenSock Animation Platform para animações complexas
- **ScrollTrigger** - Plugin GSAP para animações sincronizadas ao scroll
- **Framer Motion** - Biblioteca React para animações declarativas
- **Lenis** - Smooth scrolling library para experiência fluida

#### **IA & Chatbot**
- **Google Gemini 2.0 Flash API** - Modelo de IA para respostas inteligentes
- **Context Profissional** - Sistema de contexto para respostas personalizadas

#### **UI Components**
- **shadcn/ui** - Componentes React acessíveis e customizáveis
- **Radix UI** - Primitivos de UI de baixo nível
- **Lucide React** - Ícones SVG modernos
- **Sonner** - Toast notifications elegantes

#### **Build & Deploy**
- **Vite** - Bundler moderno
- **TypeScript** - Compilação estática
- **ESBuild** - Transpilador ultrarrápido

---

## 📁 Estrutura de Diretórios

```
portfolio-interativo/
├── client/
│   ├── public/                 # Arquivos estáticos (favicon, robots.txt)
│   ├── src/
│   │   ├── components/         # Componentes React reutilizáveis
│   │   │   ├── Header.tsx      # Navegação principal
│   │   │   ├── HeroSection.tsx # Seção inicial com foto e CTA
│   │   │   ├── ProjectsSection.tsx # Grid de projetos
│   │   │   ├── AboutSection.tsx    # Sobre e skills
│   │   │   ├── ContactSection.tsx  # Formulário de contato
│   │   │   ├── ChatBot.tsx     # Chatbot com Gemini API
│   │   │   ├── Footer.tsx      # Rodapé
│   │   │   ├── AnimatedDivider.tsx # Linhas animadas
│   │   │   ├── AnimatedCounter.tsx # Contadores
│   │   │   ├── AnimatedText.tsx    # Efeito de digitação
│   │   │   ├── ScrollAnimationWrapper.tsx # Wrapper de scroll
│   │   │   └── ui/             # shadcn/ui components
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useScrollAnimation.ts # Sincronizar GSAP com scroll
│   │   │   ├── useGeminiChat.ts     # Integração Gemini
│   │   │   ├── useLenis.ts     # Smooth scrolling
│   │   │   ├── useSEO.ts       # Meta tags dinâmicas
│   │   │   └── useReducedMotion.ts  # Acessibilidade
│   │   ├── config/             # Configurações
│   │   │   ├── gemini.ts       # Context profissional para IA
│   │   │   ├── seo.ts          # Metadados e SEO
│   │   │   └── optimization.ts # Lazy loading config
│   │   ├── contexts/           # React contexts
│   │   │   └── ThemeContext.tsx # Tema (light/dark)
│   │   ├── pages/              # Páginas da aplicação
│   │   │   ├── Home.tsx        # Página principal
│   │   │   └── NotFound.tsx    # 404
│   │   ├── lib/                # Utilitários
│   │   │   └── utils.ts        # Helpers
│   │   ├── App.tsx             # Componente raiz
│   │   ├── main.tsx            # Entrada React
│   │   └── index.css           # Estilos globais + Tailwind
│   └── index.html              # HTML template
├── server/                      # Placeholder (não usado)
├── shared/                      # Tipos compartilhados
├── package.json                # Dependências
├── vite.config.ts              # Configuração Vite
├── tsconfig.json               # Configuração TypeScript
├── tailwind.config.ts          # Configuração Tailwind
└── ARCHITECTURE.md             # Este arquivo

```

---

## 🔌 APIs & Integrações

### 1. **Google Gemini 2.5 Flash API**

**Endpoint:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`

**Autenticação:** Chave de API via `VITE_GEMINI_API_KEY`

**Uso:**
```typescript
const response = await fetch(
  `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: userMessage }]
      }],
      systemInstruction: { parts: [{ text: PROFESSIONAL_CONTEXT }] }
    })
  }
);
```

**Contexto Profissional:**
- Informações sobre Tony Magno (desenvolvedor full-stack)
- Descrição de projetos
- Experiência profissional
- Skills técnicas
- Informações de contato

### 2. **GitHub API** (Opcional)

Para sincronizar projetos automaticamente:
```
GET https://api.github.com/users/tonymagno/repos
```

---

## 🎨 Design System

### Tipografia
- **Display Font:** Poppins (bold, títulos)
- **Body Font:** Inter (regular, texto)
- **Sizes:** 12px → 64px (escala modular)

### Paleta de Cores (OKLCH)
```css
--primary: oklch(0.623 0.214 259.815)      /* Azul vibrante */
--accent: oklch(0.967 0.001 286.375)       /* Roxo suave */
--background: oklch(1 0 0)                 /* Branco */
--foreground: oklch(0.235 0.015 65)        /* Escuro */
--gradient-accent: linear-gradient(135deg, #3B82F6, #8B5CF6)
```

### Espaçamento
```css
--radius: 0.65rem
--spacing: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
```

---

## ⚡ Otimizações de Performance

### 1. **Code Splitting**
- Componentes lazy-loaded com `React.lazy()`
- Route-based splitting com Wouter
- Dynamic imports para bibliotecas pesadas

### 2. **Image Optimization**
- WebP format com fallback PNG
- Responsive images com srcset
- Lazy loading com `loading="lazy"`
- CDN storage via Manus

### 3. **Bundle Size**
- Tree-shaking automático via Vite
- Minificação com ESBuild
- Gzip compression

### 4. **Runtime Performance**
- Memoização com `useMemo()` e `useCallback()`
- Virtual scrolling para listas longas
- Debouncing em event handlers

---

## 🎬 Sistema de Animações

### GSAP ScrollTrigger
```typescript
gsap.registerPlugin(ScrollTrigger);

gsap.to('.element', {
  scrollTrigger: {
    trigger: '.element',
    start: 'top center',
    end: 'bottom center',
    scrub: 1,
    markers: false
  },
  duration: 1,
  opacity: 1,
  y: 0
});
```

### Framer Motion
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  Conteúdo
</motion.div>
```

### Lenis Smooth Scroll
```typescript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

---

## 🔐 Segurança

### Proteção de Dados
- **HTTPS obrigatório** em produção
- **CORS configurado** para APIs externas
- **XSS Prevention** via React sanitization
- **CSRF Protection** em formulários

### Variáveis de Ambiente
```env
VITE_GEMINI_API_KEY=sk-...
VITE_FRONTEND_FORGE_API_URL=...
VITE_ANALYTICS_ENDPOINT=...
```

---

## 📱 Responsividade

### Breakpoints Tailwind
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Mobile-First Approach
- Base styles para mobile
- Media queries para desktop
- Touch-friendly interactions
- Viewport meta tag configurado

---

## 🧪 Testes & QA

### TypeScript
- Type checking automático
- IntelliSense em IDEs
- Detecção de erros em tempo de desenvolvimento

### Acessibilidade (WCAG AA)
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast ratios
- Focus indicators visíveis

### SEO
- Meta tags dinâmicas
- Open Graph
- Structured data (JSON-LD)
- Sitemap automático

---

## 🚀 Deploy

### Plataforma: Manus WebDev
- **URL:** `https://3000-iehn8qno8bgpclj0c4jm2-863c3319.us2.manus.computer`
- **Build:** `pnpm build`
- **Start:** `pnpm start`
- **Preview:** `pnpm preview`

### Alternativas
- **Netlify:** Deploy automático via GitHub
- **Vercel:** Otimizado para Next.js
- **GitHub Pages:** Hospedagem estática

---

## 📊 Projetos Integrados

### 1. **Lumine Joias 2025**
- **Tech:** HTML5, CSS3, JavaScript
- **URL:** https://tonymagno.github.io/tonymagno-Lumine-Joias-2025/
- **Descrição:** E-commerce de joias com carrinho e WhatsApp

### 2. **YnoHost**
- **Tech:** HTML5, CSS3, JavaScript
- **URL:** https://tonymagno.github.io/YnoHost/
- **Descrição:** Plataforma de hospedagem e criação de sites

### 3. **Orçamento Premium**
- **Tech:** Python, PostgreSQL, Autenticação
- **URL:** https://orcamento-premium-prod.onrender.com
- **Descrição:** SaaS para geração de orçamentos

### 4. **Karine Lashes Designer**
- **Tech:** HTML5, CSS3, Design
- **URL:** https://tonymagno.github.io/Karine-Lashes-Designer-site-oficial-/
- **Descrição:** Website profissional para designer

### 5. **Dark Money Robo Dólar**
- **Tech:** Python, Automação, Análise
- **Descrição:** Sistema de análise de mercado financeiro

### 6. **Portfólio Digital**
- **Tech:** React, GitHub Pages
- **URL:** https://tonymagno.github.io/
- **Descrição:** Portfólio online com projetos

---

## 🛠️ Desenvolvimento Local

### Instalação
```bash
# Clonar repositório
git clone https://github.com/tonymagno/portfolio-interativo.git
cd portfolio-interativo

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com suas chaves
```

### Desenvolvimento
```bash
# Iniciar servidor de desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview do build
pnpm preview

# Type checking
pnpm check

# Formatação de código
pnpm format
```

---

## 📚 Dependências Principais

| Pacote | Versão | Uso |
|--------|--------|-----|
| react | 19.2.1 | Framework UI |
| typescript | 5.6.3 | Type safety |
| vite | 7.1.7 | Build tool |
| tailwindcss | 4.1.14 | Styling |
| gsap | 3.x | Animações |
| framer-motion | 12.23.22 | Motion library |
| @radix-ui/* | Latest | UI primitives |
| lucide-react | 0.453.0 | Icons |
| sonner | 2.0.7 | Toasts |
| wouter | 3.3.5 | Router |
| zod | 4.1.12 | Validation |

---

## 🔄 Fluxo de Dados

```
User Input
    ↓
React Component
    ↓
State Management (useState/useContext)
    ↓
API Call (Gemini/GitHub)
    ↓
Response Processing
    ↓
UI Update with Animation
    ↓
Browser Render
```

---

## 📈 Métricas & Analytics

- **Umami Analytics** integrado
- **Web Vitals** monitorados
- **Performance tracking** automático
- **User interaction** logging

---

## 🎯 Próximos Passos

1. **Configurar Gemini API Key**
   - Obter em https://makersuite.google.com/app/apikey
   - Adicionar em `.env.local`

2. **Customizar Contexto Profissional**
   - Editar `client/src/config/gemini.ts`
   - Adicionar mais informações sobre projetos

3. **Publicar em Domínio Customizado**
   - Configurar DNS
   - SSL automático

4. **Monitorar Performance**
   - Usar Lighthouse
   - Otimizar Core Web Vitals

---

## 📞 Contato & Suporte

- **Email:** Tony_brak@hotmail.com
- **GitHub:** https://github.com/tonymagno
- **LinkedIn:** https://www.linkedin.com/in/tony-magno-07112913b/
- **Localização:** Ilhabela, SP - Brasil

---

**Desenvolvido com ❤️ por Tony Magno**
**Última atualização:** Maio 2026
