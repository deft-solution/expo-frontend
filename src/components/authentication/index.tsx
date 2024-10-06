import React, { useState } from 'react';
import AuthenticationTab, { TypeAuthTabs } from './Tabs';
import LoginEmailForm from './Login/EmailForm';
import PhoneNumberForm from './Login/PhoneNumberForm';

const AuthenctionForm = () => {
  const [formType, setFormType] = useState<TypeAuthTabs>('EMAIL');

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

export default AuthenctionForm;
