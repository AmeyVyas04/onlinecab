import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">QuickCab</h3>
            <p className="text-gray-300 mb-4">
              Your reliable ride-hailing service. Book a cab in minutes and travel comfortably to your destination.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/book?type=city" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  City Rides
                </Link>
              </li>
              <li>
                <Link href="/book?type=airport" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Airport Transfers
                </Link>
              </li>
              <li>
                <Link href="/book?type=outstation" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Outstation Trips
                </Link>
              </li>
              <li>
                <Link href="/book?type=rental" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Car Rentals
                </Link>
              </li>
              <li>
                <Link href="/book?type=business" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Business Travel
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-yellow-400 mt-1 mr-3" />
                <span className="text-gray-300">123 Cab Street, City Center, Metro 10001</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-yellow-400 mr-3" />
                <span className="text-gray-300">1-800-QUICK-CAB</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-yellow-400 mr-3" />
                <span className="text-gray-300">support@quickcab.com</span>
              </li>
            </ul>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2 text-white">Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 w-full rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
                />
                <button className="bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-r-lg hover:bg-yellow-300 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} QuickCab. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/safety" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                Safety
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Download App Section */}
      <div className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold text-white mb-2">Download Our App</h4>
              <p className="text-gray-300">Book rides faster with our mobile app</p>
            </div>
            <div className="flex space-x-4">
              <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.924 17.315c-.057.174-.193.332-.348.367-.156.035-.343-.047-.483-.197-.057-.067-.107-.142-.167-.207-.08-.091-.188-.157-.288-.157-.105 0-.208.072-.287.157-.06.065-.11.141-.167.208-.14.149-.327.231-.483.196-.154-.035-.29-.193-.347-.366-.025-.073-.047-.148-.047-.226 0-.194.142-.347.333-.347.191 0 .333.153.333.347 0 .078-.022.153-.047.226zm-2.445-1.303c-.057.174-.193.332-.348.367-.156.035-.343-.047-.483-.197-.057-.067-.107-.142-.167-.207-.08-.091-.188-.157-.288-.157-.105 0-.208.072-.287.157-.06.065-.11.141-.167.208-.14.149-.327.231-.483.196-.154-.035-.29-.193-.347-.366-.025-.073-.047-.148-.047-.226 0-.194.142-.347.333-.347.191 0 .333.153.333.347 0 .078-.022.153-.047.226zm4.021-1.303c-.057.174-.193.332-.348.367-.156.035-.343-.047-.483-.197-.057-.067-.107-.142-.167-.207-.08-.091-.188-.157-.288-.157-.105 0-.208.072-.287.157-.06.065-.11.141-.167.208-.14.149-.327.231-.483.196-.154-.035-.29-.193-.347-.366-.025-.073-.047-.148-.047-.226 0-.194.142-.347.333-.347.191 0 .333.153.333.347 0 .078-.022.153-.047.226z"/>
                  <path d="M18.75 15.083c0 3.583-2.875 5.917-6.75 5.917s-6.75-2.333-6.75-5.917c0-3.583 2.875-5.917 6.75-5.917s-6.75 2.333-6.75 5.917c0 3.583 2.875 5.917 6.75 5.917s6.75-2.333 6.75-5.917z"/>
                </svg>
                App Store
              </button>
              <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.177 2.117c-.234.002-.47.044-.692.127-.697.257-1.208.828-1.44 1.554-.226.715-.117 1.52.297 2.193.414.673 1.08 1.156 1.84 1.156h.034c.192-.003.38-.035.56-.096.697-.257 1.208-.828 1.44-1.554.226-.715.117-1.52-.297-2.193-.414-.673-1.08-1.156-1.84-1.156-.05 0-.1.002-.15.005zm-2.177 6.883v13h16v-13h-16zm14 11h-12v-9h12v9zm-6-6.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5z"/>
                </svg>
                Google Play
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}