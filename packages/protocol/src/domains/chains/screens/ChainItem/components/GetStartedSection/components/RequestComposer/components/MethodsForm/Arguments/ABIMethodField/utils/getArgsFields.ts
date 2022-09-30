import { FieldValidator } from 'final-form';
import { InputField } from 'modules/form/components/InputField';

import { ABI } from 'domains/requestComposer/types';
import { Field } from '../types';
import { concat } from './concat';
import { getMethodArgs } from './getMethodArgs';

export interface ArgsFieldsParams {
  abi?: ABI;
  methodName?: string;
  name: string;
  validate: FieldValidator<string>;
}

export const getArgsFields = ({
  abi,
  methodName,
  name,
  validate,
}: ArgsFieldsParams) =>
  methodName
    ? getMethodArgs({ abi, methodName }).map<Field>((input, index) => ({
        component: InputField,
        name: concat(name, index + 1),
        placeholder: input.type,
        helperText: `${input.name} (required)`,
        validate,
      }))
    : [];
