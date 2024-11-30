'use client';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { formatDisplayDate } from '@/helper/format-date';
import { IBootList } from '@/schema/Booth';
import { IEventList } from '@/schema/Event';
import { getAllBooths } from '@/service/booth';
import { Form, InputText, Pagination, useApi } from '@Core';

const Page = () => {
  const methods = useForm();
  const { watch } = methods;
  const name = watch('name');

  const [list, setList] = useState<IBootList[]>([]);
  const [filterName, setFilterName] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const limit = 10;

  // API
  const { response, loading } = useApi({
    service: getAllBooths,
    params: { limit, offset, name: filterName },
    effects: [offset, filterName],
  });

  useEffect(() => {
    if (response && response.data) {
      setList(response.data);
      setTotal(response.total);
    }
  }, [response]);

  useEffect(() => {
    setFilterName(name);
  }, [name]);

  const goToEventDetail = (id: string) => {
    return '/admin/event/' + id;
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">All Booth ({total})</h2>
        <Link
          className="col-end-7 text-white bg-primary hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          href="/admin/booth/create"
        >
          Create Booth
        </Link>
      </div>
      <Form classNames="mt-8" methods={methods}>
        <div className="flex">
          <InputText disabled={loading} name="name" placeholder="Filter: Booth Name" />
        </div>
      </Form>
      <table className="w-full min-w-max table-auto mt-4 text-left">
        <thead>
          <tr>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Booth Name
            </th>
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
              const event = row?.event as IEventList;
              return (
                <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-neutral-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {row.boothName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {row.boothNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {(event as IEventList)?.id && (
                      <Link href={goToEventDetail(event.id)}>
                        <div className="flex items-center gap-2">
                          {event?.logoUrl && (
                            <Image
                              className="w-10 h-10 rounded-full object-cover"
                              width={100}
                              height={100}
                              src={event.logoUrl}
                              alt={event.logoUrl}
                            />
                          )}
                          {event?.name}
                        </div>
                      </Link>
                    )}
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
                          { 'bg-red-500': !row.isActive }
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
      <div className="mt-4">
        <Pagination total={total} pageSize={limit} onChange={setOffset} />
      </div>
    </div>
  );
};

export default Page;
