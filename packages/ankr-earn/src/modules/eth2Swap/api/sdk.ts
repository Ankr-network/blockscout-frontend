import BigNumber from 'bignumber.js';

import { IWeb3SendResult, ProviderManager } from 'provider';
import { AvailableProviders } from 'provider/providerManager/types';
import { ETH_SCALE_FACTOR, MAX_UINT256 } from 'modules/common/const';
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
  allowance: BigNumber;
}

const CONFIG = configFromEnv();

export const fetchEth2SwapData = async ({
  providerManager,
  providerId,
}: IGetEth2SwapServiceArgs): Promise<IGetEth2SwapServiceData> => {
  const provider = await providerManager.getProvider(providerId);
  const { contractConfig } = CONFIG;

  const aethContract = provider.createContract(
    AETH,
    contractConfig.aethContract,
  );
  const fethContract = provider.createContract(
    FETH,
    contractConfig.fethContract,
  );

  const [aethBalance, fethBalance, ratio, allowance] = await Promise.all([
    aethContract.methods.balanceOf(provider.currentAccount).call(),
    fethContract.methods.balanceOf(provider.currentAccount).call(),
    aethContract.methods.ratio().call(),
    aethContract.methods
      .allowance(provider.currentAccount, contractConfig.fethContract)
      .call(),
  ]);

  return {
    ratio: new BigNumber(ratio),
    aethBalance: new BigNumber(aethBalance),
    fethBalance: new BigNumber(fethBalance),
    allowance: new BigNumber(allowance),
  };
};

export interface ISharesArgs {
  amount: string;
  providerManager: ProviderManager;
  providerId: AvailableProviders;
}

export const lockShares = async ({
  amount,
  providerManager,
  providerId,
}: ISharesArgs): Promise<IWeb3SendResult> => {
  const provider = await providerManager.getProvider(providerId);
  const { contractConfig } = CONFIG;

  const fethContract = provider.createContract(
    FETH,
    contractConfig.fethContract,
  );

  const data = fethContract.methods
    .lockShares(new BigNumber(amount).multipliedBy(ETH_SCALE_FACTOR).toString())
    .encodeABI();

  return provider.sendTransactionAsync(
    provider.currentAccount,
    contractConfig.fethContract,
    { data },
  );
};

export const unlockShares = async ({
  amount,
  providerManager,
  providerId,
}: ISharesArgs): Promise<IWeb3SendResult> => {
  const provider = await providerManager.getProvider(providerId);
  const { contractConfig } = CONFIG;

  const fethContract = provider.createContract(
    FETH,
    contractConfig.fethContract,
  );

  const data = fethContract.methods
    .unlockShares(
      new BigNumber(amount).multipliedBy(ETH_SCALE_FACTOR).toString(),
    )
    .encodeABI();

  return provider.sendTransactionAsync(
    provider.currentAccount,
    contractConfig.fethContract,
    { data },
  );
};

export interface IApproveAETHCArgs {
  providerManager: ProviderManager;
  providerId: AvailableProviders;
}

export const approveAETHCForAETHB = async ({
  providerManager,
  providerId,
}: IApproveAETHCArgs): Promise<IWeb3SendResult> => {
  const provider = await providerManager.getProvider(providerId);
  const { contractConfig } = CONFIG;

  const aethContract = provider.createContract(
    AETH,
    contractConfig.aethContract,
  );

  const data = aethContract.methods
    .approve(contractConfig.fethContract, MAX_UINT256)
    .encodeABI();

  return provider.sendTransactionAsync(
    provider.currentAccount,
    contractConfig.aethContract,
    { data },
  );
};
