import BigNumber from 'bignumber.js';
import {
  Web3KeyWriteProvider,
  Web3KeyReadProvider,
  IWeb3SendResult,
  ProviderManager,
} from '@ankr.com/provider';
import { Contract } from 'web3-eth-contract';

import {
  EBlockchain,
  IAllowanceParams,
  IDepositStablecoinToPAYGParams,
  IGetAllowanceFeeParams,
  IGetAllowanceValueParams,
  IGetDepositStablecoinToPAYGFeeParams,
  ISetAllowanceParams,
  Web3Address,
} from '../common';
import {
  DepositTokenForUserParams,
  IThrowErrorIfDepositIsGreaterThanAllowanceParams,
  IThrowErrorIfValueIsGreaterThanBalanceParams,
  SendDepositTokenTransactionForUserParams,
} from './types';
import { IUsdcToken } from './abi/IUsdcToken';
import { IPayAsYouGoCommon } from './abi/IPayAsYouGoCommon';
import ABI_USDC_TOKEN from './abi/UsdcToken.json';
import ABI_PAY_AS_YOU_GO_COMMON from './abi/PayAsYouGoCommon.json';
import { UsdcPAYGReadContractManager } from './UsdcPAYGReadContractManager';
import {
  getBNAmountByTokenDecimals,
  getReadProviderByNetwork,
  getBNWithDecimalsFromString,
  convertNumberWithDecimalsToString,
} from '../utils';
import { DEPOSIT_ERROR, GAS_LIMIT, ZERO_STRING } from './const';


export class UsdcPAYGContractManager extends UsdcPAYGReadContractManager {
  protected readonly usdcTokenContract: Contract;

  protected readonly payAsYouGoWriteContract: Contract;

  // eslint-disable-next-line max-params
  constructor(
    protected readonly keyWriteProvider: Web3KeyWriteProvider,
    protected readonly keyReadProvider: Web3KeyReadProvider,
    public readonly tokenAddress: Web3Address, // token_contract_address
    public readonly depositContractAddress: Web3Address, // deposit_contract_address
  ) {
    super(keyReadProvider, tokenAddress);

    this.usdcTokenContract = keyWriteProvider.createContract(
      ABI_USDC_TOKEN,
      tokenAddress,
    );

    this.payAsYouGoWriteContract = keyWriteProvider.createContract(
      ABI_PAY_AS_YOU_GO_COMMON,
      depositContractAddress,
    );
  }

  public async getCurrentAccountBalance(network: EBlockchain) {
    const { currentAccount } = this.keyWriteProvider;

    return this.getAccountBalance(currentAccount, network);
  }

  private async sendAllowance({
    allowanceValue,
    tokenDecimals,
    depositContractAddress,
    tokenAddress,
  }: IAllowanceParams) {
    const { currentAccount } = this.keyWriteProvider;

    const amount = getBNAmountByTokenDecimals({
      value: allowanceValue,
      tokenDecimals,
    });

    const data = (this.usdcTokenContract.methods as IUsdcToken)
      .approve(depositContractAddress, amount.toString(10))
      .encodeABI();

    return this.keyWriteProvider.sendTransactionAsync(
      currentAccount,
      tokenAddress,
      {
        data,
        gasLimit: GAS_LIMIT,
      },
    );
  }

  public async getAllowanceFee({
    network,
    tokenAddress,
    amount,
    depositContractAddress,
    tokenDecimals,
  }: IGetAllowanceFeeParams) {
    const { currentAccount } = this.keyWriteProvider;

    const provider =
      await (new ProviderManager().getETHReadProvider(getReadProviderByNetwork(network)));

    const contract = provider.createContract(
      ABI_USDC_TOKEN,
      tokenAddress,
    );

    let gasAmount = 0;

    // we add here this structure to avoid an error
    // when requesting gas fee for approve tx
    // if don't have enough money
    // p.s. this is the specifics of USDC smart contract 
    // on arbitrum (and probably another chains)
    try {
      gasAmount = await (contract.methods as IUsdcToken)
        .approve(
          depositContractAddress,
          convertNumberWithDecimalsToString(amount, tokenDecimals),
        )
        .estimateGas({
          from: currentAccount,
          gas: Number(GAS_LIMIT),
        });

    } catch (e) {
      gasAmount = await (contract.methods as IUsdcToken)
        .approve(depositContractAddress, ZERO_STRING)
        .estimateGas({
          from: currentAccount,
          gas: Number(GAS_LIMIT),
        });
    }

    return this.keyReadProvider.getContractMethodFee(gasAmount);
  }

  private async sendDepositTransaction(
    depositValue: BigNumber,
    tokenAddress: Web3Address,
  ) {
    const { currentAccount } = this.keyWriteProvider;

    const data = (this.payAsYouGoWriteContract.methods as IPayAsYouGoCommon)
      .deposit(tokenAddress, depositValue.toString(10))
      .encodeABI();

    return this.keyWriteProvider.sendTransactionAsync(
      currentAccount,
      this.depositContractAddress,
      {
        data,
        gasLimit: GAS_LIMIT,
      },
    );
  }

  private async sendDepositTransactionForUser({
    tokenAddress,
    depositValue,
    targetAddress,
  }: SendDepositTokenTransactionForUserParams) {
    const { currentAccount } = this.keyWriteProvider;

    const data = (this.payAsYouGoWriteContract.methods as IPayAsYouGoCommon)
      .depositForUser(tokenAddress, depositValue.toString(10), targetAddress)
      .encodeABI();

    return this.keyWriteProvider.sendTransactionAsync(
      currentAccount,
      this.depositContractAddress,
      {
        data,
        estimate: true,
      },
    );
  }

  private async throwErrorIfValueIsGreaterThanBalance({
    amount,
    network,
  }: IThrowErrorIfValueIsGreaterThanBalanceParams) {
    const balance = await this.getCurrentAccountBalance(network);

    if (amount.isGreaterThan(new BigNumber(balance))) {
      throw new Error(`You don't have enough Usdc tokens`);
    }
  }

  private throwErrorIfValueIsLessThanZero(value: BigNumber) {
    if (value.isZero()) {
      throw new Error(`Deposit value can not be equal to 0`);
    }

    if (!value.isGreaterThan(0)) {
      throw new Error(`Deposit value should be more than 0`);
    }
  }

  private throwErrorIfDepositIsGreaterThanAllowance({
    depositValue,
    allowanceValue,
    tokenDecimals,
  }: IThrowErrorIfDepositIsGreaterThanAllowanceParams) {
    const amount = getBNWithDecimalsFromString(
      allowanceValue.toFixed(),
      tokenDecimals,
    );

    if (depositValue.isGreaterThan(allowanceValue)) {
      throw new Error(`${DEPOSIT_ERROR} (${amount})`);
    }
  }

  async setAllowance({
    allowanceValue,
    depositContractAddress,
    tokenAddress,
    network,
    tokenDecimals,
  }: ISetAllowanceParams) {
    const allowanceAmount = getBNAmountByTokenDecimals({
      value: allowanceValue,
      tokenDecimals,
    });

    this.throwErrorIfValueIsLessThanZero(allowanceAmount);
    await this.throwErrorIfValueIsGreaterThanBalance({
      amount: allowanceAmount,
      network,
    });

    return this.sendAllowance({
      allowanceValue,
      depositContractAddress,
      tokenAddress,
      tokenDecimals,
    });
  }

  async getAllowanceValue({
    network,
    depositContractAddress,
    tokenAddress,
  }: IGetAllowanceValueParams) {
    const { currentAccount } = this.keyWriteProvider;

    const provider =
      await (new ProviderManager().getETHReadProvider(getReadProviderByNetwork(network)));

    const contract = provider.createContract(
      ABI_USDC_TOKEN,
      tokenAddress,
    );

    const allowance = await (contract.methods as IUsdcToken)
      .allowance(currentAccount, depositContractAddress)
      .call();

    return new BigNumber(allowance);
  }

  async depositUSDC({
    amount,
    network,
    tokenAddress,
    tokenDecimals,
    depositContractAddress,
  }: IDepositStablecoinToPAYGParams): Promise<IWeb3SendResult> {
    const allowanceValue = await this.getAllowanceValue({
      network,
      tokenAddress,
      depositContractAddress,
    });

    this.throwErrorIfValueIsLessThanZero(amount);
    await this.throwErrorIfValueIsGreaterThanBalance({ amount, network });
    this.throwErrorIfDepositIsGreaterThanAllowance(
      {
        depositValue: amount,
        allowanceValue,
        tokenDecimals
      },
    );

    return this.sendDepositTransaction(amount, tokenAddress);
  }

  async getDepositUsdcFee({
    network,
    tokenAddress,
    amount,
    depositContractAddress,
    tokenDecimals,
  }: IGetDepositStablecoinToPAYGFeeParams) {
    const { currentAccount } = this.keyWriteProvider;

    const provider =
      await (new ProviderManager().getETHReadProvider(getReadProviderByNetwork(network)));

    const contract = provider.createContract(
      ABI_USDC_TOKEN,
      tokenAddress,
    );

    let gasAmount = 0;

    // we add here this structure to avoid an error
    // when requesting gas fee for approve tx
    // if don't have enough money
    // p.s. this is the specifics of USDC smart contract 
    // on arbitrum (and probably another chains)
    try {
      gasAmount = await (contract.methods as IUsdcToken)
        .transfer(
          depositContractAddress,
          convertNumberWithDecimalsToString(amount, tokenDecimals),
        )
        .estimateGas({ from: currentAccount, gas: Number(GAS_LIMIT) });
    } catch (e) {
      gasAmount = await (contract.methods as IUsdcToken)
        .transfer(depositContractAddress, ZERO_STRING)
        .estimateGas({ from: currentAccount, gas: Number(GAS_LIMIT) });
    }

    const gasPrice = await provider.getSafeGasPriceWei();

    const feeWei = gasPrice.multipliedBy(gasAmount);

    return this.keyReadProvider.getWeb3().utils.fromWei(feeWei.toString());
  }

  async depositUsdcForUser({
    depositValue,
    targetAddress,
    tokenAddress,
    tokenDecimals,
    network,
    depositContractAddress,
  }: DepositTokenForUserParams): Promise<IWeb3SendResult> {
    const allowanceValue = await this.getAllowanceValue({
      network,
      tokenAddress,
      depositContractAddress,
    });

    this.throwErrorIfValueIsLessThanZero(depositValue);
    await this.throwErrorIfValueIsGreaterThanBalance({
      amount: depositValue,
      network,
    });
    this.throwErrorIfDepositIsGreaterThanAllowance({
      depositValue,
      allowanceValue,
      tokenDecimals,
    });

    return this.sendDepositTransactionForUser({
      tokenAddress,
      depositValue,
      targetAddress,
    });
  }

  async rejectAllowance(
    depositContractAddress: Web3Address,
    tokenAddress: Web3Address,
  ) {
    return this.sendAllowance({
      allowanceValue: new BigNumber(0),
      // this number of decimals is default for eth chain
      // but for 0 amount it doesn't matter, because we'll send '0' anyway
      tokenDecimals: 18,
      depositContractAddress,
      tokenAddress,
    });
  }
}
