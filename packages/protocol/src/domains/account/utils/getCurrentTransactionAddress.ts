import { GetState, RootState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { selectAuthData } from 'domains/auth/store/authSlice';

export const getCurrentTransactionAddress = (getState: GetState) => {
  const service = MultiService.getWeb3Service();

  const { address: authAddress } = selectAuthData(getState() as RootState);

  if (service) {
    const provider = service.getKeyWriteProvider();
    const { currentAccount: currentAccountAddress } = provider;

    return currentAccountAddress;
  }

  return authAddress ?? '';
};
