import BigNumber from 'bignumber.js';
import { configFromEnv } from 'modules/api/config';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { ETH_SCALE_FACTOR, isMainnet, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { convertNumberToHex } from 'modules/common/utils/numbers/converters';
import { getAPY } from 'modules/stake/api/getAPY';
import {
  getTxEventsHistoryGroup,
  TTxEventsHistoryGroupData,
} from 'modules/stake/api/getTxEventsHistoryGroup';
import { IWeb3SendResult, Web3KeyProvider } from 'provider';
import {
  AvailableReadProviders,
  AvailableWriteProviders,
} from 'provider/providerManager/types';
import { Contract, EventData } from 'web3-eth-contract';
import AFTMbAbi from './contracts/aFTMb.json';
import FantomPoolAbi from './contracts/FantomPool.json';

export enum EFantomPoolEvents {
  TokensBurned = 'TokensBurned',
  Withdrawn = 'Withdrawn',
  StakeReceived = 'StakeReceived',
}

const { fantomConfig } = configFromEnv();
const providerManager = ProviderManagerSingleton.getInstance();
const providerId = AvailableWriteProviders.ethCompatible;

export const stake = async (amount: BigNumber): Promise<IWeb3SendResult> => {
  const provider = await getProvider();
  const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);
  const fantomPoolContract = getFantomPoolContract(provider);

  return fantomPoolContract.methods.stake().send({
    from: provider.currentAccount,
    value: hexAmount,
  });
};

export const unstake = async (amount: BigNumber): Promise<IWeb3SendResult> => {
  const provider = await getProvider();
  const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);
  const fantomPoolContract = getFantomPoolContract(provider);

  return fantomPoolContract.methods.burn(hexAmount).send({
    from: provider.currentAccount,
  });
};

export const getBurnFee = async (amount: BigNumber): Promise<BigNumber> => {
  const provider = await getProvider();
  const web3 = provider.getWeb3();
  const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);
  const fantomPoolContract = getFantomPoolContract(provider);
  const burnFee = await fantomPoolContract.methods.getBurnFee(hexAmount).call();

  return new BigNumber(web3.utils.fromWei(burnFee));
};

export const getMinimumStake = async (): Promise<BigNumber> => {
  const provider = await getProvider();
  const web3 = provider.getWeb3();
  const fantomPoolContract = getFantomPoolContract(provider);
  const minStake = await fantomPoolContract.methods.getMinimumStake().call();

  return new BigNumber(web3.utils.fromWei(minStake));
};

export const addAftmbToWallet = async (): Promise<void> => {
  const provider = await getProvider();

  await provider.addTokenToWallet({
    address: fantomConfig.aftmbToken,
    symbol: Token.aFTMb,
    decimals: 18,
  });
};

export const getFtmBalance = async (): Promise<BigNumber> => {
  const provider = await getProvider();
  const web3 = provider.getWeb3();
  const ftmBalance = await web3.eth.getBalance(provider.currentAccount);

  return new BigNumber(web3.utils.fromWei(ftmBalance));
};

export const getAftmbBalance = async (): Promise<BigNumber> => {
  const provider = await getProvider();
  const web3 = provider.getWeb3();
  const aFTMbContract = getAftmbTokenContract(provider);

  const aFTMbBalance = await aFTMbContract.methods
    .balanceOf(provider.currentAccount)
    .call();

  return new BigNumber(web3.utils.fromWei(aFTMbBalance));
};

export const getAftmbAPY = async (): Promise<BigNumber> => {
  const provider = await providerManager.getReadProvider(
    isMainnet
      ? AvailableReadProviders.ftmOperaHttpProvider
      : AvailableReadProviders.ftmTestnetHttpProvider,
  );

  const aFTMbContract = getAftmbTokenContract(provider);

  return getAPY({
    tokenContract: aFTMbContract,
    web3: provider.getWeb3(),
  });
};

export const getTxHistory = async (): Promise<{
  stakeEvents: TTxEventsHistoryGroupData;
  pendingEvents: TTxEventsHistoryGroupData;
  withdrawnEvents: TTxEventsHistoryGroupData;
  totalPending: BigNumber;
}> => {
  const provider = await getProvider();
  const fantomPoolContract = getFantomPoolContract(provider);
  const web3 = provider.getWeb3();

  const firstWrId: string = await fantomPoolContract.methods.firstWrId().call();

  const [stakeRawEvents, unstakeRawEvents, withdrawnRawEvents] =
    await Promise.all([
      // event StakeReceived is emitted once transaction is successfull
      fantomPoolContract.getPastEvents(EFantomPoolEvents.StakeReceived, {
        fromBlock: 'earliest',
        toBlock: 'latest',
        filter: {
          staker: provider.currentAccount,
        },
      }),
      // To gen pending withdrawal requests, one can get all TokensBurned events for given staker
      fantomPoolContract.getPastEvents(EFantomPoolEvents.TokensBurned, {
        fromBlock: 'earliest',
        toBlock: 'latest',
        filter: {
          staker: provider.currentAccount,
        },
      }),
      fantomPoolContract.getPastEvents(EFantomPoolEvents.Withdrawn, {
        fromBlock: 'earliest',
        toBlock: 'latest',
        filter: {
          staker: provider.currentAccount,
        },
      }),
    ]);

  let pendingRawEvents: EventData[] = [];
  for (const current of unstakeRawEvents) {
    // Events with wrId >= firstWrId are pending
    if (+current.returnValues.wrId >= +firstWrId) {
      pendingRawEvents.push(current);
    }
  }

  const [stakeEvents, withdrawnEvents, pendingEvents] = await Promise.all(
    [stakeRawEvents, withdrawnRawEvents, pendingRawEvents].map(rawEvents => {
      return getTxEventsHistoryGroup({ rawEvents, web3 });
    }),
  );

  let totalPending = ZERO;
  for (const event of pendingEvents) {
    totalPending = totalPending.plus(event.txAmount);
  }

  return {
    stakeEvents,
    pendingEvents,
    withdrawnEvents,
    totalPending,
  };
};

const getFantomPoolContract = (provider: Web3KeyProvider): Contract => {
  return provider.createContract(FantomPoolAbi, fantomConfig.fantomPool);
};

const getAftmbTokenContract = (provider: Web3KeyProvider): Contract => {
  return provider.createContract(AFTMbAbi, fantomConfig.aftmbToken);
};

const getProvider = async (): Promise<Web3KeyProvider> => {
  const provider = await providerManager.getProvider(providerId);

  if (!provider.isConnected()) {
    await provider.connect();
  }

  return provider;
};
