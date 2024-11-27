'use clients';

import Image from 'next/image';
import { QRCodeCanvas } from 'qrcode.react';
import React, { useEffect, useState } from 'react';

import { formatNumber } from '@/helper/format-number';

import { TypeCurrency } from '../../../constants/Currency';
import Style from './index.module.scss';

export interface QRCodeTypeProps {
  value: string;
  amount: number;
  currency: TypeCurrency;
  onCountDownFinished?: () => void;
}

const QRCodeComponent: React.FC<QRCodeTypeProps> = (props) => {
  const { amount, currency, onCountDownFinished } = props;
  const [timeLeft, setTimeLeft] = useState(3 * 60); // 3 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onCountDownFinished) {
        onCountDownFinished();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onCountDownFinished]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={Style['wrapper-container']}>
      <Image
        src="/assets/icons/payments/khqr-header.svg"
        alt="/assets/icons/payments/khqr-header.svg"
        width={255}
        height={40}
      />
      <div className={Style['payment-details']}>
        <div className="text-base font-bold">NIMEDH BUREAU CO., LTD.</div>
        <h4 className="mt-4">
          <span className="font-black">{formatNumber(amount)}</span>
          <span className="ml-3">{currency}</span>
        </h4>
      </div>
      <div className="p-[25px] w-full flex justify-center">
        <QRCodeCanvas
          width="205px"
          height="205px"
          className="!h-[205px] !w-[205px]"
          value={props.value}
        />
      </div>
      <div className={Style['countdown-timer']}></div>

      <h4 className={Style['text-timer']}>
        Time Out: <span>{formatTime(timeLeft)}</span>
      </h4>
    </div>
  );
};

export default QRCodeComponent;
