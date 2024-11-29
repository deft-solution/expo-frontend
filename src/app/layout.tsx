'use client';
import './globals.scss';

import React from 'react';

import AuthProvider from '@/context/AuthContext';
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
            <BoothProvider>
              <Header />
              <div className="flex-grow">{children}</div>
            </BoothProvider>
          </AuthProvider>
        </EventProvider>
      </body>
    </html>
  );
}
