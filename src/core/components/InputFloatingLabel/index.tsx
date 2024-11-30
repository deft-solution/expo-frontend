import classNames from 'classnames';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import Style from './index.module.scss';

export interface InputFloatingType {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  icons?: 'User' | 'Email' | 'Phone' | 'House' | 'Globe';
}

const iconMap: Record<string, string> = {
  User: Style['icons-user'],
  Email: Style['icons-email'],
  Phone: Style['icons-phone'],
  House: Style['icons-house'],
  Globe: Style['icons-globe'],
};

const InputFloatingLabel: React.FC<InputFloatingType> = (props) => {
  const { name, label, icons, placeholder, disabled } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods
  register(name);

  const error = name.split('.').reduce((acc, part) => (acc as any)?.[part], errors);

  const errorCtx = classNames({ [Style['error']]: error });

  return (
    <div className={Style['floating-label-input']}>
      {label && (
        <label htmlFor={name} className={classNames(Style['label'])}>
          {label}
        </label>
      )}
      <input
        id={name}
        disabled={disabled}
        className={classNames(errorCtx, iconMap[icons || ''], Style['input-floating'])}
        type="text"
        placeholder={placeholder}
        {...register(name)}
      />
    </div>
  );
};

export default InputFloatingLabel;
