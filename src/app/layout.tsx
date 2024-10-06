import './globals.scss';

import React from 'react';

import AuthProvider from '@/context/AuthContext';
import { BoothProvider } from '@/context/BoothSelectionContext';
import { AuthLiveProvider } from '@/context/AuthLiveContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AuthLiveProvider>
            <BoothProvider>{children}</BoothProvider>
          </AuthLiveProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
