import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { Close, Menu } from '@mui/icons-material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Style from './index.module.scss';
import { getEventForGuest } from '@/service/event';
import { useApi } from '@/core/hooks';
import { IEventList } from '@/schema/Event';

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [idExist, setIdExist] = useState<IEventList | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('event') ?? undefined;

  const { response } = useApi({
    service: getEventForGuest,
    params: id,
    effects: [id],
  });

  useEffect(() => {
    if (response) {
      setIdExist(response);
    }
  }, [response]);
  const isActive = (path: string) => {
    return pathname === path;
  };

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

  const handleBookNow = () => {
    if (id) {
      router.push(`/event/${id}`);
    } else {
      console.error('Event ID is missing');
    }
  };

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/upcoming-packages', label: 'Upcoming Packages' },
  ];

  return (
    <nav
      ref={menuRef}
      className="flex p-10 justify-between items-center border-b border-gray-200 relative"
    >
      <div className="flex container mx-auto justify-between items-center gap-[60px] w-full">
        <Link href="/" className="max-sm:max-w-[200px]">
          <Image src="/assets/logo/logo.svg" alt="/assets/logo/logo.svg" width={250} height={100} />
        </Link>
        <ul className="flex items-center justify-between gap-[60px] font-semibold max-xl:hidden">
          {links.map((link, index) => (
            <Link
              key={index}
              className={
                isActive(link.href)
                  ? Style['active-link']
                  : 'hover:text-main animation duration-300'
              }
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </ul>

        {idExist && (
          <button
            type="button"
            onClick={handleBookNow}
            className="bg-main text-white py-4 px-8 rounded-lg max-xl:hidden"
          >
            Book Now
          </button>
        )}
      </div>

      {/*Mobile View*/}
      <div onClick={() => setToggle(!toggle)} className="xl:hidden">
        {toggle ? <Close className="w-7 h-7 text-main" /> : <Menu className="w-7 h-7 text-main" />}
      </div>
      <div
        className={`${toggle ? 'flex' : 'hidden'} flex-col border-t bg-white shadow-lg text-black absolute items-start gap-[20px] pb-10 top-[100%] w-full left-0`}
      >
        <ul className="flex flex-col font-semibold items-start w-full justify-between">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={() => setToggle(!toggle)}
              className={`${
                isActive(link.href)
                  ? 'text-main '
                  : 'animation duration-300 hover:border-l-black hover:border-l-4'
              } px-10 py-4 w-full `}
            >
              {link.label}
            </Link>
          ))}
        </ul>
        <div className="px-10">
          {idExist && (
            <button
              type="button"
              onClick={handleBookNow}
              className="bg-main text-white py-4 px-8 rounded-lg"
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
