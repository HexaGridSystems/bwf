import RsvpForm from '@/components/RsvpForm';
import Venue from '@/components/Venue';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BookPage() {
  return (
    <div className="min-h-screen font-montserrat text-dark bg-light">
      <Navbar />
      <Venue />
      <RsvpForm />
      <Footer />
    </div>
  );
}