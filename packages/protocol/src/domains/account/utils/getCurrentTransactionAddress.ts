import { Web3Address } from 'multirpc-sdk';

import { GetState, RootState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { getSelectedGroupAddress } from 'modules/groups/utils/getSelectedGroupAddress';

export const getCurrentTransactionAddress = async (
  getState: GetState,
): Promise<Web3Address> => {
  const service = MultiService.getWeb3Service();
  const provider = service.getKeyWriteProvider();
  const { selectedGroupAddress: groupAddress } = getSelectedGroupAddress(
    getState() as RootState,
  );
  const { currentAccount: currentAccountAddress } = provider;

  const result = groupAddress || currentAccountAddress;

  return result;
};
