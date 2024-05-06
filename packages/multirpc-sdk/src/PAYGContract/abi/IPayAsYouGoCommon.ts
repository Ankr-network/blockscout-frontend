import BN from 'bn.js';
import BigNumber from 'bignumber.js';
import {
  PromiEvent,
  TransactionReceipt,
  EventResponse,
  EventData,
  Web3ContractContext,
} from 'ethereum-abi-types-generator';

export interface CallOptions {
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export interface SendOptions {
  from: string;
  value?: number | string | BN | BigNumber;
  gasPrice?: string;
  gas?: number;
}

export interface EstimateGasOptions {
  from?: string;
  value?: number | string | BN | BigNumber;
  gas?: number;
}

export interface MethodPayableReturnContext {
  send(options: SendOptions): PromiEvent<TransactionReceipt>;
  send(
    options: SendOptions,
    callback: (error: Error, result: any) => void,
  ): PromiEvent<TransactionReceipt>;
  estimateGas(options: EstimateGasOptions): Promise<number>;
  estimateGas(
    options: EstimateGasOptions,
    callback: (error: Error, result: any) => void,
  ): Promise<number>;
  encodeABI(): string;
}

export interface MethodConstantReturnContext<TCallReturn> {
  call(): Promise<TCallReturn>;
  call(options: CallOptions): Promise<TCallReturn>;
  call(
    options: CallOptions,
    callback: (error: Error, result: TCallReturn) => void,
  ): Promise<TCallReturn>;
  encodeABI(): string;
}

export interface MethodReturnContext extends MethodPayableReturnContext {}

export type ContractContext = Web3ContractContext<
  IPayAsYouGoCommon,
  IPayAsYouGoCommonMethodNames,
  IPayAsYouGoCommonEventsContext,
  IPayAsYouGoCommonEvents
>;
export type IPayAsYouGoCommonEvents =
  | 'ConsensusUpdated'
  | 'DepositReceived'
  | 'GovernanceUpdated'
  | 'Initialized'
  | 'OwnershipTransferred'
  | 'Paused'
  | 'PaymentCollected'
  | 'TokenListUpdated'
  | 'TreasuryUpdated'
  | 'Unpaused';
export interface IPayAsYouGoCommonEventsContext {
  ConsensusUpdated(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  DepositReceived(
    parameters: {
      filter?: { user?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  GovernanceUpdated(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  Initialized(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  OwnershipTransferred(
    parameters: {
      filter?: {
        previousOwner?: string | string[];
        newOwner?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  Paused(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  PaymentCollected(
    parameters: {
      filter?: { treasury?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  TokenListUpdated(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  TreasuryUpdated(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  Unpaused(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
}
export type IPayAsYouGoCommonMethodNames =
  | 'addOrUpdateToken'
  | 'changeConsensus'
  | 'changeGovernance'
  | 'changeTreasury'
  | 'collectPayment'
  | 'deleteToken'
  | 'deposit'
  | 'depositForUser'
  | 'disableToken'
  | 'enableToken'
  | 'getClaimableAmount'
  | 'getConsensus'
  | 'getGovernance'
  | 'getSupportedTokens'
  | 'getTreasury'
  | 'initialize'
  | 'owner'
  | 'pause'
  | 'paused'
  | 'renounceOwnership'
  | 'transferOwnership'
  | 'unpause';
export interface ConsensusUpdatedEventEmittedResponse {
  prevConsensus: string;
  newConsensus: string;
}
export interface DepositReceivedEventEmittedResponse {
  user: string;
  token: string;
  amount: string;
}
export interface GovernanceUpdatedEventEmittedResponse {
  prevGovernance: string;
  newGovernance: string;
}
export interface InitializedEventEmittedResponse {
  version: string;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface PausedEventEmittedResponse {
  account: string;
}
export interface PaymentCollectedEventEmittedResponse {
  treasury: string;
  tokens: string[];
  amounts: string[];
}
export interface TokenListUpdatedEventEmittedResponse {
  token: string;
  action: string | number;
}
export interface TreasuryUpdatedEventEmittedResponse {
  prevTreasury: string;
  newTreasury: string;
}
export interface UnpausedEventEmittedResponse {
  account: string;
}
export interface SupportedtokenexResponse {
  token: string;
  minDeposit: string;
  active: boolean;
}
export interface IPayAsYouGoCommon {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param minAmount Type: uint256, Indexed: false
   * @param active Type: bool, Indexed: false
   */
  addOrUpdateToken(
    token: string,
    minAmount: string,
    active: boolean,
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newConsensus Type: address, Indexed: false
   */
  changeConsensus(newConsensus: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newGovernance Type: address, Indexed: false
   */
  changeGovernance(newGovernance: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newTreasury Type: address, Indexed: false
   */
  changeTreasury(newTreasury: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokens Type: address[], Indexed: false
   * @param amounts Type: uint256[], Indexed: false
   * @param treasury Type: address, Indexed: false
   */
  collectPayment(
    tokens: string[],
    amounts: string[],
    treasury: string,
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   */
  deleteToken(token: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  deposit(token: string, amount: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   * @param user Type: address, Indexed: false
   */
  depositForUser(
    token: string,
    amount: string,
    user: string,
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   */
  disableToken(token: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   */
  enableToken(token: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param token Type: address, Indexed: false
   */
  getClaimableAmount(token: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getConsensus(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getGovernance(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getSupportedTokens(): MethodConstantReturnContext<SupportedtokenexResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getTreasury(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param consensus Type: address, Indexed: false
   * @param treasury Type: address, Indexed: false
   * @param governance Type: address, Indexed: false
   * @param tokens Type: address[], Indexed: false
   * @param minAmounts Type: uint256[], Indexed: false
   */
  initialize(
    consensus: string,
    treasury: string,
    governance: string,
    tokens: string[],
    minAmounts: string[],
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  pause(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  paused(): MethodConstantReturnContext<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  renounceOwnership(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newOwner Type: address, Indexed: false
   */
  transferOwnership(newOwner: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  unpause(): MethodReturnContext;
}
