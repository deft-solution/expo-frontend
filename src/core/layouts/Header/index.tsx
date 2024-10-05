import Image from 'next/image';
import React from 'react';

import Style from './index.module.scss';

const Header = () => {
  return (
    <nav className="flex p-4 justify-between items-center bg-white border-gray-200 border-b">
      <div className="flex gap-[60px]">
        <Image
          src="/assets/logo/logo.png"
          alt="/assets/logo/logo.png"
          width={60}
          height={60}
        />
        <Image
          src="/assets/logo/logo-export.svg"
          alt="/assets/logo/logo-export.svg"
          width={176}
          height={47}
        />
      </div>
      <div className={Style['close-btn'] + ' bg-gray-100'}></div>
    </nav>
  );
};

export default Header;
