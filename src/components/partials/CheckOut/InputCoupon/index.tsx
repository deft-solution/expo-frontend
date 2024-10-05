import React from 'react';

const InputCoupon = () => {
  return (
    <div className="relative">
      <input
        className="coupon-input w-full bg-[#F6F7FA] text-[#7b7c7d] focus:outline-none"
        type="text"
        placeholder="Enter Voucher Code"
      />
      <span className="text-[#33A16E] cursor-pointer hover:opacity-60 absolute right-0">
        Apply
      </span>
    </div>
  );
};

export default InputCoupon;
