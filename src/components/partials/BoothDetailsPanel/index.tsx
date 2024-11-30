import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { useBoothSelection } from '@/context/BoothSelectionContext';
import { formatNumberByCurrency } from '@/helper/format-number';
import Style from './index.module.scss';

interface TypeProps {
  eventId: string;
  isOpen?: boolean;
  onClose: () => void;
}

const BoothDetailPanel: React.FC<TypeProps> = ({ isOpen = false, onClose, eventId }) => {
  const router = useRouter();
  const { selectedBooths } = useBoothSelection();

  // If no booth is found, return nothing
  if (!selectedBooths.length) {
    return null;
  }
  const toggleOpen = classNames({
    [Style['open']]: isOpen,
    [Style['closed']]: !isOpen,
  });

  const handleCheckOut = () => {
    router.push(`/check-out?event=${eventId}`);
  };
  const booth = selectedBooths[selectedBooths.length - 1];

  return (
    <>
      <div className={classNames(Style.overlay, toggleOpen)}></div>
      <div className={classNames(toggleOpen, Style['booth-panel-wrapper'])}>
        <div className={Style.content}>
          <div className={Style['close-btn-wrapper']}>
            <button
              className={Style['close-btn']}
              onClick={onClose}
              aria-label="Close booth detail panel"
            >
              &times;
            </button>
          </div>

          <Image src="/assets/icons/booths.svg" alt="Booth Icon" width={191} height={195} />

          <div className="mt-8 flex flex-col gap-10">
            {/* Booth Name & Size */}
            <div>
              <h2 className={Style['booth-title']}>{booth.boothName}</h2>
              <div className="flex items-center gap-4">
                <Image
                  src="/assets/icons/booth-icons.svg"
                  alt="Booth Icon"
                  width={24}
                  height={24}
                />
                <div className={Style['title-size']}>
                  {booth.size} ({booth.boothName})
                </div>
              </div>
            </div>

            {/* Booth Type Description */}
            {booth.boothType?.description && (
              <div>
                <div className={Style['title-exhibition']}>Exhibition Stand Includes:</div>
                <div
                  className={`${Style['html-summary']} mt-4`}
                  dangerouslySetInnerHTML={{ __html: booth.boothType.description }}
                />
              </div>
            )}

            {/* Printing Quotation */}
            <div>
              <p>Would you like a quotation for printing stickers for your booth?</p>
              <div>Yes, I would like a quotation for sticker printing.</div>
            </div>
          </div>

          {/* Price and Checkout Button */}
          <div className="flex items-center max-md:flex-col justify-between gap-4 mt-auto">
            <div className="h-[58px] max-md:w-full flex flex-col justify-between">
              <div className={classNames('text-gray-500', Style['txt-price'])}>Price</div>
              <div className={Style['txt-amount']}>
                <span>{formatNumberByCurrency(booth.price, booth.boothType?.currency)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckOut}
              className="w-[175px] max-md:w-full ml-auto h-[58px] bg-black text-white"
              aria-label="Proceed to checkout"
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoothDetailPanel;
