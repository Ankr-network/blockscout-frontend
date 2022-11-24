import { Contract } from 'web3-eth-contract';
import BigNumber from 'bignumber.js';
import { Web3KeyWriteProvider, IWeb3SendResult } from '@ankr.com/provider';

import {
  Base64,
  PrefixedHex,
  Web3Address,
  base64ToPrefixedHex,
} from '../common';
import { IPremiumPlanContractManager } from './interfaces';
import { IContractManagerConfig, IDepositAnkrToWalletResult } from './types';
import ABI_ANKR_TOKEN from './abi/AnkrToken.json';
import ABI_ANKR_PROTOCOL from './abi/AnkrProtocol.json';
import { getPastEventsBlockchain } from './utils';

export class PremiumPlanContractManager implements IPremiumPlanContractManager {
  private readonly ankrWalletContract: Contract;

  private readonly ankrTokenContract: Contract;

  private readonly cachedEncryptionPublicKeys = new Map<Web3Address, Base64>();

  constructor(
    private readonly keyProvider: Web3KeyWriteProvider,
    private readonly config: IContractManagerConfig,
  ) {
    this.ankrWalletContract = keyProvider.createContract(
      ABI_ANKR_PROTOCOL,
      config.premiumPlanContractAddress,
    );

    this.ankrTokenContract = keyProvider.createContract(
      ABI_ANKR_TOKEN,
      config.ankrTokenContractAddress,
    );
  }

  async getMetamaskEncryptionPublicKey(account: Web3Address): Promise<Base64> {
    const cachedKey = this.cachedEncryptionPublicKeys.get(account);

    if (cachedKey) return cachedKey;

    const publicKey = await this.keyProvider.getWeb3().givenProvider.request({
      method: 'eth_getEncryptionPublicKey',
      params: [account],
    });
    this.cachedEncryptionPublicKeys.set(account, publicKey);

    // eslint-disable-next-line no-console
    console.log(`Encryption public key is: ${publicKey}`);

    return publicKey;
  }

  async faucetAnkrTokensForTest(): Promise<void> {
    const { currentAccount } = this.keyProvider;

    const receipt = await this.ankrTokenContract.methods
      .mint(currentAccount, '1000000000000000000000000000')
      .send({ from: currentAccount });

    // eslint-disable-next-line no-console
    console.log(receipt);
  }

  async getLatestUserEventLogHash(
    user: Web3Address,
  ): Promise<PrefixedHex | false> {
    const contract = this.ankrWalletContract;

    const startBlock = this.config.premiumPlanContractCreationBlockNumber;
    const latestBlockNumber = await this.keyProvider
      .getWeb3()
      .eth.getBlockNumber();

    const tierAssignedEvents = await getPastEventsBlockchain({
      contract,
      eventName: 'TierAssigned',
      filter: {
        sender: user,
      },
      startBlock,
      latestBlockNumber,
    });

    // eslint-disable-next-line no-console
    console.log(
      `Found next deposit event logs: ${JSON.stringify(
        tierAssignedEvents,
        null,
        2,
      )}`,
    );

    const validEvents = tierAssignedEvents.filter(event => {
      const { sender, roles, expires } = event.returnValues;

      // eslint-disable-next-line no-console
      console.log(
        `Found user event log: user=${sender} roles=${roles} expires=${expires}`,
      );

      return new Date().getTime() / 1000 < expires;
    });

    if (!validEvents.length) return false;

    return validEvents[validEvents.length - 1].transactionHash;
  }

  async checkUserHaveEnoughAllowance(amount: BigNumber): Promise<boolean> {
    const { currentAccount } = this.keyProvider;

    const scaledAmount = amount.multipliedBy(10 ** 18);
    const scaledAllowance = new BigNumber(
      await this.ankrTokenContract.methods
        .allowance(currentAccount, this.config.premiumPlanContractAddress)
        .call(),
    );

    return scaledAllowance.isGreaterThanOrEqualTo(scaledAmount);
  }

  async allowTokensForAnkrDeposit(
    amount: BigNumber,
  ): Promise<IWeb3SendResult | false> {
    const { currentAccount } = this.keyProvider;

    const scaledAmount = amount.multipliedBy(10 ** 18);
    const scaledBalance = new BigNumber(
      await this.ankrTokenContract.methods.balanceOf(currentAccount).call(),
    );

    if (scaledAmount.isGreaterThan(scaledBalance)) {
      throw new Error(`You don't have enough Ankr tokens`);
    }

    const scaledAllowance = new BigNumber(
      await this.ankrTokenContract.methods
        .allowance(currentAccount, this.config.premiumPlanContractAddress)
        .call(),
    );

    if (scaledAllowance.isGreaterThanOrEqualTo(scaledAmount)) {
      return false;
    }

    const data = this.ankrTokenContract.methods
      .approve(
        this.config.premiumPlanContractAddress,
        scaledAmount.toString(10),
      )
      .encodeABI();

    return this.keyProvider.sendTransactionAsync(
      currentAccount,
      this.config.ankrTokenContractAddress,
      {
        data,
        gasLimit: '200000',
      },
    );
  }

  async depositAnkrToWallet(
    amount: BigNumber,
    expiresAfter = '31536000',
  ): Promise<IDepositAnkrToWalletResult> {
    const { currentAccount } = this.keyProvider;

    // calc scaled amount
    const scaledAmount = amount.multipliedBy(10 ** 18);

    // make sure user have enough balance
    const scaledBalance = new BigNumber(
      await this.ankrTokenContract.methods.balanceOf(currentAccount).call(),
    );

    if (scaledAmount.isGreaterThan(scaledBalance)) {
      throw new Error(`You don't have enough Ankr tokens`);
    }

    // make sure user have enough allowance
    const scaledAllowance = new BigNumber(
      await this.ankrTokenContract.methods
        .allowance(currentAccount, this.config.premiumPlanContractAddress)
        .call(),
    );

    // eslint-disable-next-line consistent-return
    const allowanceSendResult = await (() => {
      if (scaledAllowance.isLessThan(scaledAmount)) {
        const data = this.ankrTokenContract.methods
          .approve(
            this.config.premiumPlanContractAddress,
            scaledAmount.toString(10),
          )
          .encodeABI();
        return this.keyProvider.sendTransactionAsync(
          currentAccount,
          this.config.ankrTokenContractAddress,
          {
            data,
            gasLimit: '200000',
          },
        );
      }
    })();

    // get encryption public key
    const base64EncryptionPublicKey = await this.getMetamaskEncryptionPublicKey(
      currentAccount,
    );
    const hexEncryptionPublicKey = base64ToPrefixedHex(
      base64EncryptionPublicKey,
    );

    // send deposit tx
    const data = this.ankrWalletContract.methods
      .deposit(scaledAmount.toString(10), expiresAfter, hexEncryptionPublicKey)
      .encodeABI();

    const depositSendResult = await this.keyProvider.sendTransactionAsync(
      currentAccount,
      this.config.premiumPlanContractAddress,
      {
        data,
        gasLimit: '200000',
      },
    );

    return {
      allowance: allowanceSendResult,
      deposit: depositSendResult,
    };
  }

  async getCurrentAnkrBalance(): Promise<BigNumber> {
    const { currentAccount } = this.keyProvider;

    return this.keyProvider.getTokenBalance(
      this.ankrTokenContract,
      currentAccount,
    );
  }

  async getAnkrBalance(user: Web3Address): Promise<BigNumber> {
    return this.keyProvider.getTokenBalance(this.ankrTokenContract, user);
  }
}
