'use client';
import classNames from 'classnames';
import React, { useState } from 'react';

import Style from './index.module.scss';

type CheckOutStep = 'SELECT-BOOTH' | 'PAYMENT' | 'COMPLETED';

const PaymentStep = () => {
  const [step, setStep] = useState<CheckOutStep[]>(['SELECT-BOOTH', 'PAYMENT']);

  return (
    <div className="border-gray-200 border-b">
      <div className="container mx-auto max-w-[900px] p-8">
        <div className="flex justify-around items-start max-md:flex-col max-md:pl-[100px] gap-y-[40px] flex-wrap">
          <div
            className={classNames(Style['step-item'], Style['step-one'], {
              [Style['step-completed']]: step.includes('SELECT-BOOTH'),
            })}
          >
            Select booth type
          </div>
          <div
            className={classNames(Style['step-item'], Style['step-two'], {
              [Style['step-completed']]: step.includes('PAYMENT'),
            })}
          >
            Payment Details
          </div>
          <div
            className={classNames(Style['step-item'], Style['step-three'], {
              [Style['step-completed']]: step.includes('COMPLETED'),
            })}
          >
            Completed
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
