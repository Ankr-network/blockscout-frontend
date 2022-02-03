import BigNumber from 'bignumber.js';

import { ProviderManager } from 'provider';
import { AvailableProviders } from 'provider/providerManager/types';
import { configFromEnv } from 'modules/api/config';
import AETH from 'modules/api/contract/AETH.json';
import FETH from 'modules/api/contract/FETH.json';

export interface IGetEth2SwapServiceArgs {
  providerManager: ProviderManager;
  providerId: AvailableProviders;
}

export interface IGetEth2SwapServiceData {
  ratio: BigNumber;
  aethBalance: BigNumber;
  fethBalance: BigNumber;
}

const CONFIG = configFromEnv();

export const fetchEth2SwapData = async ({
  providerManager,
  providerId,
}: IGetEth2SwapServiceArgs): Promise<IGetEth2SwapServiceData> => {
  const provider = await providerManager.getProvider(providerId);

  const aethContract = provider.createContract(
    AETH,
    CONFIG.contractConfig.aethContract,
  );
  const fethContract = provider.createContract(
    FETH,
    CONFIG.contractConfig.aethContract,
  );

  const [aethBalance, fethBalance, ratio] = await Promise.all([
    aethContract.methods.balanceOf(provider.currentAccount).call(),
    fethContract.methods.balanceOf(provider.currentAccount).call(),
    aethContract.methods.ratio().call(),
  ]);

  return {
    ratio: new BigNumber(ratio),
    aethBalance: new BigNumber(aethBalance),
    fethBalance: new BigNumber(fethBalance),
  };
};
