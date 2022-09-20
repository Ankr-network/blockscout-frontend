import { useMemo } from 'react';

import { Field, FieldName } from '../types';
import { concat } from '../utils/concat';
import { useABIField } from './useABIField';
import { useArgsFields } from './useArgsFields';
import { useMethodField } from './useMethodField';

export interface SubfieldsParams {
  methodFieldClassName?: string;
  name: string;
}

export const useSubfields = ({
  methodFieldClassName,
  name,
}: SubfieldsParams): Field[] => {
  const abiFieldName = concat(name, FieldName.ABI);
  const argsFieldName = concat(name, FieldName.Args);
  const methodFieldName = concat(name, FieldName.Method);

  const {
    abi: rawABI,
    field: abiField,
    isValid: isABIFieldValid,
  } = useABIField(abiFieldName);

  const { abi, field: methodField } = useMethodField({
    abi: rawABI,
    className: methodFieldClassName,
    isABIFieldValid,
    name: methodFieldName,
  });

  const argsFields = useArgsFields({
    abi,
    methodFieldName,
    name: argsFieldName,
  });

  return useMemo(
    () => (methodField ? [abiField, methodField, ...argsFields] : [abiField]),
    [abiField, methodField, argsFields],
  );
};
