import { Link } from 'wouter';

export default function Footer() {

  return (
    <footer className="bg-[#1E3D59] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                <span className="font-['Great_Vibes'] text-primary text-xl">BWF</span>
              </div>
              <div>
                <h4 className="font-['Playfair_Display'] text-white text-lg font-semibold leading-none">Bengaluru</h4>
                <p className="font-['Great_Vibes'] text-[#F0C987] text-sm">Wedding Fraternity</p>
              </div>
            </div>
            <p className="text-white text-sm opacity-80 mb-4">
              Uniting wedding professionals to elevate the industry standards and create exceptional experiences for couples.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/bwpa_bangalore/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#F0C987] transition-colors duration-300">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-['Playfair_Display'] text-white text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-envelope text-[#F0C987] mt-1 mr-3"></i>
                <span className="text-white text-sm opacity-80">info@bengaluruweddings.org</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt text-[#F0C987] mt-1 mr-3"></i>
                <span className="text-white text-sm opacity-80">+91 80 1234 5678</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-[#F0C987] mt-1 mr-3"></i>
                <span className="text-white text-sm opacity-80">
                  123 Wedding Boulevard<br />
                  Whitefield, Bengaluru 560066
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[#1E3D59]/30 text-center">
          <p className="text-white text-sm opacity-70">
            &copy; 2025 Bengaluru Wedding Fraternity. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-white text-xs opacity-70 hover:opacity-100 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-white text-xs opacity-70 hover:opacity-100 transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-white text-xs opacity-70 hover:opacity-100 transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
