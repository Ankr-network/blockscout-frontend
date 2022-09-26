import { MethodOption } from 'domains/requestComposer/types';
import { PChainMethod } from 'domains/requestComposer/constants/avalanche';

export const methodsSelectOptions: MethodOption[] = Object.values(
  PChainMethod,
).map(name => ({
  label: name,
  value: name,
}));
