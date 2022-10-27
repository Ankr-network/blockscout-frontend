import BigNumber from 'bignumber.js';

import { web3Api } from '../../api/web3Api';
import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

interface IGetUndelegatedAmountDataProps {
  validator: string;
}

export const { useGetUnlockedDelegatedByValidatorQuery } =
  web3Api.injectEndpoints({
    endpoints: build => ({
      getUnlockedDelegatedByValidator: build.query<
        BigNumber,
        IGetUndelegatedAmountDataProps
      >({
        queryFn: async ({ validator }) => {
          const sdk = await AnkrStakingSDK.getInstance();
          const provider = await sdk.getProvider();

          return {
            data: await sdk.getUnlockedDelegatedByValidator(
              validator,
              await provider.getBlockNumber(),
            ),
          };
        },
      }),
    }),
  });
