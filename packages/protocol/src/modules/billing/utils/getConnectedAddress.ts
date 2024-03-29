import { MultiService } from 'modules/api/MultiService';

export const getConnectedAddress = () => {
  const service = MultiService.getWeb3Service();

  return service?.getKeyWriteProvider().currentAccount;
};
