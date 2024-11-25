import classNames from 'classnames';
import Image from 'next/image';
import React, { useState } from 'react';

import { useBoothSelection } from '@/context/BoothSelectionContext';
import { usePaymentContext } from '@/context/PaymentOptionsContext';
import { triggerDownload } from '@/helper';
import { formatDisplayDate } from '@/helper/format-date';
import { CreateOrderResponse } from '@/models/Order';
import { CalculatedDataResponse } from '@/models/Payment';
import { downloadOrderPDF } from '@/service/order';

import { formatNumberUSD } from '../../../../helper/format-number';
import Style from './index.module.scss';

export interface TypePropsPaymentInfo {
  paymentCalculated: CalculatedDataResponse | null;
  paymentRef: string | null;
  option?: string | null;
  orderResponse: CreateOrderResponse | null;
}

const CheckOutSuccess: React.FC<TypePropsPaymentInfo> = (props) => {
  const { paymentCalculated: payment, paymentRef, option, orderResponse } = props;
  const data = payment?.data;
  const total = data?.orderDetails.total ?? 0;
  const { selectedBooth: booth } = useBoothSelection();

  const [isDownloading, setIsDownloading] = useState(false);

  const { paymentOptions } = usePaymentContext();
  const paymentMethod = paymentOptions.find(({ key }) => option === key);

  const onClickDownloadPDF = () => {
    setIsDownloading(true);
    downloadOrderPDF()
      .then((blob) => {
        triggerDownload(blob, `${paymentRef}.pdf`);
      })
      .catch((err) => {
        if (err?.message) {
          alert(err.message);
        }
      })
      .finally(() => {
        setIsDownloading(false);
      });
  };

  return (
    <>
      <div>
        <div className="rounded-md bg-[#F6F7FA] p-4">
          <div className="text-2xl font-bold">{booth?.boothName}</div>
          <div className="mt-4">
            <div className="flex items-center gap-2 text-[#33A16E]">
              <Image
                src="/assets/icons/booth-icons.svg"
                alt="/assets/icons/booth-icons.svg"
                width={24}
                height={24}
              />
              <div>{booth?.size}</div>
            </div>
            {booth?.boothType?.description && (
              <div
                className={`mt-4 ${Style['html-summary']}`}
                dangerouslySetInnerHTML={{ __html: booth.boothType.description }}
              ></div>
            )}
          </div>
          {/* <div className="border-t mt-9 pt-4">
            <div className={classNames('pl-6', Style['green-check'])}>
              Yes, I would like a quotation for sticker printing.
            </div>f
          </div> */}
        </div>
        {/* <div className="grid grid-cols-2 gap-4 mt-4">
          <Button onClick={onClickDownloadPDF} disabled={isDownloading} type="button" theme="light">
            {isDownloading ? 'Downloading' : 'Get PDF Receipt'}
          </Button>
          <Button type="button" theme="success">
            Back to Home
          </Button>
        </div> */}
      </div>
      <div className="w-full h-max bg-[#F6F7FA] rounded-md">
        <div className="p-4 content flex flex-col gap-4">
          <section className="text-center border-b border-[#00000040] pb-4">
            <div>
              <div>Total Amount</div>
              <h2 className="text-3xl mt-2 font-medium text-[#33A16E]">{formatNumberUSD(total)}</h2>
            </div>
            <div className="mt-4 flex items-center gap-4 justify-center color-[#999a9c]">
              <Image
                src="/assets/icons/secure.svg"
                alt="/assets/icons/secure.svg"
                width={19}
                height={19}
              />
              <span className="text-[#7b7c7d]">Secure Payment</span>
            </div>
          </section>
          <section>
            <div className="font-bold text-[#7b7c7d]">Payment Details</div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="text-[#7b7c7d]">Ref Number</div>
                <div>{paymentRef}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[#7b7c7d]">Merchant Name</div>
                <div>Ministry of Commerce</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[#7b7c7d]">Payment Method</div>
                <div>{paymentMethod?.title}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[#7b7c7d]">Payment Status</div>
                <div className={classNames('pl-6', Style['green-check'], Style['small'])}>
                  Success
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[#7b7c7d]">Payment Time</div>
                <div>
                  {orderResponse?.completedAt
                    ? formatDisplayDate(orderResponse?.completedAt, 'DD MMM YYYY, HH:mm')
                    : 'N/A'}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[#7b7c7d]">Sender</div>
                <div>
                  {[orderResponse?.firstName, orderResponse?.lastName].filter(Boolean).join(' ') ||
                    'Name not available'}
                </div>
              </div>
            </div>
          </section>
          <section className=" border-t border-[#00000040] pt-4">
            <div className="flex items-center justify-between">
              <div className="text-xl font-medium">Total</div>
              <div className="font-medium text-[#33A16E] text-xl">{formatNumberUSD(total)}</div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CheckOutSuccess;
