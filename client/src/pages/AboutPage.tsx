import About from '@/components/About';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen font-montserrat text-dark bg-light">
      <Navbar />
      <About />
      <Footer />
    </div>
  );
}