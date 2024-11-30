import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { ISendCodeForm, SendCodeForm } from '@/schema/Wonderpass/Authentication';
import { Button, Form, InputOTP, InputPhone } from '@Core';
import { yupResolver } from '@hookform/resolvers/yup';

const PhoneNumberForm: React.FC = () => {
  const [isLoading] = useState(false); // Loading state for async calls
  const [sentCode] = useState(false); // Track if code was sent

  const methods = useForm<ISendCodeForm>({ resolver: yupResolver(SendCodeForm) });

  const onSubmitForm = (data: ISendCodeForm) => {
    console.log(data);
  };

  return (
    <div>
      <Form
        classNames="grid gap-4"
        methods={methods}
        onSubmit={onSubmitForm} // Using handleSubmit to ensure proper form validation
      >
        {!sentCode && (
          <InputPhone
            name="phoneNumber"
            nameCountry="phoneCode"
            placeholder="Enter your Phone Number"
          />
        )}

        {sentCode && <InputOTP label="Verification Code" length={6} name="code" />}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : sentCode ? 'Verify Code' : 'Send Code'}
        </Button>
      </Form>
    </div>
  );
};

export default PhoneNumberForm;
