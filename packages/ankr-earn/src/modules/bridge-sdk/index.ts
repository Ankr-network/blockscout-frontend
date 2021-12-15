import { RequestManager } from './requestManager';
import {
  ICreateSwapResponse,
  ISwapResponse,
  ISwapStatus,
  ITokenResponse,
} from './entity';
import { IStkrSdk } from '../api';
import { BlockchainNetworkId } from 'modules/common/types';
import PEG_ETH_ABI from './Peg-ETH.json';
import { Contract } from 'web3-eth-contract';
import { ETH_DIVIDER, ETH_SCALE_FACTOR } from 'modules/common/const';
import BigNumber from 'bignumber.js';
import { ISendAsyncResult } from 'modules/api/provider';

const PEG_ETH_ADDRESS = '0x2170ed0880ac9a755fd29b2688956bd959f933f8';

const SYMBOL_ETHEREUM = 'ETH';
const SYMBOL_BSC = 'BSC';

const TOKEN_STANDARD_ETH = 'ETH';

export interface IPegEthToEthSwapDetails {
  enabled: boolean;
  name: string;
  iconUrl: string;
  min: number;
  max: number;
  bscDetails: {
    enabled: boolean;
    networkFee: number;
    rateFee: number;
    explorerUrl: string;
    withdrawalUnit: number;
    addressRegex: string;
    confirms: number;
  };
}

export interface ISwapConfirmsDetails {
  depositConfirms: number;
  swapConfirms: number;
}

export class BridgeSdk {
  private readonly requestManager: RequestManager = new RequestManager();
  private pegETHContract: Contract;

  constructor(private readonly stkr: IStkrSdk) {
    const Contract = this.stkr.getKeyProvider().getWeb3().eth.Contract as any; // Temporary any
    this.pegETHContract = new Contract(PEG_ETH_ABI as any, PEG_ETH_ADDRESS);
  }

  public isBridgeAvailable(): boolean {
    return [
      BlockchainNetworkId.mainnet,
      BlockchainNetworkId.smartchain,
    ].includes(this.stkr.getKeyProvider().currentNetwork() as any);
  }

  public isEthereumChain(): boolean {
    return (
      this.stkr.getKeyProvider().currentNetwork() ===
      BlockchainNetworkId.mainnet
    );
  }

  public isBinanceSmartChain(): boolean {
    return (
      this.stkr.getKeyProvider().currentNetwork() ===
      BlockchainNetworkId.smartchain
    );
  }

  public async calcStakingFeeRate(): Promise<BigNumber> {
    let networkFee = 0.045 * 3;
    try {
      const network = await this.requestManager.getNetworkByName(
        SYMBOL_ETHEREUM,
        SYMBOL_ETHEREUM,
      );
      const token = await this.requestManager.getTokenBySymbol(SYMBOL_ETHEREUM);
      console.log(`Required swap count: ${Math.ceil(32 / token.maxAmount)}`);
      networkFee = network.networkFee * Math.ceil(32 / token.maxAmount);
    } catch (e) {
      console.error(`Unable to calculate Binance Bridge network fee: ${e}`);
    }
    console.log(`Binance bridge network fee: ${networkFee}`);
    const stakingFeeRate = new BigNumber(`${networkFee * 2}`);
    console.log(`Current staking fee rate is: ${stakingFeeRate.toString(10)}`);
    return stakingFeeRate;
  }

  public async getPegEthToEthSwapDetails(): Promise<IPegEthToEthSwapDetails> {
    const token = await this.getEthToken(),
      network = await this.requestManager.getNetworkByName(
        SYMBOL_ETHEREUM,
        SYMBOL_BSC,
      );
    return {
      enabled: token.enabled,
      name: token.name,
      iconUrl: token.icon,
      min: token.minAmount,
      max: token.maxAmount,
      bscDetails: {
        enabled: network.depositEnabled && network.withdrawEnabled,
        networkFee: network.networkFee,
        rateFee: network.swapFeeRate,
        explorerUrl: network.txUrl,
        withdrawalUnit: network.withdrawAmountUnit,
        addressRegex: network.addressRegex,
        confirms: network.requiresConfirms,
      },
    };
  }

  public async calcSwapConfirms(
    response: ISwapResponse,
  ): Promise<ISwapConfirmsDetails> {
    const latestBlockHeight = await this.stkr
      .getKeyProvider()
      .latestBlockHeight();
    const depositConfirms = await this.calcTxConfirms(
        response.depositTxId,
        latestBlockHeight,
      ),
      swapConfirms = await this.calcTxConfirms(
        response.swapTxId,
        latestBlockHeight,
      );
    return {
      depositConfirms: depositConfirms,
      swapConfirms: swapConfirms,
    };
  }

  private async calcTxConfirms(
    txHash: string,
    latestHeight: number,
  ): Promise<number> {
    if (!txHash) {
      return 0;
    }
    const tx = await this.stkr
      .getKeyProvider()
      .getWeb3()
      .eth.getTransaction(txHash);
    if (!tx) {
      console.error(`Unable to find tx by hash ${txHash}`);
      return 0;
    } else if (!tx.blockNumber) {
      console.error(`Unable to find tx's height by hash ${txHash}`);
      return 0;
    }
    return latestHeight - tx.blockNumber;
  }

  public async getLatestWaitingForDepositSwap(): Promise<
    ISwapResponse | undefined
  > {
    return this.getLatestSwapByStatus('WaitingForDeposit');
  }

  public async getLatestDepositInProgressSwap(): Promise<
    ISwapResponse | undefined
  > {
    return this.getLatestSwapByStatus('DepositInProgress');
  }

  public async getLatestSwapByStatus(
    status: ISwapStatus,
  ): Promise<ISwapResponse | undefined> {
    const address = this.stkr.currentAccountOrThrow();
    const { swaps } = await this.requestManager.getSwaps({
      walletAddress: address,
      status: status,
    });

    if (!swaps.length) {
      return undefined;
    }

    swaps.sort((a, b) => {
      return (
        new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
      );
    });

    return swaps[0];
  }

  public async getEthToken(): Promise<ITokenResponse> {
    return this.requestManager.getTokenBySymbol(SYMBOL_ETHEREUM);
  }

  public async swapPegEthToEthForBEP20(
    // TODO convert to string or BigNumber
    amount: number,
  ): Promise<ICreateSwapResponse> {
    if (!(await this.isBinanceSmartChain())) {
      throw new Error(`Swap from `);
    }
    const address = this.stkr.currentAccountOrThrow();
    await this.checkSwapLimitationOrThrow(amount, SYMBOL_ETHEREUM, SYMBOL_BSC);
    const swapResponse = await this.requestManager.createSwap({
      amount: amount,
      fromNetwork: 'BSC',
      source: 921, // ?
      symbol: 'ETH',
      toAddress: address,
      toAddressLabel: '',
      toNetwork: 'ETH',
      walletAddress: address,
      walletNetwork: 'BSC',
    });
    this.verifySwapResponse(swapResponse);
    return swapResponse;
  }

  public async sendPegEthToBEP20(
    amount: number,
    toAddress: string,
  ): Promise<ISendAsyncResult> {
    const pegBalance = await this.getPegEthBalance();
    if (pegBalance.isLessThan(amount)) {
      throw new Error(`Insufficient balance on the account ${toAddress}`);
    }
    // noinspection TypeScriptValidateJSTypes
    const data: string = this.pegETHContract.methods
      .transfer(
        toAddress,
        new BigNumber(amount).multipliedBy(ETH_SCALE_FACTOR).toString(10),
      )
      .encodeABI();
    const currentAccount = await this.stkr.getKeyProvider().currentAccount();
    const result = await this.stkr
      .getKeyProvider()
      .sendAsync(currentAccount, PEG_ETH_ADDRESS, { data });
    console.log(`Peg-ETH has been sent: ${result.transactionHash}`);
    return result;
  }

  public async swapEthToPegEthForBEP20(
    amount: number,
  ): Promise<ICreateSwapResponse> {
    const address = this.stkr.currentAccountOrThrow();
    await this.checkSwapLimitationOrThrow(
      amount,
      SYMBOL_ETHEREUM,
      TOKEN_STANDARD_ETH,
    );
    const swapResponse = await this.requestManager.createSwap({
      amount: amount,
      fromNetwork: 'ETH',
      source: 921, // ?
      symbol: 'ETH',
      toAddress: address,
      toAddressLabel: '',
      toNetwork: 'BSC',
      walletAddress: address,
      walletNetwork: 'ETH',
    });
    this.verifySwapResponse(swapResponse);
    return swapResponse;
  }

  public async getPegEthBalance(): Promise<BigNumber> {
    const balance = await this.pegETHContract.methods
      .balanceOf(this.stkr.currentAccount())
      .call();
    return new BigNumber(balance).div(ETH_DIVIDER);
  }

  private verifySwapResponse(response: ICreateSwapResponse) {
    if (response.status !== 'WaitingForDeposit') {
      console.error(
        `Incorrect swap status, it should be WaitingForDeposit: ${JSON.stringify(
          response,
          null,
          2,
        )}`,
      );
    }
  }

  private async checkSwapLimitationOrThrow(
    amount: number,
    fromSymbol: string,
    targetNetwork: string,
  ) {
    if (!this.isBridgeAvailable()) {
      throw new Error(
        `Bridge is available only for Ethereum mainnet or Binance Smart Chain mainnet`,
      );
    }
    const address = this.stkr.currentAccountOrThrow();
    const token = await this.requestManager.getTokenBySymbol(fromSymbol);
    if (!token.enabled) {
      throw new Error(`Token ${token.name} is disabled for swap`);
    }

    if (amount < token.minAmount) {
      throw new Error(`Amount can't be less than ${token.minAmount}`);
    } else if (amount > token.maxAmount) {
      throw new Error(`Amount can't be greater than ${token.maxAmount}`);
    }

    const network = await this.requestManager.getNetworkByName(
      fromSymbol,
      targetNetwork,
    );

    if (!network.depositEnabled || !network.withdrawEnabled) {
      throw new Error(
        `Token ${token.name} is disabled for swap to ${targetNetwork} network`,
      );
    }

    const quota = await this.requestManager.getQuotaFor24Hour(
      fromSymbol,
      address,
    );

    if (quota.left - amount < 0) {
      throw new Error(
        `You've reached your daily quota, only ${quota.left} ETH left to swap`,
      );
    }
  }
}
