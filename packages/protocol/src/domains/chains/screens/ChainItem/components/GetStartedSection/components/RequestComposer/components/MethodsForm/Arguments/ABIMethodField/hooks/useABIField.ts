import { FieldValidator } from 'final-form';
import { useCallback } from 'react';
import { useForm } from 'react-final-form';

import { Field } from '../types';
import { InputField } from 'modules/form/components/InputField';

export interface ABIField {
  abi: string;
  field: Field;
  isValid: boolean;
}

const InputProps = {
  multiline: true,
};

const ROWS = 8;

export const useABIField = ({
  helperText,
  name,
  placeholder,
  validate: isABIFieldValid = () => true,
}: Field): ABIField => {
  const form = useForm();

  const { valid: isValid = false, value: abi } = form.getFieldState(name) || {};

  const validate: FieldValidator<string> = useCallback(
    (value, _, meta) => meta?.dirty && !isABIFieldValid(value, _),
    [isABIFieldValid],
  );

  const field: Field = {
    component: InputField,
    name,
    placeholder,
    InputProps,
    helperText,
    rows: ROWS,
    validate,
  };

  return { abi, field, isValid };
};
