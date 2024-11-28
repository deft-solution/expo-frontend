'use client';
import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import * as orderConstant from '@/constants/Order';
import * as payment from '@/constants/Payment';

import { useRouter } from 'next/navigation';

import { formatOrderStatus, formatPaymentStatus } from '@/helper/format-status';

import { Button } from '@Core';
import { formatDisplayDate } from '@/helper/format-date';
import { IOrderResponse } from '@/models/Order';
import { getOrderById } from '@/service/order';

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter();
  const [refresh, setIsRefresh] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [order, setOrder] = useState<IOrderResponse | null>(null);

  useEffect(() => {
    if (id) {
      getOrderById(id)
        .then((res) => {
          if (res) {
            setOrder(res);
          }
        })
        .catch(() => {
          router.replace('/404'); // Redirect to 404 on error
        });
    }
  }, [id, refresh]);

  if (!order) {
    return <></>;
  }

  function getStatusClass(statusOrder: number) {
    switch (statusOrder) {
      case orderConstant.ORDER_STATUS_PENDING:
        return 'text-yellow-600 bg-yellow-100 px-3 rounded-lg py-1';
      case orderConstant.ORDER_STATUS_COMPLETED:
        return 'text-green-600 bg-green-100 px-3 rounded-lg py-1';
      case orderConstant.ORDER_STATUS_CANCEL:
        return 'text-red-600 bg-red-100 px-3 rounded-lg py-1';
      default:
        return 'text-gray-600 bg-gray-100 px-3 rounded-lg py-1';
    }
  }

  const orderStatus = (status: number) => (
    <span className={classNames(getPaymentStatusClass(status), 'text-sm')}>
      Order {formatOrderStatus(status)}
    </span>
  );

  const paymentStatus = (status: number) => (
    <span className={classNames(getStatusClass(status), 'text-sm')}>
      {formatPaymentStatus(status)}
    </span>
  );

  function getPaymentStatusClass(statusOrder: number) {
    switch (statusOrder) {
      case payment.PAYMENT_STATUS_PENDING:
        return 'text-yellow-600 bg-yellow-100 px-3 rounded-lg py-1';
      case payment.PAYMENT_STATUS_COMPLETED:
        return 'text-green-600 bg-green-100 px-3 rounded-lg py-1';
      case payment.PAYMENT_STATUS_FAILED:
        return 'text-red-600 bg-red-100 px-3 rounded-lg py-1';
      default:
        return 'text-gray-600 bg-gray-100 px-3 rounded-lg py-1';
    }
  }

  return (
    <div>
      {order && (
        <div
          key={order._id}
          className="rounded-lg mx-auto px-0 lg:px-5 flex-wrap text-sm text-gray-600 lg:text-base max-w-[600px] lg:max-w-full"
        >
          <h2 className="pb-3 text-start flex items-start justify-center gap-x-5 gap-y-2 flex-col lg:flex-row lg:justify-start lg:items-center">
            <span className="text-xl font-bold text-gray-900">Order No: {order.orderNo}</span>
            <div className="flex gap-x-5">
              {orderStatus(order.status)}
              {paymentStatus(order.paymentStatus)}
            </div>
            {order.status === orderConstant.ORDER_STATUS_PENDING && (
              <Button onClick={() => alert('cancel')} disabled={cancelling} theme="light">
                Cancel
              </Button>
            )}
          </h2>
          <div className="mb-5 flex items-center gap-x-3">
            <span className="flex items-center gap-x-3 font-semibold">Created at:</span>
            <span className="text-sm">
              {formatDisplayDate(order.createdAt, 'DD MMM yyyy hh:mm:ss a')}
            </span>
          </div>

          <div className="w-full grid grid-cols-6 gap-5 rounded-lg">
            <div className="rounded-lg grid h-full col-span-6 2xl:col-span-3">
              <div className="border row-span-2 h-full rounded-lg py-5 px-8">
                <div className="flex gap-4 flex-col text-gray-500">
                  <div className="flex justify-between flex-col lg:flex-row items-start gap-y-2 lg:items-center">
                    <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                  </div>
                  <div className="flex flex-col text-gray-500 gap-2 rounded-lg text-lg">
                    <div className="flex gap-4 flex-col text-gray-500">
                      {order.items.map((item) => {
                        const product = item._id;

                        return (
                          <div className="border rounded-lg" key={item._id}>
                            <div className="w-full flex flex-col lg:flex-row">
                              <Link href={`/admin/product/create?id=${item._id}`}></Link>
                              <div className="grid p-4 text-sm">
                                <div className="flex gap-2"></div>
                                <div className="flex gap-2">
                                  {item.unitPrice}
                                  <span>X</span>
                                  <span>{item.quantity}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="space-y-2">
                      <div className="flex gap-1 flex-col">
                        <p className="flex justify-between">
                          <span className="font-bold">Total Amount:</span>
                        </p>
                      </div>
                      <div className="flex gap-1 flex-col">
                        <p className="flex justify-between">
                          <span className="font-bold">Method:</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 row-span-2 border h-full p-8 flex flex-col flex-grow flex-wrap gap-5 rounded-lg flex-1">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Machine</h2>
                  <Button theme="light" className="flex items-center justify-between">
                    <Link href={`/admin/vending-machine/${order.items[0]._id}`}> View Details</Link>
                  </Button>
                </div>
                <div className="flex flex-col gap-1 justify-start text-gray-500">
                  <div className="flex flex-col space-y-2 w-full">
                    <div className="flex gap-1 flex-col">
                      <p className="space-x-12 flex justify-between">
                        <span className="font-bold">Name:</span>
                        {order.items[0]._id}
                      </p>
                    </div>
                    <div className="flex gap-1 flex-col">
                      <p className="space-x-12 flex justify-between">
                        <span className="font-bold">Location:</span>
                        {'hi'}
                      </p>
                    </div>
                    <div className="flex gap-1 flex-col">
                      <p className="space-x-12 flex justify-between">
                        <span className="font-bold">Serial No:</span>
                        hi
                      </p>
                    </div>
                    <div className="flex gap-1 flex-col">
                      <p className="space-x-12 flex justify-between">
                        <span className="font-bold">Model No;</span>
                        hi
                      </p>
                    </div>
                    <div className="flex gap-1 flex-col">
                      <p className="space-x-12 flex justify-between">
                        <span className="font-bold">Contact Person:</span>
                        contact
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
