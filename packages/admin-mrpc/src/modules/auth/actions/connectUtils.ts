import { IJwtToken, Web3Address } from 'multirpc-sdk';
import { switchEthereumChain } from 'modules/auth/utils/switchEthereumChain';
import { MultiService } from 'modules/api/MultiService';
import { t } from 'modules/i18n/utils/intl';
import { hasMetamask } from '../utils/hasMetamask';

export interface IConnect {
  address: Web3Address;
  credentials?: IJwtToken;
}

const timeout = () => new Promise(res => setTimeout(res, 300));

export const connectProvider = async () => {
  if (!hasMetamask()) {
    throw new Error(t('error.no-metamask'));
  }

  const service = await MultiService.getInstance();

  await switchEthereumChain(service);

  // TODO: try to avoid this timeout in the future PROTOCOL-244
  await timeout();
};

export const disconnectService = async () => {
  const service = await MultiService.getInstance();
  service.getWorkerGateway().removeJwtToken();
  service.getAccountGateway().removeToken();

  service.getKeyProvider().disconnect();
  MultiService.removeInstance();
};
