import React from 'react';
import Image from 'next/image';
import { Email, FacebookSharp, Instagram, LinkedIn, Phone, Twitter } from '@mui/icons-material';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-main p-10 font-battambang text-lg max-sm:text-base">
      <div className="container mx-auto grid grid-cols-3 h-full text-white gap-[60px]">
        <div className="flex flex-col justify-between items-start max-xl:col-span-3 col-span-1">
          <Link href="/" className="max-sm:max-w-[200px]">
            <Image
              src="/assets/logo/logo-white.svg"
              alt="/assets/logo/logo-white.svg"
              width={250}
              height={100}
            />
          </Link>
          <div className="max-xl:hidden">
            <h2 className="text-2xl font-semibold">បណ្តាញសង្គម</h2>
            <div className="flex gap-4 py-4">
              <Link href="/">
                <FacebookSharp className="w-7 h-7" />
              </Link>
              <Link href="/">
                <Instagram className="w-7 h-7" />
              </Link>
              <Link href="/">
                <LinkedIn className="w-7 h-7" />
              </Link>
              <Link href="/">
                <Twitter className="w-7 h-7" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between items-start max-xl:col-span-3 col-span-1">
          <div className="flex flex-col gap-[20px]">
            <h2 className="text-2xl font-semibold">ទំព័រ</h2>
            <ul className="grid grid-cols-2 max-sm:gap-x-[60px] sm:gap-x-[120px] xl:gap-x-[60px] gap-y-[20px]">
              <Link href="/">អំពីសមាគម</Link>
              <Link href="/">អំពីសមាជិកភាព</Link>
              <Link href="/">ព្រឹត្តិការណ៍ និងព័ត៌មាន </Link>
              <Link href="/">ច្បាប់ និងបទបញ្ញត្តិ</Link>
              <Link href="/">សកម្មភាពមនុស្សធម៌</Link>
              <Link href="/">ទំនាក់ទំនង </Link>
              <Link href="/">ពាណិជ្ជកម្ម និងវិនិយោគ </Link>
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-between items-start max-xl:col-span-3 col-span-1">
          <div className="flex flex-col gap-[20px]">
            <h2 className="text-2xl font-semibold">
              ទំនាក់ទំនង និង ទទួលព័ត៌មាន អំពីយើងខ្ញុំតាមរយះ
            </h2>
            <ul className="flex flex-col gap-[20px]">
              <li className="flex items-center gap-[20px]">
                <span>
                  <Phone className="w-7 h-7" />
                </span>
                <span>(+៨៥៥) ២៣ ៨៦០ ៩៩៩</span>
              </li>
              <li className="flex items-center gap-[20px]">
                <span>
                  <Email className="w-7 h-7" />
                </span>
                <span>info@cambodiatrade.expo</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="hidden flex-col justify-between items-start max-xl:col-span-3 col-span-1 max-xl:flex">
          <h2 className="text-2xl font-semibold">បណ្តាញសង្គម</h2>
          <div className="flex gap-4 py-4">
            <Link href="/">
              <FacebookSharp className="w-7 h-7" />
            </Link>
            <Link href="/">
              <Instagram className="w-7 h-7" />
            </Link>
            <Link href="/">
              <LinkedIn className="w-7 h-7" />
            </Link>
            <Link href="/">
              <Twitter className="w-7 h-7" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
