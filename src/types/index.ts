export type AccountFormType = {
  account: string;
  password: string;
  userGroup?: string;
};

export type Rules = {
  account: {
    required: boolean;
    trigger: string;
    validator: (rule: any, value: string, callback: any) => void;
  };
  password: {
    required: boolean;
    trigger: string;
    validator: (rule: any, value: string, callback: any) => void;
  };
  userGroup?: {
    required: boolean;
    message: string;
    trigger: string;
  };
};

export type Breads = {
  path: string;
  title: string | unknown;
}[];

export type PasswordModifyForm = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type Data = {
  id: string;
  account: string;
  userGroup: string;
  date: string;
}[];
