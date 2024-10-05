'use client';
import 'ckeditor5/ckeditor5.css';

import React, { useEffect, useRef, useState } from 'react';
import { ClassicEditor } from 'ckeditor5';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useFormContext } from 'react-hook-form';
import 'ckeditor5/ckeditor5.css';
import { CK_PLUGINS, CK_TOOLBAR_ITEM } from './config';

export interface CkEditorComponentProps {
  name: string;
  label?: string;
}

const CkEditorComponent: React.FC<CkEditorComponentProps> = (props) => {
  const { name, label } = props;
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const defaultValue = watch(name);

  useEffect(() => {
    // Register the form input with React Hook Form
    register(name);
  }, [name, register]);

  const error = name
    .split('.')
    .reduce((acc, part) => (acc as any)?.[part], errors);

  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <CKEditor
        editor={ClassicEditor}
        data={defaultValue || ''} // Set the default value here
        onChange={(_, editor) => {
          const data = editor.getData();
          setValue(name, data); // Set the value in react-hook-form
        }}
        config={{
          plugins: CK_PLUGINS,
          toolbar: { items: CK_TOOLBAR_ITEM },
          fontSize: {
            options: [9, 11, 13, 'default', 17, 19, 21, 25],
            supportAllValues: true,
          },
        }}
      />
      {error && (
        <p className="text-red-500 text-xs mt-2">
          {(error as any).message?.toString()}
        </p>
      )}
    </div>
  );
};

export default CkEditorComponent;
