"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { EmailValidationSignUp, IValidatingEmail } from '@/schema';
import { Button, Form, InputOTP, InputText } from '@Core';
import { yupResolver } from '@hookform/resolvers/yup';

import { hasSendEmailVerificationSuccess } from '../../../actions/Authentication';

const Page = () => {
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isCodeSubmitted, setIsCodeSubmitted] = useState<boolean>(false);

  const [disabled, setIsDisabled] = useState<boolean>(false);

  const methods = useForm({
    resolver: yupResolver(EmailValidationSignUp),
  });
  const { formState, trigger, setError } = methods;

  const onSubmitForm = async (formValue: IValidatingEmail) => {
    if (formValue.email && !isValidEmail) {
      const isValidEmail = await hasSendEmailVerificationSuccess(
        formValue.email,
      );
      setIsValidEmail(isValidEmail);
    }
    if (formValue.code === null) {
      setError("code", { message: "Verification is required" });
    }
    console.log(formValue);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create Your Account
            </h2>
            <Form
              classNames="flex flex-col gap-4"
              methods={methods}
              onSubmit={onSubmitForm}
            >
              {!isValidEmail && !isCodeSubmitted && (
                <InputText
                  name="email"
                  label="Email"
                  placeholder="exmaple@gmail.com"
                />
              )}
              {isValidEmail && !isCodeSubmitted && (
                <InputOTP name="code" length={6} />
              )}
              {isValidEmail && isCodeSubmitted && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <InputText name="firstName" label="First Name" />
                    <InputText name="lastName" label="Last Name" />
                  </div>
                  <InputText name="password" label="Password" />
                </>
              )}
              <Button type="submit">Continue</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
