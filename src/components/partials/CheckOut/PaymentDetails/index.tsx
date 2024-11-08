import React from 'react';

import CustomerInformation from '../CustomerInformation';
import SelectPaymentMethod from '../PaymentMethod';

const PaymentDetail = () => {
  return (
    <div className="flex flex-col gap-4 max-md:mb-4 mb-10">
      <CustomerInformation />
      <SelectPaymentMethod />
    </div>
  );
};

export default PaymentDetail;
