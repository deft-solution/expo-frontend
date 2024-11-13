import React, { useState } from 'react';

import LoginEmailForm from './Login/EmailForm';
import PhoneNumberForm from './Login/PhoneNumberForm';
import AuthenticationTab, { TypeAuthTabs } from './Tabs';

const AuthenticationForm = () => {
  const [formType, setFormType] = useState<TypeAuthTabs>('PHONE_NUMBER');

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <h2 className="text-secondary-blue font-bold text-3xl">Welcome Back</h2>
        <p>Hello, Welcome back to Live.</p>
      </div>
      <AuthenticationTab onChangeTab={setFormType} />
      {formType === 'EMAIL' && <LoginEmailForm />}
      {formType === 'PHONE_NUMBER' && <PhoneNumberForm />}
    </div>
  );
};

export default AuthenticationForm;
