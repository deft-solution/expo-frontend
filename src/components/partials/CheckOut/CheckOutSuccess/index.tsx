import classNames from 'classnames';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import React, { useState } from 'react';

import { useBoothSelection } from '@/context/BoothSelectionContext';
import { triggerDownload } from '@/helper';
import { formatDisplayDate } from '@/helper/format-date';
import { IVerifyTransactionSucess } from '@/models/Payment';
import { downloadOrderPDF } from '@/service/order';

import Button from '../../../../core/components/Buttons/index';
import { formatNumberByCurrency } from '../../../../helper/format-number';
import Style from './index.module.scss';

export interface TypePropsPaymentInfo {
  orderResponse: IVerifyTransactionSucess | null;
}
const CheckOutSuccess: React.FC<TypePropsPaymentInfo> = (props) => {
  const { orderResponse } = props;
  const { selectedBooths } = useBoothSelection();
  const [isDownloading, setIsDownloading] = useState(false);

  const onClickDownloadPDF = () => {
    if (!orderResponse) {
      return;
    }

    setIsDownloading(true);
    downloadOrderPDF()
      .then((blob) => {
        triggerDownload(blob, `${orderResponse.transactionNo}.pdf`);
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
        {/* Booth Details */}
        {selectedBooths?.length ? (
          selectedBooths.map((booth, index) => {
            const sanitizedDescription = booth?.boothType?.description
              ? DOMPurify.sanitize(booth.boothType.description)
              : '';

            return (
              <div key={booth.id || index} className="rounded-md bg-[#F6F7FA] p-4 mb-4">
                <div className="text-2xl font-bold">{booth?.boothName || 'N/A'}</div>
                <div className="mt-4">
                  <div className="border-b pb-4 flex items-center gap-2 text-[#33A16E]">
                    <Image
                      src="/assets/icons/booth-icons.svg"
                      alt="Booth Icon"
                      width={24}
                      height={24}
                    />
                    <div>
                      <div>{booth?.size || 'N/A'}</div>
                    </div>
                    <div className="font-bold text-[#000000] ml-4">
                      {booth?.boothType?.name || 'N/A'}
                    </div>
                  </div>
                  {booth?.boothType?.description && (
                    <div className="mt-4">
                      <div className={Style['title-exhibition']}>Exhibition Stand Includes:</div>
                      <div
                        className={`mt-4 ${Style['html-summary']}`}
                        dangerouslySetInnerHTML={{
                          __html: sanitizedDescription,
                        }}
                      ></div>
                    </div>
                  )}
                </div>
                <div className="border-t mt-9 pt-4">
                  <div className={classNames('pl-6', Style['green-check'])}>
                    Yes, I would like a quotation for sticker printing.
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No booths selected.</div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button type="button" theme="success">
            Back to Home
          </Button>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="w-full h-max bg-[#F6F7FA] rounded-md">
        <div className="p-4 content flex flex-col gap-4">
          {/* Total Amount */}
          <section className="text-center border-b border-[#00000040] pb-4">
            <div>
              <div>Total Amount</div>
              <h2 className="text-3xl mt-2 font-medium text-[#33A16E]">
                {formatNumberByCurrency(orderResponse?.amount || 0, orderResponse?.currency)}
              </h2>
            </div>
            <div className="mt-4 flex items-center gap-4 justify-center">
              <Image src="/assets/icons/secure.svg" alt="Secure Payment" width={19} height={19} />
              <span className="text-[#7b7c7d]">Secure Payment</span>
            </div>
          </section>

          {/* Payment Details */}
          <section>
            <div className="font-bold text-[#7b7c7d]">Payment Details</div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="text-[#7b7c7d]">Ref Number</div>
                <div>{orderResponse?.transactionNo ?? 'N/A'}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[#7b7c7d]">Merchant Name</div>
                <div>Ministry of Commerce</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[#7b7c7d]">Payment Method</div>
                <div>{'N/A'}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[#7b7c7d]">Payment Status</div>
                <div className={classNames('pl-6', Style['green-check'], Style['small'])}>
                  Success
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[#7b7c7d']">Payment Time</div>
                <div>
                  {orderResponse?.paymentTimestamp
                    ? formatDisplayDate(orderResponse?.paymentTimestamp, 'DD MMM YYYY, HH:mm')
                    : 'N/A'}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[#7b7c7d]">Sender</div>
                <div>{orderResponse?.sender || 'Name not available'}</div>
              </div>
            </div>
          </section>

          {/* Total Section */}
          <section className="border-t border-[#00000040] pt-4">
            <div className="flex items-center justify-between">
              <div className="text-xl font-medium">Total</div>
              <div className="font-medium text-[#33A16E] text-xl">
                {formatNumberByCurrency(orderResponse?.amount || 0, orderResponse?.currency)}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CheckOutSuccess;
