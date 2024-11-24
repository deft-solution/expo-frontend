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
  const menuRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth >= 1280) {
  //       setToggle(false);
  //     }
  //   };
  //   window.addEventListener('resize', handleResize);
  //   handleResize();
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setToggleSearch(false);
      }
    };

    if (toggleSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [toggleSearch]);

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
      className={`flex max-md:my-[0.8em] my-[24px] xl:px-[53px] justify-between items-center z-30 relative bg-white max-w-full`}
    >
      <div className="flex max-xms:p-[10px] px-[20px] justify-between items-center w-full">
        <Link href={getUrl('/')}>
          <Image
            src="/assets/logo/logo.svg"
            alt="/assets/logo/logo.svg"
            className="max-xsm:max-w-[169.5px] md:max-w-[310px] max-w-[276px] xl:max-w-[256px]"
            width={320}
            height={52}
          />
        </Link>
        <ul className="flex items-center ml-[1.2em] justify-between font-halyard font-semibold max-xl:hidden">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`relative duration-50 mx-[0.7em] ${
                isActive(link.href) ? Style['active-link'] : Style['underline-effect']
              }
              `}
            >
              {link.label}
            </Link>
          ))}
        </ul>

        <div className="flex items-center xl:flex-col xl:items-end 1xl:items-center 1xl:flex-row justify-center gap-x-[1.5em] 1xl:gap-x-[2.8em]">
          <div className="flex items-center gap-x-[1em] max-sm:gap-x-[1em]">
            <Image
              src="/assets/icons/search.svg"
              alt="/assets/icons/search.svg"
              className="max-xsm:max-w-[28px]"
              width={25}
              height={25}
              onClick={() => setToggleSearch(true)}
            />
            <div onClick={() => setToggle(!toggle)} className="xl:hidden">
              <Image
                src="/assets/icons/menu.svg"
                alt="/assets/icons/menu.svg"
                width={40}
                height={40}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleBookNow}
            className="bg-[#4361EE] uppercase tracking-widest min-w-[196px] md:my-[1em] text-[12px] font-medium text-white py-[1.2em]   hover:bg-[#1E3FDB] max-md:hidden animation duration-300"
          >
            Reserve Booth Now
          </button>
        </div>
      </div>

      {/*Mobile View*/}

      <div
        className={`${
          toggleSearch ? 'top-0' : 'top-[-100%]'
        } fixed left-0 animation py-[23px] xl:py-[40px] xl:px-[60px] duration-1000 xl:h-[62%] max-xl:h-[40%] w-full bg-black  text-white`}
      >
        <div className="max-xl:w-[calc(100vw-60px)] max-xsm:w-full mx-auto">
          <div className="grid grid-cols-4 items-center justify-between">
            <Link
              href={getUrl('/')}
              className="max-xsm:w-[169.5px] xsm:w-[256px] xl:w-[310px] max-xsm:ml-[15px]"
            >
              <Image
                src="/assets/logo/logo-white.svg"
                alt="/assets/logo/logo.svg"
                width={320}
                height={52}
              />
            </Link>
            <div className="col-span-2"></div>
            <div className="flex justify-end">
              <Image
                src="/assets/icons/cross.svg"
                alt="/assets/icons/cross.svg"
                className="hover:rotate-180 ease-in-out animation text-white duration-300"
                width={50}
                height={50}
                onClick={() => setToggleSearch(false)}
              />
            </div>
          </div>
          <div className="flex max-xl:max-w-[94%] w-full xl:w-[1280px]  mx-auto justify-between border-b border-b-gray-700/50 absolute inset-x-0 xl:top-[50%] max-xl:top-[60%]">
            <input
              type="text"
              className="w-full bg-transparent font-halyard font-normal mb-[0.7em]  xl:text-[2rem] text-[1.3rem] md:text-[1.6rem]  "
              placeholder="Type words and hit enter"
            />
            <Image
              src="/assets/icons/search-white.svg"
              alt="/assets/icons/search-white.svg"
              width={25}
              height={25}
              onClick={() => setToggleSearch(true)}
            />
          </div>
        </div>
      </div>

      <div
        className={`${
          toggle ? 'top-0' : 'top-[-100%]'
        } fixed left-0 w-full h-full animation duration-1000 bg-black md:flex md:flex-col md:justify-between xl:justify-start text-white md:pb-0 p-[24px] xsm:px-[20px] xsm:py-[30px] font-halyard`}
      >
        <div className="flex xl:max-w-[95%] xl:mt-[24px] animation duration-1000 xl:w-full xl:mx-auto items-center justify-between gap-10 leading-relaxed tracking-tight">
          <div className="xsm:ml-[10px]">
            <Link href="/" className="text-[1.6em] max-xsm:text-[1.2em] ">
              Cambodia Trade Expo 2024
            </Link>
            <p className="text-[13px] font-montserrat leading-[8px] text-gray-300">
              Cambodia Trade Expo 2024
            </p>
          </div>
          <div
            onClick={() => setToggle(false)}
            className="flex items-center gap-2  md:items-start md:pt-[43px] md:top-0 md:right-0 md:w-[400px] md:absolute md:h-screen md:bg-[#1D1F23]"
          >
            <div className="md:absolute md:right-10 group xl:top-[4em] xl:right-[3em] relative flex items-center gap-1">
              <p className="max-xsm:hidden xsm:text-[1em] font-montserrat font-extralight text-[15px] text-gray-400">
                Close
              </p>
              <Image
                src="/assets/icons/cross.svg"
                alt="/assets/icons/cross.svg"
                className="group-hover:rotate-180 ease-in-out animation text-white duration-300"
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>
        <ul
          className={`flex xl:max-w-[80%] animation duration-300 xl:w-full xl:mx-auto flex-col font-halyard max-xsm:text-[1.2em] text-[1.7em] xl:text-[2.2em] items-start w-full justify-between animation mt-[3em] xl:mt-[3em] sm:mt-[2em] xl:gap-3`}
        >
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={() => setToggle(false)}
              className={`
               hover:text-white text-gray-300
                w-full max-xsm:py-1 xsm:py-[2px] xl:py-0`}
            >
              {link.label}
            </Link>
          ))}
        </ul>

        <div className="flex xl:mt-[13em] xl:justify-start border-t xl:mb-[20px] xl:max-w-[80%] xl:w-full xl:mx-auto border-t-gray-400/20 max-xsm:mt-[1.3em] mt-[2.4em] xl:pt-[20px]">
          {Array(4)
            .fill(4)
            .map((_, index) => ({
              id: index + 1,
              src: `/assets/icons/social-${index + 1}.svg`,
            }))
            .map((img) => (
              <Image
                className="object-cover max-xsm:w-[15px] xsm:w-[18px] xl:mr-[1.6em] mr-[1.2em] max-xsm:py-[1em] xsm:py-[1.2em] text-gray-400"
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
