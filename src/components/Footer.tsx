import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.89-.23-2.74.24-.65.37-1.13.92-1.42 1.58-.33.74-.35 1.55-.2 2.31.11.64.4 1.25.86 1.7.67.63 1.58.97 2.49.95 1.05-.02 2.05-.53 2.69-1.38.38-.51.58-1.13.62-1.76.02-3.03.01-6.05.01-9.07v-9.67c0-.28.02-.56.02-.84h4.15z"/>
  </svg>
);

const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24ZM11.107 14.5681C10.7412 14.4754 10.4079 14.3168 10.1257 14.1258C9.52936 13.7251 9.15049 13.1365 9.06206 12.4277C8.9419 11.5173 9.29745 10.669 10.0381 10.1171C10.6015 9.69741 11.3256 9.53986 12.062 9.66444C12.8256 9.79468 13.4312 10.2307 13.8402 10.8654C14.0537 11.1969 14.1378 11.5303 14.1378 12.0001V12.1643C14.1378 14.07 12.5082 15.6206 10.5015 15.6206C8.25687 15.6206 6.4312 13.794 6.4312 11.5491C6.4312 8.78918 8.65063 6.54918 11.384 6.54918H11.5947C13.2573 6.48628 14.7397 7.21445 15.7954 8.63678L17.5186 7.42436C16.1479 5.56453 14.1482 4.54918 11.8385 4.54918H11.5833C8.44141 4.54918 5.48332 6.83679 4.4312 10.1585C4.01639 11.4556 4.01639 12.7834 4.4312 14.0805C5.48332 17.4022 8.44141 19.6898 11.5833 19.6898H11.8596C13.6262 19.6898 15.1772 19.0629 16.3268 17.9252C16.892 17.3637 17.3364 16.6579 17.653 15.8236C18.1565 14.4965 18.1565 13.1017 17.653 11.7746V11.238C17.653 7.84654 15.1539 5.34739 11.7624 5.34739C10.7061 5.34739 9.69837 5.61902 8.81431 6.13113L8.06733 4.45657C9.2127 3.82136 10.5098 3.47392 11.8659 3.47392C16.1914 3.47392 19.648 6.93047 19.648 11.256V11.7456C19.648 13.4357 19.3496 15.068 18.783 16.5644C18.3697 17.6567 17.7885 18.5901 17.0425 19.3435C15.6022 20.7981 13.6397 21.6898 11.4533 21.6898H11.107C8.10757 21.6898 5.45447 19.9575 4.19106 17.3592L5.87413 16.5173C6.79153 18.4116 8.74665 19.6898 10.9547 19.6898H11.107C12.8228 19.6898 14.3644 18.9818 15.4851 17.8441C15.9392 17.3826 16.3073 16.8122 16.5772 16.1517V15.7001C16.1558 14.7171 15.4619 13.916 14.5492 13.3364C14.0759 13.0315 13.5186 12.8647 12.9248 12.8647H12.7554C12.4343 12.8647 12.1384 12.8018 11.8841 12.6841L11.107 14.5681Z"/>
  </svg>
);

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: TikTokIcon, href: "#" },
  { icon: ThreadsIcon, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Youtube, href: "#" },
];

const legalLinks = [
  "Terms and Conditions",
  "Privacy Policy",
  "Cookie Preferences",
  "PAIA",
  "Licence Agreement",
  "Website Terms",
  "Privacy Portal",
  "Help",
];

export const Footer = () => {
  return (
    <footer className="bg-sterring-ink border-t border-white/10 pt-16 pb-8">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col space-y-12">
          {/* Logo Section */}
          <div>
            <Link to="/" className="text-2xl md:text-3xl font-extrabold tracking-tight hover:opacity-90 transition-opacity duration-200 inline-block mb-4">
              <span className="text-sterring-orange">Sterring</span>
            </Link>
          </div>

          {/* Links and Socials Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/10 pb-8">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {legalLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white/45 hover:text-white text-sm transition-colors duration-150"
                >
                  {link}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="w-9 h-9 rounded-sm bg-white/8 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-150"
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright Section */}
          <div className="text-white/30 text-[11px] leading-relaxed max-w-4xl font-medium uppercase tracking-wider">
            <p>
              This website (www.sterring.com) is copyright protected by the laws of South Africa and the rest of the African Countries represented on this website and by International Treaties. No part of this website (www.sterring.com) may be saved or stored, reproduced, used or transmitted in any form or by any electronic or mechanical means, including, but not limited to storage thereof by e-mail or any other means, and the use thereof on any other website and/or any other media form, without the written and express permission of Sterring.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};







