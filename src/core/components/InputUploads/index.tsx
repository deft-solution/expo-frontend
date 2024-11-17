'use client';
import React, { useRef, useState } from 'react';

import Style from './index.module.scss';
import { useFormContext } from 'react-hook-form';

export interface InputUploadProps {
  name: string;
  label?: string;
  folderName?: string;
  accepts?: string[]; // Optional prop as an array of strings
}

const InputUpload: React.FC<InputUploadProps> = (props) => {
  const { name, accepts = ['image/*'] } = props;
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  register(name);

  const [file, setFile] = useState<File | null>(null);
  const [label, setLabel] = useState<string | null>(props.label || null);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the file input

  // Function to trigger the file input click
  const handleFileInputClick = () => {
    fileInputRef.current?.click(); // Trigger click on the input
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length) {
      const file = files[0];
      setLabel(file.name);
      setFile(file);
      setValue(name, file);
    }
  };

  const error = name.split('.').reduce((acc, part) => (acc as any)?.[part], errors);

  return (
    <>
      <div>
        <div className="flex items-center justify-between border-b border-slate-300 h-[48px]">
          {label && (
            <label className={Style['icons-upload']} htmlFor={name}>
              {label}
            </label>
          )}
          <div onClick={handleFileInputClick} className="cursor-pointer text-[#33A16E]">
            Upload Attachment
          </div>
        </div>
        {error && <p className="text-red-500 text-xs mt-2">{(error as any).message?.toString()}</p>}
      </div>

      <input
        id={name}
        type="file"
        multiple={false}
        onChange={onSelectFile}
        accept={accepts.join(',')}
        className="hidden"
        ref={fileInputRef} // Attach the ref to the input
      />
    </>
  );
};

export default InputUpload;
