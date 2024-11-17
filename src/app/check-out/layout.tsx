'use client';
import AuthenticationForm from '@/components/authentication';
import { useAuthLive } from '@/context/AuthLiveContext';
import { useBoothSelection } from '@/context/BoothSelectionContext';
import { PaymentProvider } from '@/context/PaymentOptionsContext';
import { Button, Modal } from '@/core';
import React, { useEffect, useState } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const { eventId } = useBoothSelection();

  const { isAuthenticated } = useAuthLive();

  useEffect(() => {
    setShowAuthForm(!isAuthenticated);
  }, [isAuthenticated]);

  if (!eventId) {
    return <></>;
  }

  return (
    <PaymentProvider>
      <div>
        <Modal
          contentClassName="max-sm:!max-w-xs md:!max-w-md lg:!max-w-[40%]"
          visible={showAuthForm}
        >
          <AuthenticationForm />
        </Modal>
        <main>{children}</main>
      </div>
    </PaymentProvider>
  );
};

export default Layout;
