import "./Style.scss";

import React from "react";
import { useFormContext } from "react-hook-form";

export interface InputTypeProps {
  name: string;
  label?: string;
  placeholder?: string;
}

const InputText = (props: InputTypeProps) => {
  const { name, label } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods
  const error = name
    .split(".")
    .reduce((acc, part) => (acc as any)?.[part], errors);

  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <input
        className="bg-gray-50 w-full border font-medium border-gray-300 text-gray-900 rounded-lg p-2.5"
        type="text"
        {...props}
        {...register(name)}
      />
      {error && (
        <p className="text-red-500 text-xs mt-2">
          {(error as any).message?.toString()}
        </p>
      )}
    </div>
  );
};

export default InputText;
