import React, { useState } from 'react';
import { Button, Form, InputOTP, InputPhone } from '@Core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ISendCodeForm, SendCodeForm, VerifyOTPParam } from '@/schema/Wonderpass/Authentication';
import { detectOS } from '@/helper/device';
import { sendCodeToPhoneNumber } from '@/service/authentication';
import { verifiyOTP } from '@/actions/Wonderpass/Authentication';
import { useAuthLive } from '@/context/AuthLiveContext';

const PhoneNumberForm: React.FC = () => {
  const { onRefresh } = useAuthLive();
  const [isLoading, setIsLoading] = useState(false); // Loading state for async calls
  const [sentCode, setSentCode] = useState(false); // Track if code was sent

  const methods = useForm<ISendCodeForm>({ resolver: yupResolver(SendCodeForm) });
  const { setError } = methods;

  const handleSendCode = async (data: ISendCodeForm) => {
    try {
      setIsLoading(true); // Start loading
      await sendCodeToPhoneNumber(data);
      setSentCode(true); // Mark code as sent
    } catch (error: any) {
      setError('phoneNumber', { message: error?.message || 'Failed to send code' });
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleVerifyOTP = async (data: VerifyOTPParam) => {
    try {
      setIsLoading(true); // Start loading
      await verifiyOTP(data);
      onRefresh(); // Trigger authentication context refresh
    } catch (error: any) {
      setError('code', { message: error?.message || 'Failed to verify code' });
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const onSubmitForm = (data: ISendCodeForm) => {
    const userAgent = navigator.userAgent;
    const os = detectOS(userAgent);

    // Assign device details
    data['deviceId'] = data.deviceId ?? '';
    data['deviceName'] = os.name ?? '';
    data['osVersion'] = os.version ?? '';

    if (!sentCode) {
      handleSendCode(data);
    } else if (data.code) {
      handleVerifyOTP(data as VerifyOTPParam);
    } else {
      setError('code', { message: 'Please fill in the verification code.' });
    }
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
