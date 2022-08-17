import { FormApi } from 'final-form';

import {
  EFieldsNames,
  IAnkrStakeSubmitPayload,
} from '../components/StakeForm/const';

export function setMaxAmount(
  form: FormApi<IAnkrStakeSubmitPayload>,
  maxValue: string,
) {
  return (): void => form.change(EFieldsNames.amount, maxValue);
}
