import './globals.scss';

import React from 'react';

import AuthProvider from '@/context/AuthContext';
import { BoothProvider } from '@/context/BoothSelectionContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <BoothProvider>{children}</BoothProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
