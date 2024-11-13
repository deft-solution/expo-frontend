import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { Close, Menu } from '@mui/icons-material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Style from './index.module.scss';
import { useEvent } from '@/context/EventContext';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { event, eventId } = useEvent();
  const [toggle, setToggle] = useState(false);
  const [isSticky, setIsSticky] = useState(false); // New state to track sticky
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
    const handleScroll = () => {
      if (window.scrollY > 148) {
        // Adjust this threshold value as needed
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const handleBookNow = () => {
    if (eventId) {
      router.push(`/event/${eventId}`);
    } else {
      console.error('Event ID is missing');
    }
    setToggle(false);
  };

  const getUrl = (url: string) => (event ? `${url}?event=${event.id}` : url);

  const isActive = (path: string) => {
    const currentPath = pathname.split('?')[0];
    const targetPath = path.split('?')[0];

    if (currentPath === targetPath) {
      const currentParams = searchParams;
      const targetParams = new URLSearchParams(path.split('?')[1] || '');
      return currentParams.get('event') === targetParams.get('event');
    }

    return false;
  };

  const links = [
    { href: getUrl('https://cambodiaexpo.testing.wonderpass.asia/'), label: 'Home' },
    { href: getUrl('/about-us'), label: 'About' },
    { href: getUrl('/services'), label: 'Services' },
    { href: getUrl('/upcoming-packages'), label: 'Upcoming Packages' },
  ];

  return (
    <nav
      ref={menuRef}
      className={`flex p-10 justify-between items-center shadow-lg shadow-[#00EEFF40] z-30 relative bg-white
         ${isSticky ? Style.sticky : ''}
        `}
    >
      <div className="flex container mx-auto justify-between items-center gap-[60px] w-full">
        <Link
          href={getUrl('https://cambodiaexpo.testing.wonderpass.asia/')}
          className="max-sm:max-w-[200px]"
        >
          <Image src="/assets/logo/logo.svg" alt="/assets/logo/logo.svg" width={250} height={100} />
        </Link>
      </div>

      {/*Mobile View*/}
      <div onClick={() => setToggle(!toggle)} className="xl:hidden">
        {toggle ? <Close className="w-7 h-7 text-main" /> : <Menu className="w-7 h-7 text-main" />}
      </div>
      <div
        className={`${
          toggle ? 'flex' : 'hidden'
        } flex-col border-t bg-white shadow-lg text-black absolute items-start gap-[20px] pb-10 top-[100%] w-full left-0`}
      >
        <ul className="flex flex-col font-semibold items-start w-full justify-between">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={() => setToggle(false)}
              className={`${
                isActive(link.href)
                  ? 'text-main'
                  : 'animation duration-300 hover:border-l-black hover:border-l-4'
              } px-10 py-4 w-full `}
            >
              {link.label}
            </Link>
          ))}
        </ul>
        <div className="px-10">
          {event && (
            <button
              type="button"
              onClick={handleBookNow}
              className="bg-main text-white py-4 px-8 rounded-lg transform active:scale-95 transition-transform duration-150"
            >
              Book Now
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
