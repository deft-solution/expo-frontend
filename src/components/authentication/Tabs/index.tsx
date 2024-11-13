import React, { useState } from 'react';
import Style from './index.module.scss';
import classNames from 'classnames';

export type TypeAuthTabs = 'EMAIL' | 'PHONE_NUMBER';

interface TypeTabProps {
  onChangeTab?: (param: TypeAuthTabs) => void;
}

const AuthenticationTab: React.FC<TypeTabProps> = (props) => {
  const [loginType, setType] = useState<TypeAuthTabs>('PHONE_NUMBER');

  const activeCtx = (type: TypeAuthTabs) =>
    classNames('p-2 cursor-pointer rounded-md', {
      ['bg-white text-secondary-blue font-bold']: type === loginType,
    });

  const onClickItem = (e: React.MouseEvent<HTMLDivElement>) => {
    const { onChangeTab } = props;
    const target = e.target as HTMLButtonElement; // Type assertion
    const loginType = target.id as TypeAuthTabs;
    setType(loginType);

    if (onChangeTab) {
      onChangeTab(loginType);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-4 text-center bg-[#f5f5f5] rounded-md">
      <div
        id="PHONE_NUMBER"
        onClick={onClickItem}
        className={classNames(activeCtx('PHONE_NUMBER'))}
      >
        Phone Number
      </div>
    </div>
  );
};

export default AuthenticationTab;
