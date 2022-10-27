import { FormApi } from 'final-form';

import {
  EFieldsNames,
  IStakeSubmitPayload,
} from '../components/StakeForm/const';

export function setMaxAmount(
  form: FormApi<IStakeSubmitPayload>,
  maxValue: string,
) {
  return (): void => form.change(EFieldsNames.amount, maxValue);
}
