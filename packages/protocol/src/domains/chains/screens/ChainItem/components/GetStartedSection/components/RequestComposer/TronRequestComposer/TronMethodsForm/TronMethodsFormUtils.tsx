import { MethodOption } from 'domains/requestComposer/types';
import { TronChainMethod } from 'domains/requestComposer/constants/tron';
import { TronMethodsFormData } from '../../components/MethodsForm/MethodsFormTypes';
import { tronJSConfig } from 'domains/requestComposer/utils/tron/tronJSConfig';
import {
  initUnfilledParameters,
  METHOD_NAME,
} from '../TronSampleCode/TronSampleCodeUtils';

export const methodsSelectOptions: MethodOption[] = Object.values(
  TronChainMethod,
).map(name => ({
  label: name,
  value: name,
}));

export const formatSubmiteData = (data: TronMethodsFormData) => {
  const tronMethodName: TronChainMethod = data.methodName
    ?.value as TronChainMethod;

  Object.keys(data).forEach(key => {
    if (key !== METHOD_NAME && data[key] === '') {
      delete data[key];
    }
  });

  const { args } = tronJSConfig[tronMethodName];

  if (args) {
    initUnfilledParameters(args, data);
  }

  return data;
};
