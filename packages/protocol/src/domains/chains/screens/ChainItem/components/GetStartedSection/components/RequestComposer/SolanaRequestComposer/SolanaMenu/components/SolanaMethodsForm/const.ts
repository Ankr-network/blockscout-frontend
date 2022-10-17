import { MethodOption } from 'domains/requestComposer/types';
import { SolanaMethod } from 'domains/requestComposer/constants/solana';

export const methodsSelectOptions: MethodOption[] = Object.values(
  SolanaMethod,
).map(name => ({ label: name, value: name }));
