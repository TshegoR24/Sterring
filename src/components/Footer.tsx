
import React from 'react';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-netflix-black py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-6">
          <div className="flex space-x-4">
            <a href="#" className="text-netflix-gray hover:text-white transition">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-netflix-gray hover:text-white transition">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-netflix-gray hover:text-white transition">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-netflix-gray hover:text-white transition">
              <Youtube size={24} />
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm mb-8">
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="text-netflix-gray hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="text-netflix-gray hover:text-white transition">Investor Relations</a></li>
              <li><a href="#" className="text-netflix-gray hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="text-netflix-gray hover:text-white transition">Speed Test</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="text-netflix-gray hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="text-netflix-gray hover:text-white transition">Jobs</a></li>
              <li><a href="#" className="text-netflix-gray hover:text-white transition">Cookie Preferences</a></li>
              <li><a href="#" className="text-netflix-gray hover:text-white transition">Legal Notices</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="text-netflix-gray hover:text-white transition">Account</a></li>
              <li><a href="#" className="text-netflix-gray hover:text-white transition">Ways to Watch</a></li>
              <li><a href="#" className="text-netflix-gray hover:text-white transition">Corporate Information</a></li>
              <li><a href="#" className="text-netflix-gray hover:text-white transition">Only on AfriSport</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="text-netflix-gray hover:text-white transition">Media Center</a></li>
              <li><a href="#" className="text-netflix-gray hover:text-white transition">Terms of Use</a></li>
              <li><a href="#" className="text-netflix-gray hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="text-netflix-gray hover:text-white transition">Creator Hub</a></li>
            </ul>
          </div>
        </div>
        
        <div className="text-netflix-gray text-xs">
          <p>&copy; 2023 AfriSport. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
