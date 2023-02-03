import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
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
        getOnErrorWithCustomText(t('stake-matic-common.errors.approve-stake')),
      ),
    }),
  }),
});
