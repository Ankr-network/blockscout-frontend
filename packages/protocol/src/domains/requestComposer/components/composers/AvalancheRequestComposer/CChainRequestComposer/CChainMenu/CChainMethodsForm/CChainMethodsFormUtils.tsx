import { MethodOption } from 'domains/requestComposer/types';
import { CChainMethod } from 'domains/requestComposer/constants/avalanche';

export const methodsSelectOptions: MethodOption[] = Object.values(
  CChainMethod,
).map(name => ({
  label: name,
  value: name,
}));
