'use client';
import React from 'react';

import { useBoothSelection } from '@/context/BoothSelectionContext';
import CheckoutProvider from '@/context/CheckOutContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { currentEventId } = useBoothSelection();

  if (!currentEventId) {
    return <></>;
  }

  return (
    <CheckoutProvider>
      <div>
        <main>{children}</main>
      </div>
    </CheckoutProvider>
  );
};

export default Layout;
