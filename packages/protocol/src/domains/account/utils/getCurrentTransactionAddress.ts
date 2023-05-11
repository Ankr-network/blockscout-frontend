import { Web3Address } from 'multirpc-sdk';
import { GetState, RootState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { getSelectedGroupAddress } from 'domains/userGroup/utils/getSelectedGroupAddress';

export const getCurrentTransactionAddress = async (
  getState: GetState,
): Promise<Web3Address> => {
  const service = await MultiService.getWeb3Service();
  const provider = service.getKeyProvider();
  const { selectedGroupAddress: groupAddress } = getSelectedGroupAddress(
    getState() as RootState,
  );
  const { currentAccount: currentAccountAddress } = provider;

  return groupAddress || currentAccountAddress;
};
