import axios, { AxiosInstance, AxiosResponse } from 'axios';
import BigNumber from 'bignumber.js';

import { IWeb3SendResult, Web3KeyWriteProvider } from 'provider';

import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { SupportedChainIDS } from 'modules/common/const';

import { configFromEnv } from '../../api/config';
import ABI_ERC20 from '../../api/contract/IERC20.json';
import { getBridgeAddr } from '../utils/getBridgeAddr';

import ABI_BRIDGE from './contracts/CrossChainBridge.json';
import { IBridgeNotarizeResponse, IBridgeApproveResponse } from './types/types';

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
    const providerManager = ProviderManagerSingleton.getInstance();
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

  public async checkAllowance(
    amount: BigNumber,
    tokenAddr: string,
  ): Promise<boolean> {
    const tokenContract = this.provider.createContract(ABI_ERC20, tokenAddr);
    const web3 = this.provider.getWeb3();
    const bridgeAddr = getBridgeAddr(this.provider.currentChain);
    const allowance = new BigNumber(
      await tokenContract.methods
        .allowance(this.provider.currentAccount, bridgeAddr)
        .call(),
    );
    const rawAmount = web3.utils.toWei(amount.toString());

    return allowance.isGreaterThanOrEqualTo(rawAmount);
  }

  public async approve(
    amount: BigNumber,
    tokenAddr: string,
  ): Promise<IBridgeApproveResponse> {
    const isAllowed = await this.checkAllowance(amount, tokenAddr);

    if (isAllowed) {
      return {
        isApproved: true,
      };
    }

    const tokenContract = this.provider.createContract(ABI_ERC20, tokenAddr);
    const web3 = this.provider.getWeb3();
    const rawAmount = web3.utils.toWei(amount.toString());
    const bridgeAddr = getBridgeAddr(this.provider.currentChain);

    const approveData = tokenContract.methods
      .approve(bridgeAddr, rawAmount)
      .encodeABI();

    const { transactionHash } = await this.provider.sendTransactionAsync(
      this.provider.currentAccount,
      tokenAddr,
      { data: approveData },
    );

    return {
      isApproved: false,
      txHash: transactionHash,
    };
  }

  public async deposit(
    amount: BigNumber,
    fromToken: string,
    toChainId: SupportedChainIDS,
  ): Promise<IWeb3SendResult> {
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

    return this.provider.sendTransactionAsync(
      this.provider.currentAccount,
      bridgeAddr,
      { data: depositData },
    );
  }

  public async notarize(
    transactionHash: string,
    chainId: SupportedChainIDS,
  ): Promise<AxiosResponse<IBridgeNotarizeResponse, unknown>> {
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
  ): Promise<IWeb3SendResult> {
    const bridgeAddr = getBridgeAddr(this.provider.currentChain);
    const bridgeContract = this.provider.createContract(ABI_BRIDGE, bridgeAddr);

    const withdrawalData = bridgeContract.methods
      .withdraw(proof, receipt, signature)
      .encodeABI();

    return this.provider.sendTransactionAsync(
      this.provider.currentAccount,
      bridgeAddr,
      { data: withdrawalData },
    );
  }
}
