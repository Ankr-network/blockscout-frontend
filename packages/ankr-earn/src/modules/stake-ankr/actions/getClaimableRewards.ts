import BigNumber from 'bignumber.js';

import { web3Api } from '../../api/web3Api';
import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

interface IGetClaimableAmountDataProps {
  validator: string;
}

export const { useGetClaimableRewardsQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getClaimableRewards: build.query<BigNumber, IGetClaimableAmountDataProps>({
      queryFn: async ({ validator }: IGetClaimableAmountDataProps) => {
        const sdk = await AnkrStakingSDK.getInstance();

        const data = await sdk.getClaimableAmount(validator);

        return { data };
      },
    }),
  }),
});
