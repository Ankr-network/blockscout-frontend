import { MethodOption } from 'domains/requestComposer/types';

export type MethodsFieldsData = {
  [key: string]: string;
};

export type MethodsFormData = {
  methodName?: MethodOption;
} & MethodsFieldsData;

export type TronMethodsFieldsData = {
  [key: string]: string | number;
};

export type TronMethodsFormData = {
  methodName?: MethodOption;
} & TronMethodsFieldsData;

export type HarmonyMethodsFieldsData = {
  [key: string]: string | number;
};

export type HarmonyMethodsFormData = {
  methodName?: MethodOption;
} & HarmonyMethodsFieldsData;
