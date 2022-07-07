import { TValidatorPrettyStatus } from './types';

export const VALIDATOR_STATUS_MAPPING: Record<string, TValidatorPrettyStatus> =
  {
    '0': 'NOT_FOUND',
    '1': 'ACTIVE',
    '2': 'PENDING',
    '3': 'JAILED',
  };
