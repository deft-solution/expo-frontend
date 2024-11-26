'use client';

import React, { useEffect, useState } from 'react';
import * as payment from '@/constants/Payment';

import { Button, Form, Pagination, useApi } from '@Core';
import classNames from 'classnames';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import moment from 'moment';
import { getAllOrders } from '@/service/order';
import { IOrderRequestParams } from '@/schema/Checkout';
import { IOrder } from '@/models/Order';
import { formatDisplayDate } from '@/helper/format-date';
import { formatNumberByCurrency } from '@/helper/format-number';
import { formatOrderStatus, formatPaymentStatus } from '@/helper/format-status';
import { formatPaymentMethod } from '@/helper/format-method';
import { getAllEventAutoComplete } from '@/service/event';
import { IEventList } from '@/schema/Event';

function Page() {
  const limit = 10;
  //
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<IOrder[]>([]);
  //
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  const [selectedMachine, setSelectedMachine] = useState<string | null>(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<number | null>(null);
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);
  const [eventList, setEventsList] = useState<IEventList[]>([]);
  const { response, loading } = useApi({
    service: getAllOrders,
    params: { limit, offset },
    effects: [offset],
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

  console.log(eventList);
  //   function onClearFilter() {
  //     setOffset(0);
  //     setValue('machine', null);
  //     setValue('status', null);
  //     setValue('from', null);
  //     setValue('to', null);
  //   }

  return (
    <div>
      <h2 className="text-3xl mb-4">All Order ({total})</h2>
      <div className="flex items-center justify-between max-xl:flex-col gap-4">
        <form className="flex max-xl:w-full h-full gap-4 items-center justify-between">
          <div className="flex max-xl:w-4/5 items-start gap-4 max-xl:flex-col">
            <div className="w-full max-xl:max-w-full">
              <select
                defaultValue=""
                required
                className="bg-gray-50 text-sm rounded-lg w-full h-12 py-3 px-2.5 border"
              >
                <option value="" disabled>
                  Select Event
                </option>
                {eventList.map((row) => (
                  <option value={row.id} key={row.id}>
                    {row.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button className="flex-grow self-stretch">Clear</Button>
        </form>
        <Button
          className="flex max-xl:w-full items-center h-full bg-green-700 gap-2 hover:bg-green-800  justify-center"
          disabled={isDownloading}
        >
          Download Excel
        </Button>
      </div>

      <table className="w-full min-w-max table-auto mt-4 text-left">
        <thead>
          <tr>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Order No
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Booth | Hall
            </th>

            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Event ID
            </th>

            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Amount
            </th>

            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Status
            </th>

            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Payment Status
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
            <tr className="hover:bg-gray-100 dark:hover:bg-neutral-700">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                <Link href={'/admin/order/'}>{row.orderNo}</Link>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                <Link href={'/admin/order/'}>
                  {row.items[0].boothId.boothName} | {row.items[0].boothId.hall}
                </Link>
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
                    <div className={classNames('h-2.5 w-2.5 rounded-full me-2', 4)}>
                      {formatOrderStatus(row.status)}
                    </div>
                  </div>
                </Link>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                <Link href={'/admin/order/'}>
                  <div className="flex gap-x-2 items-center">
                    <div className={classNames('h-2.5 w-2.5 rounded-full me-2', 5)}></div>
                    {formatPaymentStatus(row.paymentStatus)}
                  </div>
                </Link>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
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
      {/*
      {!loading && !list.length && (
        <div className="mt-10 text-center text-gray-800 dark:text-neutral-200">
          No order has been recorded for this filter(s).
        </div>
      )} */}

      <div className="mt-4">
        <Pagination total={total} pageSize={limit} onChange={setOffset} />
      </div>
    </div>
  );
}

export default Page;
