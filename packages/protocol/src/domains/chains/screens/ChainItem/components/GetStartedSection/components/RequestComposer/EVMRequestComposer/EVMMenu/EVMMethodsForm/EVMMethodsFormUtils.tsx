import { ReactNode } from 'react';

import { ABIMethodField } from '../../../components/MethodsForm/Arguments/ABIMethodField';
import { DropdownField } from '../../../components/MethodsForm/Arguments/DropdownField';
import { EVMMethod, EVMLibraryID } from 'domains/requestComposer/constants';
import { EVMMethodsRequest, MethodOption } from 'domains/requestComposer/types';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/RPCCallsConfig';
import { BlockNumberField } from '../../../components/MethodsForm/Arguments/BlockNumberField';
import { Checkbox } from '../../../components/MethodsForm/Arguments/Checkbox';
import { HashField } from '../../../components/MethodsForm/Arguments/HashField';
import {
  EVMMethodsFieldsData,
  EVMMethodsFormData,
} from './EVMMethodsFormTypes';

export const methodsSelectOptions: MethodOption[] = Object.values(
  EVMMethod,
).map(name => ({
  label: name,
  value: name,
}));

const ARGUMENT_PREFIX = 'arg';
const getFieldName = (index: number) => `${ARGUMENT_PREFIX}${index + 1}`;

export const getArgumentsBlock = (
  name: EVMMethod,
  libraryID: EVMLibraryID,
): ReactNode[] => {
  const methodArguments = RPC_CALLS_CONFIG[name]?.[libraryID]?.args || [];

  return methodArguments
    ?.map((argument: any, index: number) => {
      const { type, description, options, placeholder, validate } = argument;
      const fieldName = getFieldName(index);

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

      if (type === 'abi-method') {
        return <ABIMethodField name={fieldName} key={fieldName} />;
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
};

export const getMethodDescription = (
  method?: MethodOption,
): string | undefined => {
  return RPC_CALLS_CONFIG[method?.value as EVMMethod]?.description;
};

const getComposedParams = (data: EVMMethodsFieldsData, fieldName: string) => {
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

export const formatDataForRequest = (
  data: EVMMethodsFormData,
  libraryID: EVMLibraryID,
): EVMMethodsRequest => {
  const { methodName: methodNameOption, ...others } = data;
  const methodName = methodNameOption?.value as EVMMethod;

  const methodArguments = RPC_CALLS_CONFIG[methodName]?.[libraryID]?.args || [];

  const params = methodArguments.flatMap((arg: any, index: number) => {
    const fieldName = getFieldName(index);

    return others[fieldName] || getComposedParams(others, fieldName);
  });

  return {
    methodName,
    params,
  };
};

export const isMethodDisabled = (name: EVMMethod) =>
  RPC_CALLS_CONFIG[name]?.disabled;
