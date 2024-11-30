import { useCheckout } from '@/context/CheckOutContext';
import { InputFloatingLabel, InputUpload } from '@Core';

const CustomerInformation = () => {
  const { submissionStatus } = useCheckout();

  return (
    <div className="flex flex-col gap-3">
      <div>Customer Information</div>

      <div className="border border-[#00000026] rounded-md p-4 grid gap-y-3">
        <div className="grid grid-cols-2 gap-4">
          <InputFloatingLabel
            name="firstName"
            icons="User"
            placeholder="First Name"
            disabled={submissionStatus}
          />
          <InputFloatingLabel
            name="lastName"
            icons="User"
            placeholder="Last Name"
            disabled={submissionStatus}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InputFloatingLabel
            name="phoneNumber"
            icons="Phone"
            placeholder="Phone Number"
            disabled={submissionStatus}
          />
          <InputFloatingLabel
            name="email"
            icons="Email"
            placeholder="Company Email"
            disabled={submissionStatus}
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <InputFloatingLabel
            name="companyName"
            icons="House"
            placeholder="Company Name"
            disabled={submissionStatus}
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <InputFloatingLabel
            name="nationality"
            icons="Globe"
            placeholder="Nationality"
            disabled={submissionStatus}
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <InputUpload
            name="patentUrl"
            folderName="patents"
            label="Attach company patents"
            disabled={submissionStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerInformation;
