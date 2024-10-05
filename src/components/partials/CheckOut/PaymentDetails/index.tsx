import React from 'react';

import CustomerInformation from '../CustomerInformation';
import SelectPaymentMethod from '../PaymentMethod';

const PaymentDetail = () => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <CustomerInformation />
      <SelectPaymentMethod />
    </div>
  );
};

export default PaymentDetail;
