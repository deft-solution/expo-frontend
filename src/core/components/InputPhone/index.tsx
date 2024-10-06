'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import 'intl-tel-input/build/css/intlTelInput.css';
import Style from './index.module.scss';
import classNames from 'classnames';
import intlTelInput from 'intl-tel-input';

export interface InputPhoneTypProps {
  label?: string;
  isString?: boolean;
  name: string;
  classNames?: string;
  nameCountry?: string;
  placeholder?: string;
}

const InputPhoneComponent: React.FC<InputPhoneTypProps> = (props) => {
  const { label, name, placeholder, nameCountry } = props;
  //
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const intlTelInputInstance = useRef<any>(null); // Create a ref to hold the intlTelInput instance
  const [countryCode, setCountryCode] = useState<number>(855);
  const [phoneNumber, setPhoneNumber] = useState<number | null>(null);

  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods
  register(name);

  useEffect(() => {
    if (nameCountry) {
      register(nameCountry);
    }
  }, [nameCountry, register]);

  // Set the country code in the form
  useEffect(() => {
    if (nameCountry) {
      setValue(nameCountry, countryCode); // Update country code in the form
    }
  }, [nameCountry, countryCode, setValue]);

  const error = name.split('.').reduce((acc, part) => (acc as any)?.[part], errors);
  const ctxClass = classNames('bg-gray-50 w-full border rounded-md border-gray-300', {
    'bg-red-50 border-red-500 text-red-900': error,
  });

  useEffect(() => {
    if (phoneInputRef.current) {
      intlTelInputInstance.current = intlTelInput(phoneInputRef.current, {
        initialCountry: 'kh',
      });
      phoneInputRef.current.addEventListener('change', onChangeInput);
      phoneInputRef.current.addEventListener('countrychange', onChangeCountryCode);
    }

    // Cleanup function to remove event listener
    return () => {
      if (intlTelInputInstance.current) {
        intlTelInputInstance.current.destroy(); // Ensure proper destruction of instance
      }
    };
  }, []);

  const onChangeInput = () => {
    const phoneNumber = phoneInputRef.current?.value;
    setPhoneNumber(Number(phoneNumber));
    setValue(name, phoneNumber);
  };

  // Handle input changes
  const onChangeCountryCode = () => {
    const country = (intlTelInputInstance.current as any).getSelectedCountryData(); // Use instance to get number
    setCountryCode(country.dialCode);
  };

  return (
    <div className={Style['wrapper']}>
      {label && <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>}
      <input
        id="phone"
        type="tel"
        ref={phoneInputRef}
        placeholder={placeholder}
        className={classNames(ctxClass, Style['input-phone-number'])}
      />
      {error && <p className="text-red-500 text-xs mt-2">{(error as any).message?.toString()}</p>}
    </div>
  );
};

export default InputPhoneComponent;
