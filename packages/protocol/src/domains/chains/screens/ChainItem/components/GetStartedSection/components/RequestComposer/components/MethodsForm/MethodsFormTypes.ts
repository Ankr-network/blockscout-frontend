import { MethodOption } from 'domains/requestComposer/types';

export type MethodsFieldsData = {
  [key: string]: string;
};

export type MethodsFormData = {
  methodName?: MethodOption;
} & MethodsFieldsData;
