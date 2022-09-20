import { FieldValidator } from 'final-form';
import { useCallback } from 'react';
import { useForm } from 'react-final-form';

import { Field } from '../types';
import { InputField } from 'modules/form/components/InputField';
import { isABI } from '../utils/isABI';
import { isURL } from '../utils/isURL';

export interface ABIField {
  abi: string;
  field: Field;
  isValid: boolean;
}

const InputProps = {
  multiline: true,
};

const ROWS = 8;
const placeholder = `i.e. [{"inputs":[{"name":"chainId...\nOR\nhttps://raw.githubusercontent.com/.../build/contracts/ERC20.json''i.e. [{"inputs":[{"name":"chainId...\nOR\nhttps://raw.githubusercontent.com/.../build/contracts/ERC20.json`;
const helperText = 'Contract ABI (URL or functions array)';

const isABIFieldValid = (value: string) => isURL(value) || isABI(value);

export const useABIField = (name: string): ABIField => {
  const form = useForm();

  const { valid: isValid = false, value: abi } = form.getFieldState(name) || {};

  const validate: FieldValidator<string> = useCallback(
    (value, _, meta) => meta?.dirty && !isABIFieldValid(value),
    [],
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
