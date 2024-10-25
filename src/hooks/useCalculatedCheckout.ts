import { useBoothSelection } from '@/context/BoothSelectionContext';
import { CalulcatedDataResponse, ICalulcatedOrder, OrderItem } from '@/models/Payment';
import { calculatedCheckOut } from '@/service/payment';
import { useEffect, useState } from 'react';

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
  const { ids } = useBoothSelection();
  const [items, setItems] = useState<OrderItem[]>([]);
  const [response, setResponse] = useState<CalulcatedDataResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (ids.length) {
      const orderItems = ids.map((id): OrderItem => ({ passTemplate: id, quantity: 1 }));
      setItems(orderItems);
    }
  }, [ids.length]);

  useEffect(() => {
    onCalculcated();
  }, [items.length, payment]);

  const onCalculcated = () => {
    if (items.length) {
      setIsLoading(true);
      //
      const param: ICalulcatedOrder = {
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
