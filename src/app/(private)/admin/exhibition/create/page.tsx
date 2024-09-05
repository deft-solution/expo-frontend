"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ExhibitionSocialForm from '@/components/partials/exhibitions/SocialForm';
import { SOCIAL_TYPE } from '@/constants/socials';
import { ExhibitorSchema } from '@/schema/Exhibition';
import { createExhibition, getExhibitionById, updateExhibition } from '@/service/exhibition';
import { InputTag, InputText, TextArea, Upload } from '@Core';
import { yupResolver } from '@hookform/resolvers/yup';

const CreateExhibition = () => {
  const methods = useForm({
    resolver: yupResolver(ExhibitorSchema),
    defaultValues: { tags: [], socials: SOCIAL_TYPE },
  });
  const router = useRouter();
  const id = useSearchParams().get("id") ?? null; // default value is "1"
  const { handleSubmit, setValue } = methods;

  const onSubmitLoginForm = (data: any) => {
    const socials = data.socials.filter(({ url }: any) => url);
    data["socials"] = socials;

    const request = id ? updateExhibition(id, data) : createExhibition(data);
    request
      .then(() => {
        router.push("/admin/exhibition");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    if (id) {
      getExhibitionById(id as string).then((response) => {
        setValue("name", response.name);
        setValue("logoUrl", response.logoUrl);
        setValue("description", response.description);
        setValue("category", response.category);
        setValue("tags", response.tags);
        //
        setValue("contact.name", response.contact.name);
        setValue("contact.email", response.contact.email);
        setValue("contact.phoneNumber", response.contact.phoneNumber);
        setValue("contact.vatNumber", response.contact.vatNumber);
        //
        setValue("location.postalCode", response.location.postalCode);
        setValue("location.city", response.location.city);
        setValue("location.country", response.location.country);
        setValue("location.state", response.location.state);
        setValue("location.addressOne", response.location.addressOne);
        setValue("location.addressTwo", response.location.addressTwo);
        const socials = response.socials;
        if (socials.length) {
          SOCIAL_TYPE.forEach((row, idx) => {
            const url =
              socials.find(({ type }) => type === row.type)?.url ?? "";
            setValue(`socials.${idx}.url`, url);
          });
        }
      });
    }
  }, []);

  return (
    <div>
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmitLoginForm)}
          action=""
        >
          <div className="grid grid-cols-2 gap-4">
            <InputText
              name="name"
              label="Exhibition Name"
              placeholder="Exhibition Name Ex: `Ted Talk`.... "
            />
            <InputText
              label="Category"
              name="category"
              placeholder="Category"
            />
          </div>
          <InputTag name="tags" label="Tag" />
          <Upload name="logoUrl" label="Logo URL" />
          <TextArea
            label="Description"
            name="description"
            placeholder="Exhibition Description"
          />

          <h2 className="text-2xl">Exhibition Location</h2>
          <div className="flex flex-col gap-4">
            <InputText
              name="location.addressOne"
              label="Address Line 1"
              placeholder="e.g., 1234 Elm Street"
            />
            <InputText
              name="location.addressTwo"
              label="Address Line 2"
              placeholder="e.g., 1234 Elm Street"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputText
                name="location.postalCode"
                label="Postal Code"
                placeholder="e.g., 1234"
              />

              <InputText
                name="location.state"
                label="State"
                placeholder="e.g......."
              />

              <InputText
                name="location.city"
                label="City"
                placeholder="e.g., Phnom Penh"
              />

              <InputText
                name="location.country"
                label="Country"
                placeholder="e.g., Cambodia"
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl">Contact</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <InputText name="contact.name" label="Name" />
              <InputText name="contact.email" label="Email" />
              <InputText name="contact.phoneNumber" label="Phone Number" />
              <InputText name="contact.vatNumber" label="Vat Number" />
            </div>
          </div>

          <h2 className="text-2xl">Website & Social Media</h2>
          <div className="flex flex-col gap-4">
            <ExhibitionSocialForm />
          </div>

          <div className="grid grid-cols-6">
            <button
              type="submit"
              className="col-start-6 w-full text-white bg-primary hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateExhibition;
