import { TronChainMethod } from 'domains/requestComposer/constants/tron';
import { ITronArg } from 'domains/requestComposer/types/tron';
import { tronJSConfig } from 'domains/requestComposer/utils/tron/tronJSConfig';
import { TronMethodsFormData } from '../../../MethodsForm/MethodsFormTypes';

export const METHOD_NAME = 'methodName';

export const initUnfilledParameters = (
  args: any,
  data: TronMethodsFormData | Record<string, string>,
) => {
  args.forEach((arg: ITronArg) => {
    const { fieldName, type } = arg;
    if (!(fieldName in data)) {
      data[fieldName] = type === 'number' ? 0 : '';
    }
  });

  return data;
};

export const formatParameters = (
  tronMehtodName: TronChainMethod,
  parameters: any,
) => {
  Object.keys(parameters).forEach(key => {
    if (!parameters[key]) {
      delete parameters[key];
    }
  });

  const { args } = tronJSConfig[tronMehtodName];

  if (args) {
    initUnfilledParameters(args, parameters);
  }

  return parameters;
};

export const getCopyCode = (code: string) => {
  return code.replace(/#.+:/g, '');
};
