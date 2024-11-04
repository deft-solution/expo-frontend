'use client';
import './globals.scss';

import React from 'react';

import AuthProvider from '@/context/AuthContext';
import { AuthLiveProvider } from '@/context/AuthLiveContext';
import { BoothProvider } from '@/context/BoothSelectionContext';
import { Footer, Header } from '@Core';

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
            <Header />
            <BoothProvider>{children}</BoothProvider>
            <Footer />
          </AuthLiveProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
