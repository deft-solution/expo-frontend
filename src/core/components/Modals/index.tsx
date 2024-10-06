import React from 'react';

import Style from './index.module.scss';
import classNames from 'classnames';
import useClickOutside from '@/core/hooks/useClickOutside';

export interface ModalTypeProps {
  visible?: boolean;
  onClickOutSide?: () => void;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const ModalComponent = (props: ModalTypeProps) => {
  const { children, className, contentClassName, visible, onClickOutSide } = props;
  const modalRef = useClickOutside<HTMLDivElement>({ onClickOutSide });

  if (!visible) {
    return <></>;
  }

  return (
    <div className={classNames(className, Style['overlay-wrapper'])}>
      <div ref={modalRef} className={classNames(contentClassName, Style['overlay-content'])}>
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;
