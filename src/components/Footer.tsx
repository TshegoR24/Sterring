import React from 'react';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-inmotion-dark py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-6">
          <div className="flex space-x-4">
            <a href="#" className="text-inmotion-gray hover:text-inmotion-accent transition">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-inmotion-gray hover:text-inmotion-accent transition">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-inmotion-gray hover:text-inmotion-accent transition">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-inmotion-gray hover:text-inmotion-accent transition">
              <Youtube size={24} />
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm mb-8">
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="text-inmotion-gray hover:text-inmotion-accent transition">About InMotion</a></li>
              <li><a href="#" className="text-inmotion-gray hover:text-inmotion-accent transition">Careers</a></li>
              <li><a href="#" className="text-inmotion-gray hover:text-inmotion-accent transition">Privacy</a></li>
              <li><a href="#" className="text-inmotion-gray hover:text-inmotion-accent transition">Speed Test</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="text-inmotion-gray hover:text-inmotion-accent transition">Help Center</a></li>
              <li><a href="#" className="text-inmotion-gray hover:text-inmotion-accent transition">Press</a></li>
              <li><a href="#" className="text-inmotion-gray hover:text-inmotion-accent transition">Cookie Preferences</a></li>
              <li><a href="#" className="text-inmotion-gray hover:text-inmotion-accent transition">Legal Notices</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="text-inmotion-gray hover:text-inmotion-accent transition">Account</a></li>
              <li><a href="#" className="text-inmotion-gray hover:text-inmotion-accent transition">Ways to Watch</a></li>
              <li><a href="#" className="text-inmotion-gray hover:text-inmotion-accent transition">Corporate Information</a></li>
              <li><a href="#" className="text-inmotion-gray hover:text-inmotion-accent transition">Only on InMotion</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="text-inmotion-gray hover:text-inmotion-accent transition">Media Center</a></li>
              <li><a href="#" className="text-inmotion-gray hover:text-inmotion-accent transition">Terms of Use</a></li>
              <li><a href="#" className="text-inmotion-gray hover:text-inmotion-accent transition">Contact Us</a></li>
              <li><a href="#" className="text-inmotion-gray hover:text-inmotion-accent transition">Sports Partners</a></li>
            </ul>
          </div>
        </div>
        
        <div className="text-inmotion-gray text-xs">
          <p>&copy; 2024 InMotion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
