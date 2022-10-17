import { ReactNode } from 'react';

import { ABIMethodField } from './Arguments/ABIMethodField';
import { DropdownField } from './Arguments/DropdownField';

import { MethodOption, MethodsRequest } from 'domains/requestComposer/types';
import { BlockNumberField } from './Arguments/BlockNumberField';
import { Checkbox } from './Arguments/Checkbox';
import { HashField } from './Arguments/HashField';
import { MethodsFieldsData, MethodsFormData } from './MethodsFormTypes';

const ARGUMENT_PREFIX = 'arg';
const getFieldName = (index: number) => `${ARGUMENT_PREFIX}${index + 1}`;

export function getArgumentsBlock<S extends string, T extends string>(
  methodName: S,
  libraryID: T,
  rpcCallsConfig: any,
): ReactNode[] {
  const methodArguments = rpcCallsConfig[methodName]?.[libraryID]?.args || [];

  return methodArguments
    ?.map((argument: any, index: number) => {
      const {
        type,
        description,
        options,
        fieldName = getFieldName(index),
        placeholder,
        subfields,
        validate,
      } = argument;

      if (type === 'textarea') {
        return (
          <HashField
            helperText={description}
            key={fieldName}
            name={fieldName}
            placeholder={placeholder}
            validate={validate}
          />
        );
      }

      if (type === 'textfield') {
        return (
          <BlockNumberField
            helperText={description}
            key={fieldName}
            name={fieldName}
            placeholder={placeholder}
            validate={validate}
          />
        );
      }

      if (type === 'number') {
        return (
          <BlockNumberField
            helperText={description}
            placeholder={placeholder}
            type={type}
            name={fieldName}
            key={fieldName}
          />
        );
      }

      if (type === 'abi-method') {
        return (
          <ABIMethodField
            key={fieldName}
            name={fieldName}
            subfields={subfields}
          />
        );
      }

      if (type === 'dropdown') {
        return (
          <DropdownField
            helperText={description}
            key={fieldName}
            name={fieldName}
            options={options}
            placeholder={placeholder}
          />
        );
      }

      if (type === 'boolean') {
        return (
          <Checkbox helperText={description} name={fieldName} key={fieldName} />
        );
      }

      return null;
    })
    .filter(Boolean);
}

const getComposedParams = (data: MethodsFieldsData, fieldName: string) => {
  const regexp = new RegExp(`^${fieldName}_*`);

  return Object.entries(data)
    .filter(([key]) => regexp.test(key))
    .reduce<string[]>(
      (args, [key, value]) => {
        const [, keyindex, subindex = '1'] = key.split('_');

        args[Number(keyindex) + Number(subindex) - 2] = value;

        return args;
      },
      [''],
    );
};

export function formatDataForRequest<S, T extends string>(
  data: MethodsFormData,
  libraryID: S,
  rpcCallsConfig: any,
): MethodsRequest<T> {
  const { methodName: methodNameOption, ...others } = data;
  const methodName = methodNameOption?.value || '';

  const methodArguments =
    rpcCallsConfig[methodName as T]?.[libraryID]?.args || [];

  const params = methodArguments.flatMap((arg: any, index: number) => {
    const fieldName = getFieldName(index);

    return others[fieldName] || getComposedParams(others, fieldName);
  });

  return {
    methodName: methodName as T,
    params,
  };
}

export function isMethodDisabled<T>(name: T, rpcCallsConfig: any) {
  return rpcCallsConfig[name]?.disabled;
}

export const getMethodDescription = (
  config: any,
  method?: MethodOption,
): string | undefined => {
  const methodName = method?.value;

  if (!methodName) return '';

  return config[methodName]?.description;
};
