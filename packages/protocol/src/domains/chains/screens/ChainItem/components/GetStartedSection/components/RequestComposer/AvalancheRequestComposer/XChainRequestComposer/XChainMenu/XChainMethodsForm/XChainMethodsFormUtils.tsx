import { MethodOption } from 'domains/requestComposer/types';
import { XChainMethod } from 'domains/requestComposer/constants/avalanche';

export const methodsSelectOptions: MethodOption[] = Object.values(
  XChainMethod,
).map(name => ({
  label: name,
  value: name,
}));
