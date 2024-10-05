import { Button } from '@Core';
import Image from 'next/image';
import React from 'react';
import Style from './index.module.scss';
import classNames from 'classnames';

const CheckOutSuccess = () => {
  return (
    <>
      <div>
        <div className="rounded-md bg-[#F6F7FA] p-4">
          <div className="text-2xl font-bold">Type A</div>
          <div className="mt-4">
            <div className="flex items-center gap-2 text-[#33A16E]">
              <Image
                src="/assets/icons/booth-icons.svg"
                alt="/assets/icons/booth-icons.svg"
                width={24}
                height={24}
              />
              <div>15m X 15m</div>
            </div>
            <ul className="mt-4 list-disc pl-4">
              <li>2x Bar Chairs</li>
              <li>1x Counter (Dimension 100x50x100cm)</li>
              <li>Electricity 1,5kw - 220 V power outlet</li>
              <li>1x Extension Cord</li>
              <li>2x clip lights</li>
              <li>2x Attendee Cards</li>
            </ul>
          </div>
          <div className="border-t mt-9 pt-4">
            <div className={classNames('pl-6', Style['green-check'])}>
              Yes, I would like a quotation for sticker printing.
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button theme="light">Get PDF Receipt</Button>
          <Button theme="success">Get PDF Receipt</Button>
        </div>
      </div>
      <div className="w-full h-max bg-[#F6F7FA] rounded-md">
        <div className="p-4 content flex flex-col gap-4">
          <section className="text-center border-b border-[#00000040] pb-4">
            <div>
              <div>Total Amount</div>
              <h2 className="text-3xl mt-2 font-medium text-[#33A16E]">
                KHR 1,800,000
              </h2>
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
                <div>#000085752257</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[#7b7c7d]">Ref Number</div>
                <div>Wonderpass Technology Co., LTD.</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[#7b7c7d]">Payment Method</div>
                <div>WondeVISA ********* 3333</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[#7b7c7d]">Payment Status</div>
                <div
                  className={classNames(
                    'pl-6',
                    Style['green-check'],
                    Style['small']
                  )}
                >
                  Success
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[#7b7c7d]">Payment Time</div>
                <div>25-02-2023, 13:22:16</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[#7b7c7d]">Sender</div>
                <div>John Doe</div>
              </div>
            </div>
          </section>
          <section className=" border-t border-[#00000040] pt-4">
            <div className="flex items-center justify-between">
              <div className="text-xl font-medium">Total</div>
              <div className="font-medium text-[#33A16E] text-xl">
                KHR 1,815,000
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CheckOutSuccess;
