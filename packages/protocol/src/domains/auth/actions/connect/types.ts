import { TwoFAQueryFnParams } from 'store/queries/types';

export type AuthConnectParams = TwoFAQueryFnParams<{
  walletId: string;
}>;
