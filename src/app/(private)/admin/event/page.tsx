'use client';

import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { formatDisplayDate } from '@/helper/format-date';
import { IPagination } from '@/models/Pagination';
import { EventListingFilterParam, IEventList } from '@/schema/Event';
import { getAllEvent } from '@/service/event';
import { Pagination, useApi } from '@Core';

const Page = () => {
  const [list, setList] = useState<IEventList[]>([]);
  const [total, setTotal] = useState(0);
  const [limit, _] = useState<number>(25);
  const [offset, setOffset] = useState<number>(0);

  const { response } = useApi<IPagination<IEventList>, EventListingFilterParam>({
    service: getAllEvent,
    params: { limit: limit, offset: offset },
    effects: [offset],
  });

  useEffect(() => {
    if (response && response.data.length) {
      setList(response.data);
      //
      setTotal(response.total);
    }
  }, [response]);

  const goToEventDetail = (id: string) => {
    return '/admin/event/' + id;
  };

  return (
    <div>
      <div className="grid grid-cols-6 gap-4">
        <h2 className="text-3xl">All Event</h2>
        <Link
          className="col-end-7 text-white bg-primary hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          href="/admin/event/create"
        >
          Add Another Event
        </Link>
      </div>
      <table className="w-full min-w-max table-auto mt-4 text-left">
        <thead>
          <tr>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Event Name
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Start Date
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              End Date
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Status
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
          {list.length > 0 &&
            list.map((row, idx) => {
              return (
                <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-neutral-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    <Link href={goToEventDetail(row.id)}>
                      <div className="flex items-center gap-2">
                        {row.logoUrl && (
                          <Image
                            className="w-10 h-10 rounded-full object-cover"
                            width={100}
                            height={100}
                            src={row.logoUrl}
                            alt={row.logoUrl}
                          />
                        )}
                        {row.name}
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    <Link href={goToEventDetail(row.id)}>{formatDisplayDate(row.startFrom)}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    <Link href={goToEventDetail(row.id)}>{formatDisplayDate(row.endDate)}</Link>
                  </td>
                  <td>
                    <Link href={goToEventDetail(row.id)}>
                      <div className="flex items-center gap-2">
                        <div
                          className={classNames(
                            'h-2.5 w-2.5 rounded-full me-2',
                            { 'bg-green-500': row.isActive },
                            { 'bg-red-500': !row.isActive }
                          )}
                        ></div>
                        <div>{row.isActive ? 'Active' : 'Deactive'}</div>
                      </div>
                    </Link>
                  </td>
                  <td>
                    <Link
                      href={{
                        pathname: '/admin/event/create',
                        query: { id: row.id },
                      }}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <Pagination pageSize={limit} total={total} onChange={setOffset} />
    </div>
  );
};

export default Page;
