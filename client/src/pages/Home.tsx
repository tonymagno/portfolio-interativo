import { useLenis } from '@/hooks/useLenis';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

export default function Home() {
  useLenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: true,
    wheelMultiplier: 1,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-16 md:pt-20">
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}
