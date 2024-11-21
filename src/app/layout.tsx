'use client';
import './globals.scss';

import React from 'react';

import AuthProvider from '@/context/AuthContext';
import { AuthLiveProvider } from '@/context/AuthLiveContext';
import { BoothProvider } from '@/context/BoothSelectionContext';
import EventProvider from '@/context/EventContext';
import { Header } from '@Core';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <EventProvider>
          <AuthProvider>
            <AuthLiveProvider>
              <Header />
              <BoothProvider>
                <div className="flex-grow">{children}</div>
              </BoothProvider>
              {/* <Footer /> */}
            </AuthLiveProvider>
          </AuthProvider>
        </EventProvider>
      </body>
    </html>
  );
}
