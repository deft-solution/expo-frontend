'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  handleSubmitCreateEvent,
  handleSubmitUpdateEvent,
} from '@/actions/event';
import DatePicker from '@/core/components/Datepicker';
import { formatDisplayDate } from '@/helper/format-date';
import { EventCreateFormSchema, IEvents } from '@/schema/Event';
import { getEventById } from '@/service/event';
import { Checkbox, InputText, TextArea, Upload } from '@Core';
import { yupResolver } from '@hookform/resolvers/yup';

const Page = () => {
  const router = useRouter();
  const methods = useForm({ resolver: yupResolver(EventCreateFormSchema) });
  const { handleSubmit, setValue, trigger } = methods;
  const id = useSearchParams().get('id') ?? null; // default value is "1"

  const onSubmit = (event: IEvents) => {
    const action = id
      ? handleSubmitUpdateEvent(id, event)
      : handleSubmitCreateEvent(event);
    action.then(() => {
      router.push('/admin/event');
    });
  };

  useEffect(() => {
    if (id) {
      getEventById(id).then((res) => {
        setValue('name', res.name);
        setValue('logoUrl', res.logoUrl);
        setValue('startFrom', formatDisplayDate(res.startFrom, 'YYYY-MM-DD'));
        setValue('endDate', formatDisplayDate(res.endDate, 'YYYY-MM-DD'));
        setValue('email', res.email);
        setValue('phoneNumber', res.phoneNumber);
        setValue('location', res.location);
        setValue('description', res.description);
        setValue('floorPlanUrl', res.floorPlanUrl);
        setValue('mainWebsiteUrl', res.mainWebsiteUrl);
        setValue('isActive', res.isActive);
        trigger('logoUrl');
      });
    }
  }, [id]);

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Create Event
      </h2>
      <FormProvider {...methods}>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2 sm:grid-cols-2 sm:gap-6">
            <InputText
              name="name"
              label="Event Name"
              placeholder="Event Name"
            />
            <InputText
              name="mainWebsiteUrl"
              label="Main Website URL"
              placeholder="Main Website URL"
            />
            <div className="grid gap-4 grid-cols-2 col-span-2">
              <DatePicker name="startFrom" label="Start From" />
              <DatePicker name="endDate" label="End Date" />
            </div>
            <div className="grid gap-4 grid-cols-2 col-span-2">
              <Upload name="logoUrl" label="Logo URL" />
              <Upload name="floorPlanUrl" label="Floor Plan" />
            </div>
            <div className="sm:col-span-2">
              <h2 className="border-b pb-4">Contact Information</h2>
              <div className="mt-4">
                <div className="grid gap-4 mb-3 sm:grid-cols-2 sm:gap-6">
                  <InputText
                    name="email"
                    label="Email Address"
                    placeholder="Phone Number"
                  />
                  <InputText
                    name="phoneNumber"
                    label="Phone Number"
                    placeholder="Phone Number"
                  />
                </div>
                <InputText
                  name="location"
                  label="Location"
                  placeholder="Location"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <TextArea
                name="description"
                label="Description"
                placeholder="Your description here"
              />
            </div>

            <Checkbox name="isActive" label="Active" />
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Add Event
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Page;
