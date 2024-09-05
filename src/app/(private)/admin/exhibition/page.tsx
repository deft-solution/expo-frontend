"use client";

import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { formatDisplayDate } from '@/helper/format-date';
import { IPagination } from '@/models/Pagination';
import { IExhibitor } from '@/schema/Exhibition';
import { getAllExhibition } from '@/service/exhibition';
import { Pagination, useApi } from '@Core';

const ExhibitionPage = () => {
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  //
  const [list, setList] = useState<IExhibitor[]>([]);

  const { response } = useApi<IPagination<IExhibitor>>({
    service: getAllExhibition,
    params: { limit, offset },
    effects: [offset],
  });

  useEffect(() => {
    if (response) {
      setList(response.data);
      setTotal(response.total);
    }
  }, [response]);

  return (
    <div>
      <div className="flex flex-row items-center justify-between ">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          All Exhibition ({total})
        </h2>
        <Link
          className="col-end-7 text-white bg-primary hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          href="/admin/exhibition/create"
        >
          Create Exhibition
        </Link>
      </div>
      <table className="w-full min-w-max table-auto mt-10 text-left">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Event Name
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Email
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Phone Number
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Category
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
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    <div className="flex items-center gap-2">
                      {row.logoUrl && (
                        <Image
                          className="w-10 h-10 rounded-full object-cover"
                          width={14}
                          height={14}
                          src={row.logoUrl}
                          alt={row.logoUrl}
                        />
                      )}
                      {row.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {row.contact.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {row.contact.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {row.category}
                  </td>
                  <td className="px-6 py-3">
                    {formatDisplayDate(row.createdAt)}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={classNames(
                          "h-2.5 w-2.5 rounded-full me-2",
                          { "bg-green-500": row.isActive },
                          { "bg-red-500": !row.isActive },
                        )}
                      ></div>
                      <div>{row.isActive ? "Active" : "Deactive"}</div>
                    </div>
                  </td>
                  <td>
                    <Link
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      href={{
                        pathname: "/admin/exhibition/create",
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
      <div className="mt-2">
        <Pagination pageSize={limit} total={total} onChange={setOffset} />
      </div>
    </div>
  );
};

export default ExhibitionPage;
