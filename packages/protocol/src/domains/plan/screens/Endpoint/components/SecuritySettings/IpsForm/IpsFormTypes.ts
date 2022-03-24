export enum IpsFormFields {
  ip = 'ip',
  ips = 'ips',
}

export interface IpsFormData {
  ip?: string;
  ips: string[];
}

export interface IpsFormProps {
  data: string[];
  onSubmit: (ips: string[]) => void;
}

export interface IpsFormContainerProps extends Omit<IpsFormProps, 'onSubmit'> {
  chainId: string;
}
