import { useEffect, useState } from 'react';

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

export const useCalculatedCheckout = (props: TypeProps) => {
  const { payment } = props;
  const { isAuthenticated } = useAuthLive();
  const { ids } = useBoothSelection();
  const [items, setItems] = useState<OrderItem[]>([]);
  const [response, setResponse] = useState<CalculatedDataResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (ids.length) {
      const orderItems = ids.map((id): OrderItem => ({ passTemplate: id, quantity: 1 }));
      setItems(orderItems);
    }
  }, [ids.length]);

  useEffect(() => {
    if (isAuthenticated) {
      onCalculated();
    }
  }, [items.length, payment, isAuthenticated]);

  const onCalculated = () => {
    if (items.length) {
      setIsLoading(true);
      //
      const param: ICalculatedOrder = {
        orderItems: items,
        reservationDate: null,
      };
      if (payment) {
        Object.assign(param, { ...payment });
      }
      calculatedCheckOut(param)
        .then((response) => {
          setIsLoading(false);
          setResponse(response);
        })
        .catch((err) => {
          setIsLoading(false);
          console.error(err);
        });
    }
  };

  return { response, isLoading };
};
