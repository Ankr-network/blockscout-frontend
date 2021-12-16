export enum AgreementFormFields {
  confirmed = 'confirmed',
}

export interface IDepositFormData {
  [AgreementFormFields.confirmed]: boolean;
}
