import { FormApi } from 'final-form';

import { IAnkrStakeSubmitPayload, EFieldsNames } from '../types';

export function setMaxAmount(
  form: FormApi<Partial<IAnkrStakeSubmitPayload>>,
  maxValue: string,
) {
  return (): void => form.change(EFieldsNames.amount, maxValue);
}
