import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import ProductsSection from '@/components/home/ProductsSection';
import AboutSection from '@/components/home/AboutSection';
import NowSection from '@/components/home/NowSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import SetupSection from '@/components/home/SetupSection';
import TechStackSection from '@/components/home/TechStackSection';
import FooterSection from '@/components/home/FooterSection';

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <div className="accent-line" />
      <StatsSection />
      <div className="accent-line" />
      <ProductsSection />
      <div className="accent-line" />
      <AboutSection />
      <div className="accent-line" />
      <NowSection />
      <div className="accent-line" />
      <TestimonialsSection />
      <div className="accent-line" />
      <SetupSection />
      <div className="accent-line" />
      <TechStackSection />
      <div className="accent-line" />
      <FooterSection />
    </div>
  );
}
