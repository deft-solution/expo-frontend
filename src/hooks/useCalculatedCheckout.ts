import { useCallback, useEffect, useState } from 'react';

import { TypeCurrency } from '@/constants/Currency';
import { useBoothSelection } from '@/context/BoothSelectionContext';
import { IOrderCalculatedResponse } from '@/models/Order';
import { OrderItem } from '@/models/Payment';
import { calculatedTotalAmount } from '@/service/order';

export const useCalculatedCheckout = () => {
  const { selectedBoothIds, currentEventId } = useBoothSelection();

  const [items, setItems] = useState<OrderItem[]>([]);
  const [currency, setCurrency] = useState<TypeCurrency>('KHR');
  const [response, setResponse] = useState<IOrderCalculatedResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Prepare order items when booth selection (ids) changes
  useEffect(() => {
    if (selectedBoothIds.length) {
      const orderItems = selectedBoothIds.map((id): OrderItem => ({ boothId: id, quantity: 1 }));
      setItems(orderItems);
    }
  }, [selectedBoothIds.length]);

  // Perform calculation when items or payment data changes and the user is authenticated
  useEffect(() => {
    if (items.length && currentEventId) {
      onCalculated();
    }
  }, [items, currency]);

  // Function to handle the checkout calculation
  const onCalculated = useCallback(() => {
    // Prevent multiple concurrent requests
    if (isLoading || !currentEventId) {
      return;
    }
    setIsLoading(true);
    setError(null); // Clear previous errors

    calculatedTotalAmount({ currency, event: currentEventId, booths: items })
      .then((res) => {
        setResponse(res);
      })
      .catch((err) => {
        console.error(err);
        if (err?.message) {
          const message = err?.message || 'An error occurred';
          setError(message);
          alert(message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [items, isLoading, currency]);

  // Optionally, handle cleanup in case the component is unmounted
  useEffect(() => {
    return () => {
      // If you have async cancellation support in your API (e.g., Axios cancel token), you can use it here.
      setIsLoading(false); // Reset loading when unmounting
    };
  }, []);

  return { response, isLoading, error, setCurrency };
};
