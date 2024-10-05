'use client';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { formatDisplayDate } from '@/helper/format-date';
import { IBootList } from '@/schema/Booth';
import { getAllBooths } from '@/service/booth';
import { useApi } from '@Core';

const Page = () => {
  const [list, setList] = useState<IBootList[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const limit = 10;

  // API
  const { response } = useApi({
    service: getAllBooths,
    params: {},
    effects: [offset],
  });

  useEffect(() => {
    if (response && response.data) {
      setList(response.data);
      setTotal(response.total);
    }
  }, [response]);

  return (
    <div>
      <Link
        className="col-end-7 text-white bg-primary hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        href="/admin/booth/create"
      >
        Create Booth
      </Link>
      <table className="w-full min-w-max table-auto mt-4 text-left">
        <thead>
          <tr>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Booth No
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Event Name
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Boot Type
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Created At
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
                <tr
                  key={idx}
                  className="hover:bg-gray-100 dark:hover:bg-neutral-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {row.boothNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    <div className="flex items-center gap-2">
                      {row?.event?.logoUrl && (
                        <Image
                          className="w-10 h-10 rounded-full object-cover"
                          width={100}
                          height={100}
                          src={row.event.logoUrl}
                          alt={row.event.logoUrl}
                        />
                      )}
                      {row?.event?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {row.boothType?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {formatDisplayDate(row.createdAt, 'DD MMM YYYY')}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div
                        className={classNames(
                          'h-2.5 w-2.5 rounded-full me-2',
                          { 'bg-green-500': row.isActive },
                          { 'bg-red-500': !row.isActive },
                        )}
                      ></div>
                      <div>{row.isActive ? 'Active' : 'Deactive'}</div>
                    </div>
                  </td>
                  <td>
                    <Link
                      href={{
                        pathname: '/admin/booth/create',
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
    </div>
  );
};

export default Page;
