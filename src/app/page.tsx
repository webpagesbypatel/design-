import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import Process from '@/components/sections/process';
import Testimonials from '@/components/sections/testimonials';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Process />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
