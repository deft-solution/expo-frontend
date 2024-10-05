import React from 'react';

import { InputFloatingLabel, InputUpload } from '@Core';

const CustomerInformation = () => {
  return (
    <div className="flex flex-col gap-3 ">
      <div>Customer Information</div>

      <div className="border border-[#00000026] rounded-md p-4 grid gap-y-3">
        <div className="grid grid-cols-2 gap-4">
          <InputFloatingLabel
            name="firstName"
            icons="User"
            placeholder="First Name"
          />
          <InputFloatingLabel
            icons="User"
            name="lastName"
            placeholder="Last Name"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InputFloatingLabel
            name="phoneNumber"
            icons="Phone"
            placeholder="Phone Number"
          />
          <InputFloatingLabel icons="Email" name="email" placeholder="Email" />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <InputFloatingLabel
            name="companyName"
            icons="House"
            placeholder="Company Name"
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <InputFloatingLabel
            name="nationality"
            icons="Globe"
            placeholder="Nationality"
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <InputUpload name="companyName" label="Attach company patents" />
        </div>
      </div>
    </div>
  );
};

export default CustomerInformation;
