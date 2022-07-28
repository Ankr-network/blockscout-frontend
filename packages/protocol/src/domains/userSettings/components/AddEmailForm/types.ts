export enum AddEmailFormContentState {
  ADD_EMAIL = 'ADD_FORM',
  CHANGE_EMAIL = 'CHANGE_EMAIL_FORM',
  SUCCESS = 'SUCCESS',
}

export enum AddEmailFormFields {
  email = 'email',
}

export interface IAddEmailFormData {
  [AddEmailFormFields.email]: string;
}

export type AddEmailFormErrors =
  | undefined
  | Partial<Record<AddEmailFormFields, string>>;
