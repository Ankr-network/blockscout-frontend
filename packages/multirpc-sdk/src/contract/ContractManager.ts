import { Contract } from 'web3-eth-contract';
import { IWeb3KeyProvider, IWeb3SendResult } from '@ankr.com/stakefi-web3';
import BigNumber from 'bignumber.js';

import {
  Base64,
  PrefixedHex,
  Web3Address,
  base64ToPrefixedHex,
} from '../common';
import { IContractManager } from './interfaces';
import { IContractManagerConfig, IDepositAnkrToWalletResult } from './types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ABI_ANKR_PROTOCOL = require('../abi/AnkrProtocol.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ABI_ANKR_TOKEN = require('../abi/AnkrToken.json');

export class ContractManager implements IContractManager {
  private readonly ankrWalletContract: Contract;

  private readonly ankrTokenContract: Contract;

  private readonly cachedEncryptionPublicKeys = new Map<Web3Address, Base64>();

  constructor(
    private readonly keyProvider: IWeb3KeyProvider,
    private readonly config: IContractManagerConfig,
  ) {
    this.ankrWalletContract = keyProvider.createContract(
      ABI_ANKR_PROTOCOL,
      config.ankrWalletContractAddress,
    );

    this.ankrTokenContract = keyProvider.createContract(
      ABI_ANKR_TOKEN,
      config.ankrTokenContractAddress,
    );
  }

  async getEncryptionPublicKey(account: Web3Address): Promise<Base64> {
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

  async decryptMessageUsingPrivateKey(
    compatibleJsonData: string,
  ): Promise<string> {
    const account = this.keyProvider.currentAccount();

    return this.keyProvider.getWeb3().givenProvider.request({
      method: 'eth_decrypt',
      params: [compatibleJsonData, account],
    });
  }

  async faucetAnkrTokensForTest(): Promise<void> {
    const account = this.keyProvider.currentAccount();

    const receipt = await this.ankrTokenContract.methods
      .mint(account, '1000000000000000000000000000')
      .send({ from: account });
  
    // eslint-disable-next-line no-console
    console.log(receipt);
  }

  async getLatestUserEventLogHash(
    user: Web3Address,
  ): Promise<PrefixedHex | false> {
    const tierAssignedEvents = await this.ankrWalletContract.getPastEvents(
      'TierAssigned',
      {
        filter: {
          sender: user,
        },
        fromBlock: 'earliest',
        toBlock: 'latest',
      },
    );

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
    const currentAccount = this.keyProvider.currentAccount();
    const scaledAmount = amount.multipliedBy(10 ** 18);
    const scaledAllowance = new BigNumber(
      await this.ankrTokenContract.methods
        .allowance(currentAccount, this.config.ankrWalletContractAddress)
        .call(),
    );
  
    return scaledAllowance.isGreaterThanOrEqualTo(scaledAmount);
  }

  async allowTokensForAnkrDeposit(
    amount: BigNumber,
  ): Promise<IWeb3SendResult | false> {
    const currentAccount = this.keyProvider.currentAccount();
    const scaledAmount = amount.multipliedBy(10 ** 18);
    const scaledBalance = new BigNumber(
      await this.ankrTokenContract.methods.balanceOf(currentAccount).call(),
    );

    if (scaledAmount.isGreaterThan(scaledBalance)) {
      throw new Error(`You don't have enough Ankr tokens`);
    }

    const scaledAllowance = new BigNumber(
      await this.ankrTokenContract.methods
        .allowance(currentAccount, this.config.ankrWalletContractAddress)
        .call(),
    );

    if (scaledAllowance.isGreaterThanOrEqualTo(scaledAmount)) {
      return false;
    }

    const data = this.ankrTokenContract.methods
      .approve(this.config.ankrWalletContractAddress, scaledAmount.toString(10))
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
    const currentAccount = this.keyProvider.currentAccount();

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
        .allowance(currentAccount, this.config.ankrWalletContractAddress)
        .call(),
    );

    // eslint-disable-next-line consistent-return
    const allowanceSendResult = await (() => {
      if (scaledAllowance.isLessThan(scaledAmount)) {
        const data = this.ankrTokenContract.methods
          .approve(
            this.config.ankrWalletContractAddress,
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
    const base64EncryptionPublicKey = await this.getEncryptionPublicKey(
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
      this.config.ankrWalletContractAddress,
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
    const currentAccount = this.keyProvider.currentAccount();
    return this.keyProvider.getTokenBalance(
      this.ankrTokenContract,
      currentAccount,
    );
  }

  async getAnkrBalance(user: Web3Address): Promise<BigNumber> {
    return this.keyProvider.getTokenBalance(this.ankrTokenContract, user);
  }
}
