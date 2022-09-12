import { ReactNode } from 'react';

import { EVMMethod, LibraryID } from 'domains/requestComposer/constants';
import { EVMMethodsRequest, MethodOption } from 'domains/requestComposer/types';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/RPCCallsConfig';
import { BlockNumberField } from './Arguments/BlockNumberField';
import { Checkbox } from './Arguments/Checkbox';
import { HashField } from './Arguments/HashField';
import { EVMMethodsFormData } from './EVMMethodsFormTypes';

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
  libraryID: LibraryID,
): ReactNode[] => {
  const methodArguments = RPC_CALLS_CONFIG[name]?.[libraryID]?.args || [];

  return methodArguments
    ?.map((argument: any, index: number) => {
      const { type, description, placeholder } = argument;
      const fieldName = getFieldName(index);

      if (type === 'textarea') {
        return (
          <HashField
            helperText={description}
            placeholder={placeholder}
            name={fieldName}
            key={fieldName}
          />
        );
      }

      if (type === 'textfield') {
        return (
          <BlockNumberField
            helperText={description}
            placeholder={placeholder}
            name={fieldName}
            key={fieldName}
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

export const formatDataForRequest = (
  data: EVMMethodsFormData,
  libraryID: LibraryID,
): EVMMethodsRequest => {
  const { methodName: methodNameOption, ...others } = data;
  const methodName = methodNameOption?.value as EVMMethod;

  const methodArguments = RPC_CALLS_CONFIG[methodName]?.[libraryID]?.args || [];

  const params = methodArguments.map((arg: any, index: number) => {
    const fieldName = getFieldName(index);

    return others[fieldName] || '';
  });

  return {
    methodName,
    params,
  };
};

export const isMethodDisabled = (name: EVMMethod) =>
  RPC_CALLS_CONFIG[name]?.disabled;
