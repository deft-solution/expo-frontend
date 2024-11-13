import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { MenuRounded } from '@mui/icons-material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Style from './index.module.scss';
import { useEvent } from '@/context/EventContext';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { event, eventId } = useEvent();
  const [toggle, setToggle] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
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
    { href: getUrl('/partner-with-us'), label: 'Partner with Us' },
    { href: getUrl('/event-agenda'), label: 'Event Agenda' },
    { href: getUrl('/news'), label: 'News' },
    { href: getUrl('/about-us'), label: 'About Us' },
  ];

  return (
    <nav
      ref={menuRef}
      className={`flex max-md:p-5 px-10 py-16 justify-between items-center shadow-lg shadow-[#00EEFF40] z-30 relative bg-white ${
        isSticky ? Style.sticky : ''
      }`}
    >
      <div className="flex container mx-auto justify-between items-center gap-[60px] w-full">
        <Link href={getUrl('/')}>
          <Image
            src="/assets/logo/logo.svg"
            alt="/assets/logo/logo.svg"
            className="max-md:max-w-[280px]"
            width={350}
            height={250}
          />
        </Link>
        <ul className="flex items-center justify-between gap-[60px] font-semibold max-2xl:hidden">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`relative text-xl duration-300 ${
                isActive(link.href) ? Style['active-link'] : Style['underline-effect']
              }
              `}
            >
              {link.label}
            </Link>
          ))}
        </ul>

        <div className="flex gap-4 2xl:items-end items-center max-2xl:flex-row flex-col justify-center">
          <div className="flex gap-4 items-center">
            <Image
              src="/assets/icons/search.svg"
              alt="/assets/icons/search.svg"
              width={30}
              height={30}
              onClick={() => setToggleSearch(true)}
            />
            <div onClick={() => setToggle(!toggle)} className="2xl:hidden">
              <MenuRounded className="text-black min-h-10 min-w-10" />
            </div>
          </div>

          {event && (
            <button
              type="button"
              onClick={handleBookNow}
              className="bg-blue-700 uppercase font-semibold text-white py-4 px-8 max-lg:hidden transform active:scale-95 transition-transform duration-150"
            >
              Reserve Booth Now
            </button>
          )}
        </div>
      </div>

      {/*Mobile View*/}

      <div
        className={`${
          toggleSearch ? 'top-0' : 'top-[-100%]'
        } fixed left-0 w-full h-2/3 animation duration-300 bg-black text-white py-24 max-md:px-10 px-28 shadow-lg`}
      >
        <div className=" flex items-center justify-between gap-10 mb-44">
          <Link href={getUrl('/')}>
            <Image
              src="/assets/logo/logo-white.svg"
              alt="/assets/logo/logo-white.svg"
              className=" max-md:max-w-[280px]"
              width={350}
              height={250}
            />
          </Link>
          <Image
            src="/assets/icons/cross.svg"
            alt="/assets/icons/cross.svg"
            className="hover:rotate-180 ease-in-out animation text-white duration-300"
            width={30}
            height={30}
            onClick={() => setToggleSearch(false)}
          />
        </div>
        <div className="pb-8 border-b-gray-700/30 border-b w-full flex items-center justify-between">
          <input
            type="text"
            className="outline-none bg-transparent text-gray-200 text-3xl font-semibold w-full"
            placeholder="Type words and hit enter"
          />
          <Image
            src="/assets/icons/search-white.svg"
            alt="/assets/icons/search-white.svg"
            width={30}
            height={30}
            className=""
            onClick={() => setToggleSearch(true)}
          />
        </div>
      </div>

      <div
        className={`${
          toggle ? 'top-0' : 'top-[-100%]'
        } fixed left-0 w-full h-full animation duration-300 bg-black text-white p-5 shadow-lg`}
      >
        <div className="py-10 px-5 flex items-start justify-between gap-10">
          <div>
            <h2 className="font-bold text-3xl">Cambodia Trade Expo 2024</h2>
            <p>Cambodia Trade Expo 2024</p>
          </div>
          <div onClick={() => setToggle(false)} className="flex items-center gap-2 group ">
            <p className="text-xl text-gray-300">Close</p>
            <Image
              src="/assets/icons/cross.svg"
              alt="/assets/icons/cross.svg"
              className="group-hover:rotate-180 ease-in-out animation text-white duration-300"
              width={30}
              height={30}
            />
          </div>
        </div>
        <ul
          className={`flex flex-col font-bold items-start w-full justify-between duration-150 animation mt-32`}
        >
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={() => setToggle(false)}
              className={`
               hover:text-white text-gray-300
               px-5 py-2 w-full text-3xl `}
            >
              {link.label}
            </Link>
          ))}
        </ul>
        <div className="p-5 ">
          {event && (
            <button
              type="button"
              onClick={handleBookNow}
              className="bg-blue-700 uppercase font-semibold text-white py-4 px-8 transform active:scale-95 transition-transform duration-150"
            >
              Reserve Booth Now
            </button>
          )}
        </div>

        <div className="flex">
          {Array(4)
            .fill(4)
            .map((_, index) => ({
              id: index + 1,
              src: `/assets/icons/social-${index + 1}.svg`,
            }))
            .map((img) => (
              <Image
                className="object-cover mx-4 xl:mx-20"
                key={img.id + 1}
                src={img.src}
                width={30}
                height={30}
                alt={img.src as string}
              />
            ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;
