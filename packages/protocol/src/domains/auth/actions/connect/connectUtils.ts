import { MultiService } from 'modules/api/MultiService';
import { switchEthereumChain } from 'domains/auth/utils/switchEthereumChain';
import { timeout } from 'modules/common/utils/timeout';

export const switchChain = async () => {
  await switchEthereumChain();

  // TODO: try to avoid this timeout in the future PROTOCOL-244
  await timeout(300);
};

export const disconnectService = () => {
  MultiService.removeServices();
};
