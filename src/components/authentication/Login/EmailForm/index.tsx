import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { ILoginEmailParam, LoginEmailWonderPassSchema } from '@/schema/Wonderpass/Authentication';
import { Button, Form, InputPassword, InputText } from '@Core';
import { yupResolver } from '@hookform/resolvers/yup';

const LoginEmailForm = () => {
  const [error] = useState<any>();
  const methods = useForm({ resolver: yupResolver(LoginEmailWonderPassSchema) });

  const onSubmitLoginForm = (data: ILoginEmailParam) => {
    console.log(data);
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
