import KibouHero from '@/components/sections/kibou-hero';
import Services from '@/components/sections/services';
import Blogs from '@/components/sections/blogs';
import Faq from '@/components/sections/faq';
import Footer from '@/components/layout/footer';
import CtaSection from '@/components/sections/cta-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <KibouHero />
      <main className="flex-grow z-10 bg-background">
        <Services />
        <Blogs />
        <Faq />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
