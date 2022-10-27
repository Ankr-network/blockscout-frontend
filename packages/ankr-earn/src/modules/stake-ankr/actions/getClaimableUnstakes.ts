import BigNumber from 'bignumber.js';

import { web3Api } from '../../api/web3Api';
import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

interface IGetClaimableUnstakesProps {
  validator: string;
}

export const { useGetClaimableUnstakesQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getClaimableUnstakes: build.query<BigNumber, IGetClaimableUnstakesProps>({
      queryFn: async ({ validator }) => {
        const sdk = await AnkrStakingSDK.getInstance();

        const data = await sdk.getClaimableUnstakes(validator);

        return { data };
      },
    }),
  }),
});
