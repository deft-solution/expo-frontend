'use client';
import dynamic from 'next/dynamic';
import React, { createContext, useContext, useState } from 'react';

export interface CheckoutContextType {
  submissionStatus: boolean;
  startSubmitting: () => void;
  finishSubmitting: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

// Hook to access the checkout context
export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};

// CheckoutProvider component
const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [submissionStatus, setSubmissionStatus] = useState(false);

  // Start the submitting process
  const startSubmitting = () => {
    setSubmissionStatus(true);
  };

  // Mark the submission process as finished
  const finishSubmitting = () => {
    setSubmissionStatus(false);
  };

  return (
    <CheckoutContext.Provider
      value={{
        submissionStatus,
        startSubmitting,
        finishSubmitting,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

// Dynamically export the provider with client-side rendering enabled
export default dynamic(() => Promise.resolve(CheckoutProvider), { ssr: false });
