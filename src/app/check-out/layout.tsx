'use client';
import React, { useEffect, useState } from 'react';

import AuthenticationForm from '@/components/authentication';
import { useAuthLive } from '@/context/AuthLiveContext';
import { useBoothSelection } from '@/context/BoothSelectionContext';
import CheckoutProvider from '@/context/CheckOutContext';
import { PaymentProvider } from '@/context/PaymentOptionsContext';
import { Modal } from '@/core';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const { currentEventId } = useBoothSelection();

  const { isAuthenticated } = useAuthLive();

  useEffect(() => {
    setShowAuthForm(!isAuthenticated);
  }, [isAuthenticated]);

  if (!currentEventId) {
    return <></>;
  }

  return (
    <PaymentProvider>
      <CheckoutProvider>
        <div>
          <Modal
            contentClassName="max-sm:!max-w-xs md:!max-w-md lg:!max-w-[40%]"
            visible={showAuthForm}
          >
            <AuthenticationForm />
          </Modal>
          <main>{children}</main>
        </div>
      </CheckoutProvider>
    </PaymentProvider>
  );
};

export default Layout;
