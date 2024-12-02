import Link from 'next/link';

import { getWordPressUrl } from '@/helper';

import Style from './index.module.scss';

const Footer = () => {
  const links = [
    { label: 'Home', href: getWordPressUrl() },
    { label: 'About Us', href: `${getWordPressUrl()}/about-us-2/` },
    { label: 'Contact Us', href: `${getWordPressUrl()}/contact-us/` },
  ];

  const socials = [
    { label: 'Facebook', href: getWordPressUrl() },
    { label: 'Twitter', href: `${getWordPressUrl()}/about-us-2/` },
    { label: 'Instagram', href: `${getWordPressUrl()}/contact-us/` },
    { label: 'Ministry of Commerce', href: 'https://www.moc.gov.kh/' },
  ];

  return (
    <footer className="bg-white mt-[40px]">
      <div className="max-md:text-base pt-4">
        <div className="container mx-auto xl:max-w-screen-xl max-md:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px]">
            {/* Expo Information */}
            <div className="grid gap-4">
              <h6 className="font-bold text-lg">Cambodia Trade Expo 2024</h6>
              <p className="text-[#797C7F]">
                The Cambodia Trade Expo (CTE) 2024 is scheduled to take place from December 13th to
                16th, 2024, at the PH Grand Hall Center in Phnom Penh. The theme of the expo is
                “Trade Renaissance.”
              </p>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col gap-4">
              <h6 className="font-bold text-lg">Contact Us</h6>
              <div className="flex flex-col">
                <Link href="mailto:info@cambodiatradeexpo.org" className="text-[#797C7F]">
                  info@cambodiatradeexpo.org
                </Link>
                <Link href="tel:+855093563626" className="font-bold text-[#797C7F]">
                  +855 (0) 093 563 626
                </Link>
              </div>
            </div>

            {/* Links Section */}
            <div className="flex flex-col gap-4">
              <h6 className="font-bold text-lg">Links</h6>
              <div className="flex flex-col gap-[14px]">
                {links.map((link) => (
                  <div key={link.label} className={Style['link-item']}>
                    <Link href={link.href}>{link.label}</Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-4">
              <h6 className="font-bold text-lg">Get In Touch</h6>
              <div className="flex flex-col gap-[14px]">
                {socials.map((social) => (
                  <div key={social.label} className={Style['link-item']}>
                    <Link href={social.href}>{social.label}</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="text-[#96999F] border-t-2 py-[40px] mt-[40px]">
            <p>Ministry of Commerce © 2024. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
