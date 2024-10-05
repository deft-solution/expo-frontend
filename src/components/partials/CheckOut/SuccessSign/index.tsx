import React from 'react';
import Style from './index.module.scss';

export interface SuccessSignTypeProps {
  className?: string;
}

const SuccessSign: React.FC<SuccessSignTypeProps> = (props) => {
  const { className } = props;

  return (
    <div className={className}>
      <div className={Style['success-sign']}></div>
      <div className="text-center">
        <div className="text-2xl font-medium">Payment Success!</div>
        <div className="text-xl mt-2 text-[#474747]">
          Your payment has been successfully done.
        </div>
      </div>
    </div>
  );
};

export default SuccessSign;
