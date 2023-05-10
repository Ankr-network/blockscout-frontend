import { Balance as AccountBalance } from 'domains/account/actions/balance/types';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { accountFetchBalance } from 'domains/account/actions/balance/fetchBalance';
import { defaultBalance } from 'domains/account/actions/balance/const';

export interface Balance extends AccountBalance {
  isLoading: boolean;
  isLoadingInitially: boolean;
}

export const useBalance = (): Balance => {
  const [, { data: balances, isLoading }] =
    useQueryEndpoint(accountFetchBalance);

  const isLoadingInitially = !balances && isLoading;

  return {
    ...(balances || defaultBalance),
    isLoading,
    isLoadingInitially,
  };
};
