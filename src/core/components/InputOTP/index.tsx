import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export interface InputOTPTypeProps {
  name: string;
  label?: string;
  length?: number;
}

const InputOTP: React.FC<InputOTPTypeProps> = (props) => {
  const { name } = props;
  const {
    register,
    formState: { errors },
    setValue, // Update form value
  } = useFormContext(); // retrieve all hook methods
  register(name);

  const { length = 4 } = props;
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Sate
  const [list, setOTPList] = useState(Array(length).fill(''));

  // Auto-focus on the first input when the component mounts
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...list];
    newOtp[index] = value.slice(-1); // Only allow the last character
    setOTPList(newOtp);

    // Focus the next input automatically
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    const otpValue = newOtp.join('');
    setValue(name, otpValue);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];

    // Only allow numbers (0-9) and control keys (backspace, arrows, etc.)
    if (!allowedKeys.includes(e.key) && (e.key < '0' || e.key > '9')) {
      return;
    }

    // Move focus to the previous input when backspace is pressed
    if (e.key === 'Backspace' && !list[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    inputsRef.current[index]?.select(); // Select the current value when the input is focused
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData('Text');
    const numericPastedValue = clipboardData
      .replace(/\D/g, '')
      .slice(0, length); // Keep only numbers and limit length

    // Split numeric data into array
    const newOtp = numericPastedValue.split('').slice(0, length);

    // Ensure array is 'length'
    setOTPList([...newOtp, ...Array(length - newOtp.length).fill('')]);

    const otpValue = newOtp.join('');
    setValue(name, otpValue);

    // Automatically focus the last filled input
    const lastInputIndex = newOtp.length - 1;
    inputsRef.current[lastInputIndex]?.focus();
  };

  const error = name
    .split('.')
    .reduce((acc, part) => (acc as any)?.[part], errors);

  return (
    <div>
      <div className="w-full flex gap-4 justify-between">
        {list.map((_, idx) => {
          return (
            <div key={idx}>
              <input
                type="text"
                value={list[idx]}
                ref={(el) => {
                  inputsRef.current[idx] = el;
                }}
                inputMode="numeric" // Ensure numeric input mode
                autoComplete="one-time-code" // Enable auto-fill support for OTP
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onPaste={handlePaste} // Handle paste event
                onFocus={() => handleFocus(idx)}
                className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          );
        })}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-2">
          {(error as any).message?.toString()}
        </p>
      )}
    </div>
  );
};

export default InputOTP;
