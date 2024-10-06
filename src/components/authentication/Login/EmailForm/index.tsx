import React, { useState } from 'react';
import { Button, Form, InputPassword, InputText } from '@Core';
import { useForm } from 'react-hook-form';
import { detectOS } from '@/helper/device';
import { yupResolver } from '@hookform/resolvers/yup';
import { ILoginEmailParam, LoginEmailWonderPassSchema } from '@/schema/Wonderpass/Authentication';
import { handleLoginEmailByWonderPass } from '@/actions/Wonderpass/Authentication';
import { useAuthLive } from '@/context/AuthLiveContext';

const LoginEmailForm = () => {
  const [error, setError] = useState<any>();
  const { onRefresh } = useAuthLive();
  const methods = useForm({ resolver: yupResolver(LoginEmailWonderPassSchema) });

  const onSubmitLoginForm = (data: ILoginEmailParam) => {
    const userAgent = navigator.userAgent;
    const os = detectOS(userAgent);

    data['deviceId'] = data.deviceId ?? '';
    data['deviceName'] = os.name ?? '';
    data['osVersion'] = os.version ?? '';

    handleLoginEmailByWonderPass(data)
      .then(() => {
        onRefresh();
      })
      .catch((err) => {
        if (err.message) {
          setError(err.message);
        }
      });
  };

  return (
    <div>
      <Form
        methods={methods}
        name="login-email-form"
        onSubmit={onSubmitLoginForm}
        classNames="grid gap-4"
      >
        <InputText name="email" />
        <InputPassword name="password" />
        {error}
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default LoginEmailForm;
