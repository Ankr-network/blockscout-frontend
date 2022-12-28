import BigNumber from 'bignumber.js';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';

import { getPolygonOnEthereumSDK } from '../utils/getPolygonOnEthereumSDK';

interface IApproveMATICStakeProps {
  amount: BigNumber;
  token: TMaticSyntToken;
}

export const { useLazyApproveMaticOnEthStakeQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    approveMaticOnEthStake: build.query<boolean, IApproveMATICStakeProps>({
      queryFn: queryFnNotifyWrapper<IApproveMATICStakeProps, never, boolean>(
        async ({ amount }) => {
          const sdk = await getPolygonOnEthereumSDK();

          return { data: await sdk.approveMATICToken(amount) };
        },
      ),
    }),
  }),
});
