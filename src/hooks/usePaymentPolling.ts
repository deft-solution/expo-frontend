'use client';
import { useEffect, useRef, useState } from 'react';

import { IVerifyTransactionSuccess } from '@/models/Payment';
import { verifyPaymentTransaction } from '@/service/payment';

export interface HookProps {
  onSuccess?: () => void;
}

export const usePaymentPolling = (props: HookProps = {}) => {
  const { onSuccess } = props;
  const [polling, setPolling] = useState<boolean>(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  const [response, setResponse] = useState<IVerifyTransactionSuccess | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!paymentId || !polling) return;

    const poll = async () => {
      try {
        const result = await verifyPaymentTransaction(paymentId);

        if (result) {
          // Stop polling on success
          setResponse(result);
          clearInterval(intervalIdRef.current!);
          intervalIdRef.current = null;
          setIsSuccess(true);
          setPolling(false);
          if (onSuccess) {
            onSuccess();
          }
        }
      } catch (err: any) {
        if (err.errorCode === 60005) {
          console.warn('Retryable error occurred, continuing polling...');
          // Continue polling without resetting the interval
          return;
        }

        // Handle non-retryable errors
        console.error('Error during polling:', err);
        clearInterval(intervalIdRef.current!);
        intervalIdRef.current = null;
        setPolling(false);
      }
    };

    intervalIdRef.current = setInterval(poll, 2000);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [paymentId, polling, onSuccess]);

  const startPolling = () => setPolling(true);

  const cancelPolling = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    setPolling(false);
  };

  return {
    isSuccess,
    response,
    polling,
    paymentId,
    startPolling,
    setPaymentId,
    cancelPolling,
  };
};
