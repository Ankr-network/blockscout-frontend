import { FieldValidator } from 'final-form';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-final-form';

import { ABI } from 'domains/requestComposer/types';
import { getArgsFields } from '../utils/getArgsFields';

export interface ArgFieldsParams {
  abi?: ABI;
  name: string;
  methodFieldName: string;
}

const isInvalid = (value: string) => !value;

export const useArgsFields = ({
  abi,
  methodFieldName,
  name,
}: ArgFieldsParams) => {
  const form = useForm();
  const { value: methodName } = form.getFieldState(methodFieldName) || {};

  const validate: FieldValidator<string> = useCallback(isInvalid, []);

  const fields = useMemo(
    () => getArgsFields({ abi, methodName, name, validate }),
    [abi, methodName, name, validate],
  );

  return fields;
};
