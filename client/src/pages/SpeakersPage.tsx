import Speakers from '@/components/Speakers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SpeakersPage() {
  return (
    <div className="min-h-screen font-montserrat text-dark bg-light">
      <Navbar />
      <Speakers />
      <Footer />
    </div>
  );
}