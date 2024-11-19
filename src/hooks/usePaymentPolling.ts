'use client';
import { useEffect, useRef, useState } from 'react';

import { ValidatePassesResponse } from '@/models/Payment';
import { orderIsCompleted } from '@/service/order';
import { validatePaymentById } from '@/service/payment';

export interface HookProps {
  onSuccess?: () => void;
}

export const usePaymentPolling = (props: HookProps = {}) => {
  const { onSuccess } = props;
  const [polling, setPolling] = useState<boolean>(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [response, setResponse] = useState<ValidatePassesResponse | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!paymentId || !polling) {
      return;
    }

    intervalIdRef.current = setInterval(async () => {
      try {
        const result = await validatePaymentById(paymentId);
        setResponse(result);

        // Stop polling if the response meets the stop condition
        if (result.data === 1) {
          clearInterval(intervalIdRef.current!);
          intervalIdRef.current = null;
          setIsSuccess(true);
          setPolling(false);
          if (orderId) {
            await orderIsCompleted(orderId);
          }
          if (onSuccess) {
            onSuccess();
          }
        }
      } catch (err) {
        console.error('Error during polling:', err);
        setPolling(false);
        clearInterval(intervalIdRef.current!);
        intervalIdRef.current = null;
      }
    }, 2000); // Poll every 2 seconds

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [paymentId, polling]);

  // Function to cancel polling
  const cancelPolling = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
      setPolling(false);
    }
  };

  const startPolling = () => {
    setPolling(true);
  };

  // Return values and functions to control polling externally
  return {
    isSuccess,
    response,
    polling,
    paymentId,
    startPolling,
    setPaymentId,
    setOrderId,
    cancelPolling, // Add the cancel function to the returned object
  };
};
