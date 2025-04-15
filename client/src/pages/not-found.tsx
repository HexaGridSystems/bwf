import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen font-montserrat text-dark bg-light">
      <Navbar />
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-['Playfair_Display'] text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          The page you're looking for doesn't exist or has been moved to another URL.
        </p>
        <Button asChild className="bg-primary hover:bg-opacity-90 text-white px-6 py-8 h-auto rounded-full transition-colors duration-300">
          <Link href="/">
            Go Back Home
          </Link>
        </Button>
      </div>
      <Footer />
    </div>
  );
}