import { EVMMethod } from 'domains/requestComposer/constants';
import { MethodOption } from 'domains/requestComposer/types';

export const methodsSelectOptions: MethodOption[] = Object.values(
  EVMMethod,
).map(name => ({
  label: name,
  value: name,
}));
