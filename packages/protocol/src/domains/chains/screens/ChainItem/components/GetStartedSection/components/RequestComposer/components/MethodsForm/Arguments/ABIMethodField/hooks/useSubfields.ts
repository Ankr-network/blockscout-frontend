import { useMemo } from 'react';

import { Field, Subfield } from '../types';
import { concat } from '../utils/concat';
import { getSubfieldsParams } from '../utils/getSubfieldsParams';
import { useABIField } from './useABIField';
import { useArgsFields } from './useArgsFields';
import { useMethodField } from './useMethodField';

export interface SubfieldsParams {
  methodFieldClassName?: string;
  name: string;
  subfields: Subfield[];
}

export const useSubfields = ({
  methodFieldClassName,
  name,
  subfields,
}: SubfieldsParams): Field[] => {
  const [abiFieldParams, methodFieldParams] = getSubfieldsParams(
    name,
    subfields,
  );

  const {
    abi: rawABI,
    field: abiField,
    isValid: isABIFieldValid,
  } = useABIField(abiFieldParams);

  const { abi, field: methodField } = useMethodField({
    abi: rawABI,
    className: methodFieldClassName,
    isABIFieldValid,
    params: methodFieldParams,
  });

  const argsFields = useArgsFields({
    abi,
    methodFieldName: methodFieldParams.name,
    name: concat(name, subfields.length + 1),
  });

  return useMemo(
    () => (methodField ? [abiField, methodField, ...argsFields] : [abiField]),
    [abiField, methodField, argsFields],
  );
};
