import { lazy } from 'react';

export { default as InputText } from './InputText';
export type { InputTypeProps } from './InputText';

export { default as InputPassword } from './InputPassword';
export type { InputPasswordTypeProps } from './InputPassword';

export { default as TextArea } from './TextArea';
export type { TextAreaTypeProps } from './TextArea';

export { default as Datepicker } from './Datepicker';
export type { DatePickerTypeProps } from './Datepicker';

export { default as Checkbox } from './Checkbox';
export type { CheckboxTypeProps } from './Checkbox';

export { default as Pagination } from './Pagination';
export type { PaginationTypeProps } from './Pagination';

export { default as InputTag } from './InputTag';
export type { InputTagsTypeProps } from './InputTag';

export { default as Upload } from './Uploads';
export type { UploadTypesProps } from './Uploads';

export { default as Dropdown } from './Dropdown';
export type { DropdownTypeProps } from './Dropdown';

export { default as Form } from './Form';
export type { FormTypeProps } from './Form';

export { default as Button } from './Buttons';
export type { ButtonTypeProps } from './Buttons';

export { default as InputOTP } from './InputOTP';
export type { InputOTPTypeProps } from './InputOTP';

export { default as InputFloatingLabel } from './InputFloatingLabel';
export type { InputFloatingType } from './InputFloatingLabel';

export { default as Modal } from './Modals';
export type { ModalTypeProps } from './Modals';

export { default as InputUpload } from './InputUploads';
export type { InputUploadProps } from './InputUploads';

export { default as InputPhone } from './InputPhone';
export type { InputPhoneTypProps } from './InputPhone';

export { default as QRCode } from './QRCode';
export type { QRCodeTypeProps } from './QRCode';

const LazyRichTextCK = lazy(() => import('./RichTextCK'));
export { LazyRichTextCK as RichTextCK };
export type { CkEditorComponentProps } from './RichTextCK';

export { default as ProfileSidebar } from './ProfileSidebar';
