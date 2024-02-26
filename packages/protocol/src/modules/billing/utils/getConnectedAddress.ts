import { MultiService } from 'modules/api/MultiService';

export const getConnectedAddress = () => {
  const service = MultiService.getWeb3Service();

  const { currentAccount } = service.getKeyWriteProvider();

  return currentAccount;
};
