import { NearMethod } from 'domains/requestComposer/constants/near';
import { MethodOption } from 'domains/requestComposer/types';

export const methodsSelectOptions: MethodOption[] = Object.values(
  NearMethod,
).map(name => ({
  label: name,
  value: name,
}));
