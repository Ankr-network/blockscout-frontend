import { GetState, RootState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { getSelectedGroupAddress } from 'modules/groups/utils/getSelectedGroupAddress';

export const getCurrentTransactionAddress = (getState: GetState) => {
  const service = MultiService.getWeb3Service();
  const { selectedGroupAddress: groupAddress } = getSelectedGroupAddress(
    getState() as RootState,
  );

  if (service) {
    const provider = service.getKeyWriteProvider();
    const { currentAccount: currentAccountAddress } = provider;

    const result = groupAddress || currentAccountAddress;

    return result;
  }

  return groupAddress ?? '';
};
