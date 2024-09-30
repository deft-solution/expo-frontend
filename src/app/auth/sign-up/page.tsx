'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { SignUpExhibitionParam } from '@/models/AccessToken';
import { EmailValidationSignUp, IValidatingEmail } from '@/schema';
import { Button, Form, InputOTP, InputText } from '@Core';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  isEmailVerificationSent,
  onSignUpWithExhibition,
  verifyEmailCode,
} from '../../../actions/Authentication';

export type FormStepType = 'EMAIL' | 'OTP' | 'PROFILE';

const Page = () => {
  const router = useRouter();
  const [formStep, setFormStep] = useState<FormStepType>('EMAIL');
  const [token, setToken] = useState<string | null>(null);

  const methods = useForm({ resolver: yupResolver(EmailValidationSignUp) });
  const { setError } = methods;

  const onSubmitForm = async (formValue: IValidatingEmail) => {
    const { email, code, firstName, lastName, password } = formValue;

    if (formStep === 'EMAIL') {
      const isValidEmail = await isEmailVerificationSent(email);
      if (!isValidEmail) {
        setError('email', { message: 'Email verification failed' });
        return;
      }
      setFormStep('OTP');
    }

    if (formStep === 'OTP') {
      if (!code) {
        setError('code', { message: 'Verification code is required' });
        return;
      }

      const verifyCode = await verifyEmailCode({ email, code });
      if (!verifyCode?.token) {
        setError('code', { message: 'Invalid verification code' });
        return;
      }

      setToken(verifyCode.token);
      setFormStep('PROFILE');
    }

    if (formStep === 'PROFILE' && token) {
      if (!firstName) {
        setError('firstName', { message: 'First name is required' });
        return;
      }
      if (!lastName) {
        setError('lastName', { message: 'Last name is required' });
        return;
      }
      if (!password) {
        setError('password', { message: 'Password is required' });
        return;
      }

      const param: SignUpExhibitionParam = {
        password,
        profile: { firstName, lastName },
      };
      await onSignUpWithExhibition(param, token);
      router.push('/admin/dashboard');
    }
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
              {formStep === 'EMAIL' && (
                <InputText
                  name="email"
                  label="Email"
                  placeholder="example@gmail.com"
                />
              )}
              {formStep === 'OTP' && <InputOTP name="code" length={6} />}
              {formStep === 'PROFILE' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <InputText
                      name="firstName"
                      label="First Name"
                      placeholder="John"
                    />
                    <InputText
                      name="lastName"
                      label="Last Name"
                      placeholder="Doe"
                    />
                  </div>
                  <InputText
                    name="password"
                    label="Password"
                    placeholder="******"
                  />
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
