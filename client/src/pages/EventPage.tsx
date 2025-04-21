import EventSchedule from '@/components/EventSchedule';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function EventPage() {
  return (
    <div className="min-h-screen font-montserrat text-dark bg-light">
      <Navbar />
      <div className="py-8"></div> {/* Add some padding at the top */}
      <EventSchedule />
      <Footer />
    </div>
  );
}