import Link from 'next/link';

import Style from './index.module.scss';

const Footer = () => {
  return (
    <footer className="bg-white mt-[40px]">
      <div className="max-md:text-base pt-4 md:mx-auto">
        <div className="container mx-auto xl:max-w-screen-xl max-md:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center lg:grid-cols-4 gap-[15px]">
            <div className="grid gap-4 gap-4">
              <h6 className="font-bold text-lg">Cambodia Trade Expo 2024</h6>
              <p className="text-[#797C7F]">
                The Cambodia Trade Expo (CTE) 2024 is scheduled to take place from December 13th to
                16th, 2024, at the PH Grand Hall Center in Phnom Penh. The theme of the expo is
                “Trade Renaissance.”
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h6 className="font-bold text-lg">Contact Us</h6>

              <div className="flex flex-col h-full justify-between">
                <Link href="mailto:info@cambodiatradeexpo.org">info@cambodiatradeexpo.org</Link>
                <Link className="font-bold text-[#797C7F]" href="tel:+18408412569">
                  +855 (0) 093 563 626
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h6 className="font-bold text-lg">Link</h6>

              <div className="flex flex-col h-full justify-between gap-[14px]">
                <div className={Style['link-item']}>
                  <Link href="https://cambodiaexpo.testing.wonderpass.asia/">Home</Link>
                </div>
                <div className={Style['link-item']}>
                  <Link href="https://cambodiaexpo.testing.wonderpass.asia/about-us-2/">
                    About Us
                  </Link>
                </div>
                <div className={Style['link-item']}>
                  <Link href="https://cambodiaexpo.testing.wonderpass.asia/contact-us/">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h6 className="font-bold text-lg">Get In Touch</h6>

              <div className="flex flex-col h-full justify-between gap-[14px]">
                <div className={Style['link-item']}>
                  <Link href="https://cambodiaexpo.testing.wonderpass.asia/">Facebook</Link>
                </div>
                <div className={Style['link-item']}>
                  <Link href="https://cambodiaexpo.testing.wonderpass.asia/about-us-2/">
                    Twitter
                  </Link>
                </div>
                <div className={Style['link-item']}>
                  <Link href="https://cambodiaexpo.testing.wonderpass.asia/contact-us/">
                    Instagram
                  </Link>
                </div>
                <div className={Style['link-item']}>
                  <Link href="https://www.moc.gov.kh/">Ministry of Commerce</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="text-[#96999F] border-t-2 py-[40px] mt-[40px]">
            <p>Ministry of Commerce © 2024. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
