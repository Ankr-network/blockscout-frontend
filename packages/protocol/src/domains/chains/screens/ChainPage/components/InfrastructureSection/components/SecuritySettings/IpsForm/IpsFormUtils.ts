import { IpsFormData, IpsFormProps } from './IpsFormTypes';

export const getInitialValues = (ips: IpsFormProps['data']): IpsFormData => {
  return {
    ips,
  };
};
