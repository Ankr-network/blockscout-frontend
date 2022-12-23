import BigNumber from 'bignumber.js';

import { PolygonOnEthereumSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';

interface IApproveMATICStakeProps {
  amount: BigNumber;
  token: TMaticSyntToken;
}

export const { useLazyApproveMaticOnEthStakeQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    approveMaticOnEthStake: build.query<boolean, IApproveMATICStakeProps>({
      queryFn: queryFnNotifyWrapper<IApproveMATICStakeProps, never, boolean>(
        async ({ amount }) => {
          const sdk = await PolygonOnEthereumSDK.getInstance();

          return { data: await sdk.approveMATICToken(amount) };
        },
      ),
    }),
  }),
});
