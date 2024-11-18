import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { useBoothSelection } from '@/context/BoothSelectionContext';
import { formatNumber } from '@/helper/format-number';

import Style from './index.module.scss';

interface TypeProps {
  id: string;
  isOpen?: boolean;
  onClose: () => void;
}

const BoothDetailPanel: React.FC<TypeProps> = (props) => {
  const { isOpen = false, onClose, id } = props;
  const router = useRouter();

  const { selectedBooth: booth } = useBoothSelection();
  const toggleOpen = classNames({
    [Style['open']]: isOpen,
    [Style['closed']]: !isOpen,
  });

  const onClickCheckOut = () => {
    router.push(`/check-out?event=${id}`);
  };

  return (
    <>
      <div className={classNames(Style.overlay, toggleOpen)}></div>
      <div className={classNames(toggleOpen, Style['booth-panel-wrapper'])}>
        {booth && (
          <div className={Style['content']}>
            <div className={Style['close-btn-wrapper']}>
              <div className={Style['close-btn']} onClick={onClose}></div>
            </div>
            <Image
              src="/assets/icons/booths.svg"
              alt="/assets/icons/booths.svg"
              width={191}
              height={195}
            />
            <div className="mt-4 flex flex-col gap-10">
              <div>
                <h2 className={Style['booth-title']}>{booth.boothType?.name}</h2>
                <div className="flex items-center gap-4">
                  <Image
                    src="/assets/icons/booth-icons.svg"
                    alt="/assets/icons/booth-icons.svg"
                    width={24}
                    height={24}
                  />
                  <div className={Style['title-size']}>
                    {booth.size} ({booth.boothNumber})
                  </div>
                </div>
              </div>
              {booth.description && (
                <div>
                  <div className={Style['title-exhibition']}>Exhibition Stand Includes:</div>
                  <div
                    className={`${Style['html-summary']} mt-4`}
                    dangerouslySetInnerHTML={{ __html: booth.description }}
                  ></div>
                </div>
              )}
              <div>
                <p>Would you like a quotation for printing stickers for your booth?</p>
                <div>Yes, I would like a quotation for sticker printing.</div>
              </div>
            </div>
            <div className="flex items-center max-md:flex-col justify-between gap-4 mt-4">
              <div className="h-[58px] max-md:w-full flex flex-col justify-between">
                <div className={classNames('text-gray-500', Style['txt-price'])}>Price</div>
                <div className={Style['txt-amount']}>
                  <span className="ml-3">{formatNumber(booth.price)}</span>
                </div>
              </div>
              <button
                onClick={onClickCheckOut}
                className="w-[175px] max-md:w-full h-[58px] bg-black text-white"
              >
                Check Out
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BoothDetailPanel;
