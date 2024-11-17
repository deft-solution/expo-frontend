import { useEffect, useState, useCallback } from 'react';
import { useAuthLive } from '@/context/AuthLiveContext';
import { useBoothSelection } from '@/context/BoothSelectionContext';
import { CalculatedDataResponse, ICalculatedOrder, OrderItem } from '@/models/Payment';
import { calculatedCheckOut } from '@/service/payment';

export interface TypeProps {
  payment?: IPayments;
}

export interface IPayments {
  provider?: number;
  option?: string;
  paymentCard?: string;
}

export const useCalculatedCheckout = ({ payment }: TypeProps) => {
  const { isAuthenticated } = useAuthLive();
  const { ids } = useBoothSelection();
  const [items, setItems] = useState<OrderItem[]>([]);
  const [response, setResponse] = useState<CalculatedDataResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Prepare order items when booth selection (ids) changes
  useEffect(() => {
    if (ids.length) {
      const orderItems = ids.map((id): OrderItem => ({ passTemplate: id, quantity: 1 }));
      setItems(orderItems);
    }
  }, [ids]);

  // Perform calculation when items or payment data changes and the user is authenticated
  useEffect(() => {
    if (isAuthenticated && items.length && payment) {
      onCalculated();
    }
  }, [items, payment, isAuthenticated]);

  // Function to handle the checkout calculation
  const onCalculated = useCallback(() => {
    // Prevent multiple concurrent requests
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    setError(null); // Clear previous errors

    const param: ICalculatedOrder = {
      orderItems: items,
      reservationDate: null,
      ...payment, // Merge the payment details if available
    };

    calculatedCheckOut(param)
      .then((res) => {
        // Only update state if the response is different
        if (JSON.stringify(res) !== JSON.stringify(response)) {
          setResponse(res);
        }
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
  }, [items, payment, isLoading, response]);

  // Optionally, handle cleanup in case the component is unmounted
  useEffect(() => {
    return () => {
      // If you have async cancelation support in your API (e.g., Axios cancel token), you can use it here.
      setIsLoading(false); // Reset loading when unmounting
    };
  }, []);

  return { response, isLoading, error };
};
