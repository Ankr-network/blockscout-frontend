import BN from 'bn.js';
import BigNumber from 'bignumber.js';
import {
  PromiEvent,
  TransactionReceipt,
  EventResponse,
  EventData,
  Web3ContractContext,
} from 'ethereum-abi-types-generator';

/* eslint-disable @typescript-eslint/ban-types */
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
  IPayAsYouGo,
  IPayAsYouGoMethodNames,
  IPayAsYouGoEventsContext,
  IPayAsYouGoEvents
>;
export type IPayAsYouGoEvents =
  | 'FeeCharged'
  | 'FundsLocked'
  | 'FundsUnlocked'
  | 'ProviderRequest'
  | 'TierAssigned'
  | 'TierLevelChanged'
  | 'TierLevelCreated'
  | 'TierLevelRemoved';
export interface IPayAsYouGoEventsContext {
  FeeCharged(
    parameters: {
      filter?: { sender?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  FundsLocked(
    parameters: {
      filter?: { sender?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  FundsUnlocked(
    parameters: {
      filter?: { sender?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  ProviderRequest(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  TierAssigned(
    parameters: {
      filter?: { sender?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  TierLevelChanged(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  TierLevelCreated(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  TierLevelRemoved(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
}
export type IPayAsYouGoMethodNames =
  | 'initialize'
  | 'getUserBalance'
  | 'deposit'
  | 'withdraw'
  | 'handleChargeFee'
  | 'handleWithdraw';
export interface FeeChargedEventEmittedResponse {
  sender: string;
  fee: string;
}
export interface FundsLockedEventEmittedResponse {
  sender: string;
  amount: string;
}
export interface FundsUnlockedEventEmittedResponse {
  sender: string;
  amount: string;
}
export interface ProviderRequestEventEmittedResponse {
  id: string | number[];
  sender: string;
  fee: string;
  callback: string;
  data: string | number[];
  expires: string;
}
export interface TierAssignedEventEmittedResponse {
  sender: string;
  amount: string;
  tier: string | number;
  roles: string;
  expires: string;
  publicKey: string | number[];
}
export interface TierLevelChangedEventEmittedResponse {
  level: string | number;
}
export interface TierLevelCreatedEventEmittedResponse {
  level: string | number;
}
export interface TierLevelRemovedEventEmittedResponse {
  level: string | number;
}
export interface GetUserBalanceResponse {
  available: string;
  pending: string;
}
export interface IPayAsYouGo {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param chainConfig Type: address, Indexed: false
   * @param ankrToken Type: address, Indexed: false
   */
  initialize(chainConfig: string, ankrToken: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param user Type: address, Indexed: false
   */
  getUserBalance(
    user: string,
  ): MethodConstantReturnContext<GetUserBalanceResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amount Type: uint256, Indexed: false
   * @param timeout Type: uint64, Indexed: false
   * @param publicKey Type: bytes32, Indexed: false
   */
  deposit(
    amount: string,
    timeout: string,
    publicKey: string | number[],
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amount Type: uint256, Indexed: false
   */
  withdraw(amount: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param users Type: address[], Indexed: false
   * @param fees Type: uint256[], Indexed: false
   */
  handleChargeFee(users: string[], fees: string[]): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param users Type: address[], Indexed: false
   * @param amounts Type: uint256[], Indexed: false
   * @param fees Type: uint256[], Indexed: false
   */
  handleWithdraw(
    users: string[],
    amounts: string[],
    fees: string[],
  ): MethodReturnContext;
}
