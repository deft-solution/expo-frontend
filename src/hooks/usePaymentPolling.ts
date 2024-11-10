'use client';
import { ValidatePassesResponse } from '@/models/Payment';
import { validatePaymentById } from '@/service/payment';
import React, { useEffect, useState } from 'react';

export interface HookProps {
  onSuccess?: () => void;
}

export const usePaymentPolling = (props: HookProps = {}) => {
  const { onSuccess } = props;
  const [polling, setPolling] = useState<boolean>(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [response, setResponse] = useState<ValidatePassesResponse | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!paymentId) {
      return;
    }
    const intervalId = setInterval(async () => {
      try {
        const result = await validatePaymentById(paymentId);
        setResponse(result);

        // Stop polling if the response meets the stop condition
        if (result.data === 1) {
          clearInterval(intervalId);
          setIsSuccess(true);
          setPolling(false); // Stop polling
          if (onSuccess) {
            onSuccess();
          }
        }
      } catch (err) {
        console.error('Error during polling:', err);
        // Optional: You can stp polling on error if needed
        setPolling(false);
      }
    }, 2000); // Poll every 4 seconds

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [paymentId, polling]);

  // Return values and functions to control polling externally
  return {
    isSuccess,
    response,
    polling,
    setPolling,
    setPaymentId,
  };
};
