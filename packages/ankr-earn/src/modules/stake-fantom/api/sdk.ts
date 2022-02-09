import BigNumber from 'bignumber.js';
import { configFromEnv } from 'modules/api/config';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { ETH_SCALE_FACTOR } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { convertNumberToHex } from 'modules/common/utils/numbers/converters';
import { IWeb3SendResult } from 'provider';
import { AvailableProviders } from 'provider/providerManager/types';
import AFTMbAbi from './contracts/aFTMb.json';
import FantomPoolAbi from './contracts/FantomPool.json';

const config = configFromEnv();
const providerManager = ProviderManagerSingleton.getInstance();
const providerId = AvailableProviders.ethCompatible;

export const stake = async (amount: BigNumber): Promise<IWeb3SendResult> => {
  const { fantomConfig } = config;
  const provider = await providerManager.getProvider(providerId);

  if (!provider.isConnected()) {
    await provider.connect();
  }

  const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);
  const fantomPoolContract = provider.createContract(
    FantomPoolAbi,
    fantomConfig.fantomPool,
  );

  return fantomPoolContract.methods.stake().send({
    from: provider.currentAccount,
    value: hexAmount,
  });
};

export const getMinimumStake = async (): Promise<BigNumber> => {
  const { fantomConfig } = config;
  const provider = await providerManager.getProvider(providerId);

  if (!provider.isConnected()) {
    await provider.connect();
  }

  const web3 = provider.getWeb3();
  const fantomPoolContract = provider.createContract(
    FantomPoolAbi,
    fantomConfig.fantomPool,
  );

  const minStake = await fantomPoolContract.methods.getMinimumStake().call();

  return new BigNumber(web3.utils.fromWei(minStake));
};

export const addAftmbToWallet = async (): Promise<void> => {
  const { fantomConfig } = config;
  const provider = await providerManager.getProvider(providerId);

  if (!provider.isConnected()) {
    await provider.connect();
  }

  await provider.addTokenToWallet({
    address: fantomConfig.aftmbToken,
    symbol: Token.aFTMb,
    decimals: 18,
  });
};

export const getFtmBalance = async (): Promise<BigNumber> => {
  const provider = await providerManager.getProvider(providerId);
  const web3 = provider.getWeb3();

  if (!provider.isConnected()) {
    await provider.connect();
  }

  const ftmBalance = await web3.eth.getBalance(provider.currentAccount);

  return new BigNumber(web3.utils.fromWei(ftmBalance));
};

export const getAftmbBalance = async (): Promise<BigNumber> => {
  const { fantomConfig } = config;
  const provider = await providerManager.getProvider(providerId);

  if (!provider.isConnected()) {
    await provider.connect();
  }

  const web3 = provider.getWeb3();
  const aFTMbContract = provider.createContract(
    AFTMbAbi,
    fantomConfig.aftmbToken,
  );

  const aFTMbBalance = await aFTMbContract.methods
    .balanceOf(provider.currentAccount)
    .call();

  return new BigNumber(web3.utils.fromWei(aFTMbBalance));
};
