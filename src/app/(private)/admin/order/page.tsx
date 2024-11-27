'use client';

import React, { useEffect, useState } from 'react';
import * as order from '@/constants/Order';

import { Button, Dropdown, Form, InputText, Pagination, useApi } from '@Core';
import classNames from 'classnames';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { getAllOrders } from '@/service/order';
import { IOrderResponse } from '@/models/Order';
import { formatDisplayDate } from '@/helper/format-date';
import { formatNumberByCurrency } from '@/helper/format-number';
import { formatOrderStatus } from '@/helper/format-status';
import { formatPaymentMethod } from '@/helper/format-method';
import { getAllEventAutoComplete } from '@/service/event';
import { IEventList } from '@/schema/Event';
import { ListItemType } from '@/core/components/Dropdown';

function Page() {
  const limit = 10;
  //
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<IOrderResponse[]>([]);
  //
  const [isRefresh, setIsRefresh] = useState(false);

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [eventList, setEventsList] = useState<IEventList[]>([]);

  const methods = useForm<ListItemType>({
    defaultValues: { event: null },
  });
  const { watch, setValue } = methods;
  const eventId = watch('eventId');
  const orderNo = watch('orderNo');

  const { response, loading } = useApi({
    service: getAllOrders,
    params: { limit, offset, eventId, orderNo },
    effects: [offset, selectedEventId, orderNo, isRefresh],
  });

  const { response: events } = useApi<IEventList[]>({
    service: getAllEventAutoComplete,
    params: {},
    effects: [],
  });

  useEffect(() => {
    if (response?.data) {
      setList(response.data);
      setTotal(response.total);
    }
  }, [response]);

  useEffect(() => {
    if (events?.length) {
      setEventsList(events);
    }
  }, [events?.length]);

  useEffect(() => {
    setOffset(0);
    setSelectedEventId(eventId);
  }, [eventId]);

  function onClearFilter() {
    setOffset(0);
    setValue('eventId', null);
    setValue('orderNo', null);
  }

  function getStatusClass(statusOrder: number) {
    switch (statusOrder) {
      case order.ORDER_STATUS_PENDING:
        return 'bg-yellow-500';
      case order.ORDER_STATUS_COMPLETED:
        return 'bg-green-500';
      case order.ORDER_STATUS_CANCEL:
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  }

  return (
    <div>
      <h2 className="text-3xl mb-4">All Order ({total})</h2>
      <div className="flex items-center justify-between max-xl:flex-col gap-4">
        <Form
          methods={methods}
          classNames="flex max-xl:w-full h-full gap-4 items-center justify-between"
        >
          <div className="flex max-xl:w-4/5 items-start gap-4 max-xl:flex-col">
            <div className="w-full max-xl:max-w-full">
              <InputText name="orderNo" placeholder="Filter: Order No" />
            </div>
          </div>
          <div className="flex max-xl:w-4/5 items-start gap-4 max-xl:flex-col">
            <div className="w-full max-xl:max-w-full">
              <Dropdown name="eventId" items={eventList} placeholder="Select Event" />
            </div>
          </div>
          <Button onClick={onClearFilter} className="flex-grow self-stretch">
            Clear
          </Button>
        </Form>
      </div>

      <table className="w-full min-w-max table-auto mt-4 text-left">
        <thead>
          <tr>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Order No
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Customer Name
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Email
            </th>

            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Event Name
            </th>

            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Amount
            </th>

            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Status
            </th>

            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Payment Method
            </th>

            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Created At
            </th>

            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Completed At
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((row) => (
            <tr key={row._id} className="hover:bg-gray-100 dark:hover:bg-neutral-700">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                <Link href={'/admin/order/'}>{row.orderNo}</Link>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                <Link href={'/admin/order/'}>
                  {row.firstName} {row.lastName}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                <Link href={'/admin/order/'}>{row.email}</Link>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                <Link href={'/admin/order/'}>{row.event.name}</Link>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                <Link href={'/admin/order/'}>
                  {formatNumberByCurrency(row?.totalAmount || 0, row?.currency)}
                </Link>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                <Link href={'/admin/order/'}>
                  <div className="flex gap-x-2 items-center">
                    <div
                      className={classNames('h-2.5 w-2.5 rounded-full me-2 flex items-center', 4)}
                    >
                      <span>
                        <div
                          className={classNames(
                            'h-2.5 w-2.5 rounded-full me-2',
                            getStatusClass(row.status)
                          )}
                        ></div>
                      </span>
                      <span>{formatOrderStatus(row.status)}</span>
                    </div>
                  </div>
                </Link>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-800 dark:text-neutral-200">
                <Link href={'/'}>{formatPaymentMethod(row.paymentMethod)}</Link>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                <Link href={'/'}> {formatDisplayDate(row.createdAt, 'DD MMM YYYY')}</Link>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                <Link href={'/'}>{formatDisplayDate(row.completedAt, 'DD MMM YYYY')}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!loading && !list.length && (
        <div className="mt-10 text-center text-gray-800 dark:text-neutral-200">
          No order has been recorded for this filter(s).
        </div>
      )}

      <div className="mt-4">
        <Pagination total={total} pageSize={limit} onChange={setOffset} />
      </div>
    </div>
  );
}

export default Page;
