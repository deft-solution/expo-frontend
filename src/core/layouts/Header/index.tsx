import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setToggle(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setToggle(false);
      }
    };

    if (toggle) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [toggle]);

  return (
    <nav
      ref={menuRef}
      className="flex p-10 justify-between items-center border-b bg-main border-gray-200 text-white relative"
    >
      <div className="flex container mx-auto justify-between items-center gap-[60px] w-full">
        <Link href="/" className="max-sm:max-w-[200px]">
          <Image
            src="/assets/logo/main-logo.svg"
            alt="/assets/logo/main-logo.svg"
            width={250}
            height={100}
          />
        </Link>
        <ul className="flex items-center justify-between gap-[60px] max-xl:hidden">
          <Link href="/">Home</Link>
          <Link href="/">About</Link>
          <Link href="/">Services</Link>
          <Link href="/">Upcoming Packages</Link>
        </ul>
        <button type="button" className="bg-icon py-4 px-8 rounded-lg max-xl:hidden">
          Book Now
        </button>
      </div>

      {/*Mobile View*/}
      <div onClick={() => setToggle(!toggle)} className="xl:hidden ">
        {toggle ? (
          <Image
            src="/assets/icons/cross.svg"
            alt="/assets/logo/cross.svg"
            width={25}
            height={25}
          />
        ) : (
          <Image src="/assets/icons/menu.svg" alt="/assets/logo/menu.svg" width={25} height={25} />
        )}
      </div>
      <div
        className={`${toggle ? 'flex' : 'hidden'} flex-col bg-white shadow-lg text-black absolute items-start gap-[20px] pb-10 top-[100%] w-full left-0`}
      >
        <ul className="flex flex-col items-start w-full justify-between">
          {[
            { href: '/', label: 'Home' },
            { href: '/', label: 'About' },
            { href: '/', label: 'Services' },
            { href: '/', label: 'Upcoming Packages' },
          ].map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="animation duration-300 hover:border-l-icon hover:border-l-4 px-10 py-4 w-full"
            >
              {link.label}
            </Link>
          ))}
        </ul>
        <div className="px-10">
          <button type="button" className="bg-icon text-white py-4 px-8 rounded-lg">
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
