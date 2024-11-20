'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { FormBooth, IBoothForm } from '@/schema/Booth';
import { IBootTypeList } from '@/schema/BoothType';
import { IEventList } from '@/schema/Event';
import { createBooth, findBoothOneId, updateBoothByID } from '@/service/booth';
import { getAllBoothTypeAutoComplete } from '@/service/booth-type';
import { getAllEventAutoComplete } from '@/service/event';
import { Checkbox, Dropdown, InputText, RichTextCK, useApi } from '@Core';
import { yupResolver } from '@hookform/resolvers/yup';

const Page = () => {
  const router = useRouter();
  const id = useSearchParams().get('id') ?? null; // default value is "1"
  const methods = useForm({
    resolver: yupResolver(FormBooth),
    defaultValues: { isActive: true, description: null, mapUrl: null },
  });
  const { handleSubmit, setValue } = methods;

  const [events, setEventList] = useState<IEventList[]>([]);
  const [boothTypes, setBoothTypes] = useState<IBootTypeList[]>([]);

  // API
  const action = () => Promise.all([getAllEventAutoComplete(), getAllBoothTypeAutoComplete()]);

  const { response } = useApi({ service: action, params: {}, effects: [] });

  useEffect(() => {
    if (response?.length) {
      setEventList(response[0]);
      setBoothTypes(response[1]);
    }
  }, [response]);

  const onFormSubmit = (data: IBoothForm) => {
    const request = id ? updateBoothByID(id, data) : createBooth(data);
    request.then(() => {
      router.push('/admin/booth');
    });
  };

  useEffect(() => {
    if (id) {
      findBoothOneId(id).then((res) => {
        setValue('boothNumber', res.boothNumber);
        setValue('boothName', res.boothName);
        setValue('isActive', res.isActive);
        setValue('hall', res.hall);
        setValue('size', res.size);
        setValue('mapUrl', res.mapUrl);
        setValue('event', res.event as any);
        setValue('description', res.description);
        setValue('externalId', res.externalId);
        setValue('price', res.price);
        setValue('event', res.event as any);
        setValue('boothType', res.boothType as any);
      });
    }
  }, [id]);

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-4" action="">
          <div className="grid grid-cols-2 gap-4">
            <InputText name="boothName" label="Booth name" placeholder="B202" />
            <InputText name="boothNumber" label="Booth Number" placeholder="B202" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Dropdown name="event" label="Event" items={events} />
            <Dropdown name="boothType" label="Booth Type" items={boothTypes} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputText name="hall" label="Hall" placeholder="South Hall" />
            <InputText name="size" label="Size" placeholder="13 X 13" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputText name="price" label="Price" placeholder="Booth Price Ex: 140$" />
            <InputText name="externalId" label="External ID" placeholder="******" />
          </div>
          <InputText name="mapUrl" label="Map URL" />
          <RichTextCK name="description" label="Description" />
          <Checkbox name="isActive" label="Active" />
          <div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Save
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Page;
