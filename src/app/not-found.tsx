import { ArrowBack } from '@mui/icons-material';
import Link from 'next/link';
import React from 'react';

const pageNotFound = () => {
  return (
    <div className="relative w-full min-h-screen">
      <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <h2 className="text-3xl font-montserrat font-bold">404</h2>
        <h2 className="text-3xl font-montserrat">
          Sorry, the page you are looking for cannot be found
        </h2>
        <Link href="/">
          <button
            type="button"
            className="bg-main flex gap-4 font-montserrat text-white py-2 my-4 px-8 max-xl:hidden transform active:scale-95 transition-transform duration-150"
          >
            <ArrowBack className="w-7 h-7" />
            <span>Go back to Homepage</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default pageNotFound;
