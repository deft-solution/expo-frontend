import './style.scss';

import classNames from 'classnames';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export interface InputTypeProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const InputText = (props: InputTypeProps) => {
  const { name, label, disabled, placeholder } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods

  const error = name.split('.').reduce((acc, part) => (acc as any)?.[part], errors);

  const ctxClass = classNames({
    'bg-red-50 border border-red-500 text-red-900 placeholder-red-700': error,
    'bg-gray-50 border-gray-300 text-gray-900': !error,
  });

  return (
    <div>
      {label && <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>}
      <input
        className={classNames(ctxClass, 'w-full border font-medium  rounded-lg p-2.5')}
        type="text"
        disabled={disabled}
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <p className="text-red-500 text-xs mt-2">{(error as any).message?.toString()}</p>}
    </div>
  );
};

export default InputText;
