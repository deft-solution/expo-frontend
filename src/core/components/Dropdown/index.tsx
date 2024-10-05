'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export interface DropdownTypeProps {
  name: string;
  label?: string;
  items?: { id: string; name: string }[];
}

const DropdownComponent = (props: DropdownTypeProps) => {
  const { name, label, items = [] } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();
  register(name);
  const error = name
    .split('.')
    .reduce((acc, part) => (acc as any)?.[part], errors);

  return (
    <div>
      {label && (
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <select
        id={name}
        defaultValue={0}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...register(name)}
      >
        {items.map((row) => (
          <option value={row.id} key={row.id}>
            {row.name}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-xs mt-2">
          {(error as any).message?.toString()}
        </p>
      )}
    </div>
  );
};

export default DropdownComponent;
