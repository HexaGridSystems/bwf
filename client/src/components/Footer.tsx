import { Link } from 'wouter';

export default function Footer() {

  return (
    <footer className="bg-[#1E3D59] text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-start gap-10 mb-12 max-w-5xl mx-auto">
          <div className="md:flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-3">
                <span className="font-['Great_Vibes'] text-primary text-2xl">BWF</span>
              </div>
              <div>
                <h4 className="font-['Playfair_Display'] text-white text-xl font-semibold leading-none">Bengaluru</h4>
                <p className="font-['Great_Vibes'] text-[#F0C987] text-lg">Wedding Fraternity</p>
              </div>
            </div>
            <p className="text-white text-sm opacity-80 mb-6 max-w-md">
              Uniting wedding professionals to elevate the industry standards and create exceptional experiences for couples.
            </p>
            <div className="flex space-x-4 mb-4">
              <a href="https://www.instagram.com/bwpa_bangalore/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#F0C987] transition-colors duration-300">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
            </div>
          </div>
          
          <div className="md:flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-['Playfair_Display'] text-white text-xl font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-envelope text-[#F0C987] text-lg mt-1 mr-3"></i>
                <span className="text-white text-sm opacity-80">info@bengaluruweddings.org</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt text-[#F0C987] text-lg mt-1 mr-3"></i>
                <span className="text-white text-sm opacity-80">+91 80 1234 5678</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-[#F0C987] text-lg mt-1 mr-3"></i>
                <span className="text-white text-sm opacity-80">
                  123 Wedding Boulevard<br />
                  Whitefield, Bengaluru 560066
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[#1E3D59]/30 text-center">
          <p className="text-white text-sm opacity-70 mb-4">
            &copy; 2025 Bengaluru Wedding Fraternity. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-2">
            <a href="#" className="text-white text-xs opacity-70 hover:opacity-100 hover:text-[#F0C987] transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-white text-xs opacity-70 hover:opacity-100 hover:text-[#F0C987] transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-white text-xs opacity-70 hover:opacity-100 hover:text-[#F0C987] transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
