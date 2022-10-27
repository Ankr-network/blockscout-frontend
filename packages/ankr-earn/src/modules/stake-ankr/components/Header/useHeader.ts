import BigNumber from 'bignumber.js';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ANKR_1INCH_BUY_LINK, ZERO } from 'modules/common/const';
import { useGetCommonDataQuery } from 'modules/stake-ankr/actions/getCommonData';

interface IUseHeader {
  balance?: BigNumber;
  isLoading: boolean;
  getTokensLink: string;
}

export const useHeader = (): IUseHeader => {
  const { data, isFetching: loading, refetch } = useGetCommonDataQuery();

  const balance = data?.ankrBalance ?? ZERO;

  useProviderEffect(() => {
    refetch();
  }, []);

  return {
    balance,
    isLoading: loading,
    getTokensLink: ANKR_1INCH_BUY_LINK,
  };
};
