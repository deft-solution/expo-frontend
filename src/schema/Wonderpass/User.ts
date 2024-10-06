export interface UserLiveProfileMe {
  data: UserLiveProfileMeData;
}

export interface UserLiveProfileMeData {
  phone: Phone;
  address: Address;
  isMain: boolean;
  role: string;
  email?: string;
  isSystemUser: boolean;
  _id: string;
  avatar: string;
  dob: string;
  documents: Document[];
  firstName: string;
  gender: number;
  lastLogin: string;
  lastName: string;
  externalUuid: string;
}

export interface Address {
  city: string;
  sangkat: string;
}

export interface Phone {
  phoneCode: string;
  phoneNumber: string;
}
