import axios, { AxiosInstance, AxiosResponse } from 'axios';
import BigNumber from 'bignumber.js';

import { IWeb3SendResult, Web3KeyWriteProvider } from '@ankr.com/provider';
import {
  ABI_ERC20,
  MATIC_SCALE_FACTOR,
  MAX_UINT256_SCALE,
} from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import {
  ETH_SCALE_FACTOR,
  MAX_UINT256,
  SupportedChainIDS,
} from 'modules/common/const';
import { convertNumberToHex } from 'modules/common/utils/numbers/converters';
import { convertFromWei } from 'modules/common/utils/numbers/convertFromWei';

import { configFromEnv } from '../../api/config';
import { AvailableBridgeTokens } from '../types';
import { getBridgeAddr } from '../utils/getBridgeAddr';
import { getTokenAddr } from '../utils/getTokenAddr';

import ABI_BRIDGE from './contracts/CrossChainBridge.json';
import { IBridgeNotarizeResponse } from './types/types';

export class BridgeSDK {
  private static instance?: BridgeSDK;

  public api: AxiosInstance;

  private constructor(public readonly provider: Web3KeyWriteProvider) {
    BridgeSDK.instance = this;
    const { gatewayConfig } = configFromEnv();

    this.api = axios.create({
      baseURL: gatewayConfig.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    });
  }

  public static async getInstance(): Promise<BridgeSDK> {
    const providerManager = getProviderManager();
    const provider = await providerManager.getETHWriteProvider();

    const isActualProvider = BridgeSDK.instance?.provider === provider;

    if (BridgeSDK.instance && isActualProvider) {
      return BridgeSDK.instance;
    }

    return new BridgeSDK(provider);
  }

  public async getBalance(tokenAddr: string): Promise<BigNumber> {
    const web3 = this.provider.getWeb3();
    const tokenContract = this.provider.createContract(ABI_ERC20, tokenAddr);

    const balance: string = await tokenContract.methods
      .balanceOf(this.provider.currentAccount)
      .call();

    return new BigNumber(web3.utils.fromWei(balance));
  }

  public async getAllowance(tokenAddr: string): Promise<BigNumber> {
    const tokenContract = this.provider.createContract(ABI_ERC20, tokenAddr);
    const bridgeAddr = getBridgeAddr(this.provider.currentChain);
    const allowance = await tokenContract.methods
      .allowance(this.provider.currentAccount, bridgeAddr)
      .call();
    return convertFromWei(allowance);
  }

  public async checkAllowance(
    amount: BigNumber,
    tokenAddr: string,
  ): Promise<boolean> {
    const allowance = await this.getAllowance(tokenAddr);

    return allowance.isGreaterThanOrEqualTo(amount);
  }

  public async approve(
    amount: BigNumber,
    token: AvailableBridgeTokens,
    fromChainId: SupportedChainIDS,
  ): Promise<IWeb3SendResult> {
    const tokenAddr = getTokenAddr(token, fromChainId);
    const tokenContract = this.provider.createContract(ABI_ERC20, tokenAddr);
    const bridgeAddr = getBridgeAddr(this.provider.currentChain);

    const amountHex = convertNumberToHex(
      amount,
      amount.isEqualTo(MAX_UINT256)
        ? MAX_UINT256_SCALE
        : this.getTokenScale(fromChainId),
    );

    const approveData = tokenContract.methods
      .approve(bridgeAddr, amountHex)
      .encodeABI();

    return this.provider.sendTransactionAsync(
      this.provider.currentAccount,
      tokenAddr,
      { data: approveData, estimate: true },
    );
  }

  private getTokenScale(fromChainId: SupportedChainIDS) {
    switch (fromChainId) {
      case SupportedChainIDS.MAINNET:
      case SupportedChainIDS.GOERLI:
      case SupportedChainIDS.BSC:
      case SupportedChainIDS.BSC_TESTNET:
        return ETH_SCALE_FACTOR;
      case SupportedChainIDS.POLYGON:
      case SupportedChainIDS.POLYGON_MUMBAI_TESTNET:
        return MATIC_SCALE_FACTOR;
      default:
        throw new Error('Unsupported chain');
    }
  }

  public async deposit(
    amount: BigNumber,
    fromToken: string,
    toChainId: SupportedChainIDS,
  ): Promise<string> {
    const bridgeAddr = getBridgeAddr(this.provider.currentChain);
    const bridgeContract = this.provider.createContract(ABI_BRIDGE, bridgeAddr);

    const web3 = this.provider.getWeb3();

    const rawAmount = web3.utils.toWei(amount.toString());

    // function deposit(address fromToken, uint256 toChain, address toAddress, uint256 amount) external;
    // TODO Deposit for native token
    const depositData = bridgeContract.methods
      .deposit(
        fromToken,
        web3.utils.numberToHex(toChainId),
        this.provider.currentAccount,
        rawAmount,
      )
      .encodeABI();

    const { transactionHash } = await this.provider.sendTransactionAsync(
      this.provider.currentAccount,
      bridgeAddr,
      { data: depositData, estimate: true },
    );

    return transactionHash;
  }

  public async notarize(
    transactionHash: string,
    chainId: SupportedChainIDS,
  ): Promise<AxiosResponse<IBridgeNotarizeResponse>> {
    return this.api.post<IBridgeNotarizeResponse>(
      '/v1alpha/bridge/v2/notarize',
      {
        transactionHash,
        chainId: chainId.toString(), // Can it be a number type?
      },
    );
  }

  // function withdraw(bytes calldata encodedProof, bytes calldata rawReceipt, bytes calldata receiptRootSignature) external;
  public async withdraw(
    proof: string,
    receipt: string,
    signature: string,
  ): Promise<string> {
    const bridgeAddr = getBridgeAddr(this.provider.currentChain);
    const bridgeContract = this.provider.createContract(ABI_BRIDGE, bridgeAddr);

    const withdrawalData = bridgeContract.methods
      .withdraw(proof, receipt, signature)
      .encodeABI();

    const { transactionHash } = await this.provider.sendTransactionAsync(
      this.provider.currentAccount,
      bridgeAddr,
      { data: withdrawalData, estimate: true },
    );

    return transactionHash;
  }
}
