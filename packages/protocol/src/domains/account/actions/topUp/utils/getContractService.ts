import { MultiRpcWeb3Sdk } from 'multirpc-sdk';

import { GetState, RootState } from 'store';
import {
  selectPaymentOptionsByNetwork,
  selectTransaction,
} from 'domains/account/store/selectors';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';

export const getContractService = (
  web3Service: MultiRpcWeb3Sdk,
  getState: GetState,
) => {
  const address = getCurrentTransactionAddress(getState as GetState);

  const transaction = selectTransaction(getState() as RootState, address);

  const currency = transaction?.currency;
  const network = transaction?.network;

  const { depositContractAddress = '', tokenAddress = '' } =
    selectPaymentOptionsByNetwork(getState() as RootState, network, currency);

  if (currency === 'USDT') {
    return web3Service.getUsdtContractService({
      depositContractAddress,
      tokenAddress,
    });
  }

  if (currency === 'USDC') {
    return web3Service.getUsdcContractService({
      depositContractAddress,
      tokenAddress,
    });
  }

  return web3Service.getContractService();
};
