import { IEventBoothForm, IEventUploadBooth } from '@/schema/Event';
import { uploadBoothTemplate } from '@/service/booth';
import { Button, Form, InputUpload } from '@Core';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface UploadBoothTypeProps {
  onClosed?: () => void;
}

const UploadBoothForm: React.FC<UploadBoothTypeProps> = (props) => {
  const { onClosed } = props;
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm({ resolver: yupResolver(IEventUploadBooth) });

  const onSubmitForm = (formValue: IEventBoothForm) => {
    const file = formValue.file;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);

    setIsLoading(true);

    uploadBoothTemplate(formData)
      .then(() => {
        setIsLoading(false);
        alert('Uploaded Excel Successfully.');

        if (onClosed) {
          onClosed();
        }
      })
      .catch((err) => {
        const message = err.message ?? 'Something Went Wrong.';
        alert(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h2 className="text-xl font-bold"> Upload Booth Template Form</h2>
      <Form onSubmit={onSubmitForm} classNames="grid gap-4 mt-4" methods={methods}>
        <InputUpload name="file" accepts={['.xls', '.xlsx']} />
        <div className="flex justify-between">
          <Button theme="light" onClick={onClosed}>
            Close
          </Button>
          <Button disabled={isLoading} type="submit">
            {isLoading ? 'Pleased Wait' : 'Submit'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UploadBoothForm;
