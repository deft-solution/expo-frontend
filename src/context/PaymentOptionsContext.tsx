// context/PaymentContext.tsx
import { getPaymentOptionsForCheckOut } from '@/actions/payment';
import { PaymentOptionFormat } from '@/models/Payment';
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

type PaymentContextType = {
  paymentOptions: PaymentOptionFormat[];
  loading: boolean;
  error: string | null;
};

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [paymentOptions, setPaymentOptions] = useState<PaymentOptionFormat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPaymentOptionsForCheckOut()
      .then((options) => {
        setPaymentOptions(options);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load payment options');
        setLoading(false);
      });
  }, []);

  return (
    <PaymentContext.Provider value={{ paymentOptions, loading, error }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePaymentContext must be used within a PaymentProvider');
  }
  return context;
};
