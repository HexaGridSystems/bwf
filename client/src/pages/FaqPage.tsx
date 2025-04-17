import Faq from '@/components/Faq';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FaqPage() {
  return (
    <div className="min-h-screen font-montserrat text-dark bg-light">
      <Navbar />
      <Faq />
      <Footer />
    </div>
  );
}