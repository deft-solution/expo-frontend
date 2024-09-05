'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { handleSubmitLogin } from '@/actions/Authentication';
import { useAuthContext } from '@/context/AuthContext';
import { IAuthLogin, LoginSchema } from '@/schema';
import { InputPassword, InputText } from '@Core';
import { yupResolver } from '@hookform/resolvers/yup';

const Page = () => {
  const router = useRouter();
  const context = useAuthContext();
  const methods = useForm({ resolver: yupResolver(LoginSchema) });
  const handleSubmit = methods.handleSubmit;

  const onSubmit = (data: IAuthLogin) => {
    handleSubmitLogin(data).then(() => {
      if (context) {
        context.onRefreshAuthContext();
      }
      router.push('/admin/dashboard');
    });
  };

  return (
    <div className="border border-gray-200 bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="">
                <InputText name="username" label="Email" placeholder="Enter Your Email." />
                <InputPassword name="password" label="Password" placeholder="*********" />
                <button
                  type="submit"
                  className="w-full text-white bg-primary hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign In
                </button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
