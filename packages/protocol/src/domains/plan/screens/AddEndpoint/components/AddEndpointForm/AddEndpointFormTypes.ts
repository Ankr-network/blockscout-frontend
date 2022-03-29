export enum AddEndpointFormFields {
  confirmed = 'confirmed',
  httpAddress = 'httpAddress',
}

export interface AddEndpointFormData {
  httpAddress: string;
  [AddEndpointFormFields.confirmed]: boolean;
}
