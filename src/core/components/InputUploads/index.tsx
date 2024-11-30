'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { uploadFiles } from '@/service/file';

import Style from './index.module.scss';

export interface InputUploadProps {
  name: string;
  label?: string;
  enabledUpload?: boolean;
  folderName?: string;
  disabled?: boolean;
  accepts?: string[]; // Optional prop as an array of strings
}

const InputUpload: React.FC<InputUploadProps> = (props) => {
  const { name, accepts = ['image/*'], folderName, enabledUpload = true, disabled = false } = props;
  const {
    register,
    setValue,
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

  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', file.name);

      if (folderName) {
        formData.append('folderName', folderName);
      }

      if (enabledUpload) {
        uploadFiles(formData)
          .then((response) => {
            const { url } = response;
            setValue(name, url);
          })
          .catch((err) => {
            alert(err?.message ?? 'Something went wrong');
          });
      }
    }

    return () => {};
  }, [file]);

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
        disabled={disabled}
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
