import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-[#1E3D59] text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-10 mb-12 max-w-5xl mx-auto">
          <div className="md:flex-1 flex flex-col items-center md:items-start text-center md:text-left w-full">
            <div className="flex items-center mb-6 justify-center md:justify-start">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mr-3">
                <span className="font-['Great_Vibes'] text-primary text-2xl">BWF</span>
              </div>
              <div>
                <h4 className="font-['Playfair_Display'] text-white text-xl font-semibold leading-none">Wedding</h4>
                <p className="font-['Great_Vibes'] text-[#F0C987] text-lg">Fraternity</p>
              </div>
            </div>
            <p className="text-white text-base opacity-80 mb-6 max-w-md px-4 md:px-0">
              Wedding Fraternity - Uniting wedding professionals to elevate the industry standards and create exceptional experiences for couples.
            </p>

            <h4 className="font-['Playfair_Display'] text-white text-xl font-semibold mb-5 mt-4">Contact Us</h4>
            <ul className="space-y-3 w-full max-w-xs">
              <li className="flex items-start justify-center md:justify-start">
                <i className="fas fa-envelope text-[#F0C987] text-lg mt-0.5 mr-3"></i>
                <span className="text-white text-base opacity-80">info@weddingfraternity.org</span>
              </li>
              <li className="flex items-start justify-center md:justify-start">
                <i className="fas fa-phone-alt text-[#F0C987] text-lg mt-0.5 mr-3"></i>
                <span className="text-white text-base opacity-80">+91 80 1234 5678</span>
              </li>
              <li className="flex items-start justify-center md:justify-start mt-4">
                <i className="fas fa-globe text-[#F0C987] text-lg mt-0.5 mr-3"></i>
                <div className="flex items-center">
                  <span className="text-white text-base opacity-80 mr-3">Follow us:</span>
                  <a href="https://www.instagram.com/bwpa_bangalore/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#F0C987] transition-colors duration-300 bg-[#1E3D59]/40 p-2 rounded-full">
                    <i className="fab fa-instagram text-xl"></i>
                  </a>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="md:flex-1 flex flex-col items-center md:items-start w-full">
            <h4 className="font-['Playfair_Display'] text-white text-xl font-semibold mb-5 text-center md:text-left">Venue Location</h4>
            <div className="w-full h-72 rounded-lg overflow-hidden shadow-lg mb-4">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5225700996044!2d77.58229287475788!3d13.00404875781191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1649ddd0070d%3A0x5d4a59f1f00b41a1!2sPRINCESS%20SHRINE!5e0!3m2!1sen!2sin!4v1713699448682!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="PRINCESS SHRINE Location"
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="text-white text-base opacity-80 text-center md:text-left">
              <p className="font-semibold">PRINCESS SHRINE</p>
              <p>Gate no 9, princess academy palace</p>
              <p>Mekhri circle, Bellary Rd, mekri</p>
              <p>Bengaluru, Karnataka 560083</p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[#1E3D59]/30 text-center">
          <p className="text-white text-base opacity-70 mb-6">
            &copy; 2025 Wedding Fraternity. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
            <a href="#" className="text-white text-sm opacity-70 hover:opacity-100 hover:text-[#F0C987] transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-white text-sm opacity-70 hover:opacity-100 hover:text-[#F0C987] transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-white text-sm opacity-70 hover:opacity-100 hover:text-[#F0C987] transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
