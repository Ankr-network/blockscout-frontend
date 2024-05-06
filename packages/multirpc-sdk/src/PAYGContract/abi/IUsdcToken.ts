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
  IUsdcToken,
  IUsdcTokenMethodNames,
  IUsdcTokenEventsContext,
  IUsdcTokenEvents
>;
export type IUsdcTokenEvents =
  | 'Approval'
  | 'AuthorizationCanceled'
  | 'AuthorizationUsed'
  | 'Blacklisted'
  | 'BlacklisterChanged'
  | 'Burn'
  | 'MasterMinterChanged'
  | 'Mint'
  | 'MinterConfigured'
  | 'MinterRemoved'
  | 'OwnershipTransferred'
  | 'Pause'
  | 'PauserChanged'
  | 'RescuerChanged'
  | 'Transfer'
  | 'UnBlacklisted'
  | 'Unpause';
export interface IUsdcTokenEventsContext {
  Approval(
    parameters: {
      filter?: { owner?: string | string[]; spender?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  AuthorizationCanceled(
    parameters: {
      filter?: {
        authorizer?: string | string[];
        nonce?: string | number[] | string | number[][];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  AuthorizationUsed(
    parameters: {
      filter?: {
        authorizer?: string | string[];
        nonce?: string | number[] | string | number[][];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  Blacklisted(
    parameters: {
      filter?: { _account?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  BlacklisterChanged(
    parameters: {
      filter?: { newBlacklister?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  Burn(
    parameters: {
      filter?: { burner?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  MasterMinterChanged(
    parameters: {
      filter?: { newMasterMinter?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  Mint(
    parameters: {
      filter?: { minter?: string | string[]; to?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  MinterConfigured(
    parameters: {
      filter?: { minter?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  MinterRemoved(
    parameters: {
      filter?: { oldMinter?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  OwnershipTransferred(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  Pause(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  PauserChanged(
    parameters: {
      filter?: { newAddress?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  RescuerChanged(
    parameters: {
      filter?: { newRescuer?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  Transfer(
    parameters: {
      filter?: { from?: string | string[]; to?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  UnBlacklisted(
    parameters: {
      filter?: { _account?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  Unpause(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
}
export type IUsdcTokenMethodNames =
  | 'CANCEL_AUTHORIZATION_TYPEHASH'
  | 'DOMAIN_SEPARATOR'
  | 'PERMIT_TYPEHASH'
  | 'RECEIVE_WITH_AUTHORIZATION_TYPEHASH'
  | 'TRANSFER_WITH_AUTHORIZATION_TYPEHASH'
  | 'allowance'
  | 'approve'
  | 'authorizationState'
  | 'balanceOf'
  | 'blacklist'
  | 'blacklister'
  | 'burn'
  | 'cancelAuthorization'
  | 'configureMinter'
  | 'currency'
  | 'decimals'
  | 'decreaseAllowance'
  | 'increaseAllowance'
  | 'initialize'
  | 'initializeV2'
  | 'initializeV2_1'
  | 'isBlacklisted'
  | 'isMinter'
  | 'masterMinter'
  | 'mint'
  | 'minterAllowance'
  | 'name'
  | 'nonces'
  | 'owner'
  | 'pause'
  | 'paused'
  | 'pauser'
  | 'permit'
  | 'receiveWithAuthorization'
  | 'removeMinter'
  | 'rescueERC20'
  | 'rescuer'
  | 'symbol'
  | 'totalSupply'
  | 'transfer'
  | 'transferFrom'
  | 'transferOwnership'
  | 'transferWithAuthorization'
  | 'unBlacklist'
  | 'unpause'
  | 'updateBlacklister'
  | 'updateMasterMinter'
  | 'updatePauser'
  | 'updateRescuer'
  | 'version';
export interface ApprovalEventEmittedResponse {
  owner: string;
  spender: string;
  value: string;
}
export interface AuthorizationCanceledEventEmittedResponse {
  authorizer: string;
  nonce: string | number[];
}
export interface AuthorizationUsedEventEmittedResponse {
  authorizer: string;
  nonce: string | number[];
}
export interface BlacklistedEventEmittedResponse {
  _account: string;
}
export interface BlacklisterChangedEventEmittedResponse {
  newBlacklister: string;
}
export interface BurnEventEmittedResponse {
  burner: string;
  amount: string;
}
export interface MasterMinterChangedEventEmittedResponse {
  newMasterMinter: string;
}
export interface MintEventEmittedResponse {
  minter: string;
  to: string;
  amount: string;
}
export interface MinterConfiguredEventEmittedResponse {
  minter: string;
  minterAllowedAmount: string;
}
export interface MinterRemovedEventEmittedResponse {
  oldMinter: string;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface PauserChangedEventEmittedResponse {
  newAddress: string;
}
export interface RescuerChangedEventEmittedResponse {
  newRescuer: string;
}
export interface TransferEventEmittedResponse {
  from: string;
  to: string;
  value: string;
}
export interface UnBlacklistedEventEmittedResponse {
  _account: string;
}
export interface IUsdcToken {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  CANCEL_AUTHORIZATION_TYPEHASH(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  DOMAIN_SEPARATOR(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  PERMIT_TYPEHASH(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  RECEIVE_WITH_AUTHORIZATION_TYPEHASH(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  TRANSFER_WITH_AUTHORIZATION_TYPEHASH(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   */
  allowance(
    owner: string,
    spender: string,
  ): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param value Type: uint256, Indexed: false
   */
  approve(spender: string, value: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param authorizer Type: address, Indexed: false
   * @param nonce Type: bytes32, Indexed: false
   */
  authorizationState(
    authorizer: string,
    nonce: string | number[],
  ): MethodConstantReturnContext<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   */
  balanceOf(account: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _account Type: address, Indexed: false
   */
  blacklist(_account: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  blacklister(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _amount Type: uint256, Indexed: false
   */
  burn(_amount: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param authorizer Type: address, Indexed: false
   * @param nonce Type: bytes32, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  cancelAuthorization(
    authorizer: string,
    nonce: string | number[],
    v: string | number,
    r: string | number[],
    s: string | number[],
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param minter Type: address, Indexed: false
   * @param minterAllowedAmount Type: uint256, Indexed: false
   */
  configureMinter(
    minter: string,
    minterAllowedAmount: string,
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  currency(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  decimals(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param decrement Type: uint256, Indexed: false
   */
  decreaseAllowance(spender: string, decrement: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param increment Type: uint256, Indexed: false
   */
  increaseAllowance(spender: string, increment: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenName Type: string, Indexed: false
   * @param tokenSymbol Type: string, Indexed: false
   * @param tokenCurrency Type: string, Indexed: false
   * @param tokenDecimals Type: uint8, Indexed: false
   * @param newMasterMinter Type: address, Indexed: false
   * @param newPauser Type: address, Indexed: false
   * @param newBlacklister Type: address, Indexed: false
   * @param newOwner Type: address, Indexed: false
   */
  initialize(
    tokenName: string,
    tokenSymbol: string,
    tokenCurrency: string,
    tokenDecimals: string | number,
    newMasterMinter: string,
    newPauser: string,
    newBlacklister: string,
    newOwner: string,
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newName Type: string, Indexed: false
   */
  initializeV2(newName: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param lostAndFound Type: address, Indexed: false
   */
  initializeV2_1(lostAndFound: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _account Type: address, Indexed: false
   */
  isBlacklisted(_account: string): MethodConstantReturnContext<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   */
  isMinter(account: string): MethodConstantReturnContext<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  masterMinter(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _to Type: address, Indexed: false
   * @param _amount Type: uint256, Indexed: false
   */
  mint(_to: string, _amount: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param minter Type: address, Indexed: false
   */
  minterAllowance(minter: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  name(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   */
  nonces(owner: string): MethodConstantReturnContext<string>;
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
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  pauser(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   * @param value Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  permit(
    owner: string,
    spender: string,
    value: string,
    deadline: string,
    v: string | number,
    r: string | number[],
    s: string | number[],
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param value Type: uint256, Indexed: false
   * @param validAfter Type: uint256, Indexed: false
   * @param validBefore Type: uint256, Indexed: false
   * @param nonce Type: bytes32, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  receiveWithAuthorization(
    from: string,
    to: string,
    value: string,
    validAfter: string,
    validBefore: string,
    nonce: string | number[],
    v: string | number,
    r: string | number[],
    s: string | number[],
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param minter Type: address, Indexed: false
   */
  removeMinter(minter: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenContract Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  rescueERC20(
    tokenContract: string,
    to: string,
    amount: string,
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  rescuer(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  symbol(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  totalSupply(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param value Type: uint256, Indexed: false
   */
  transfer(to: string, value: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param value Type: uint256, Indexed: false
   */
  transferFrom(from: string, to: string, value: string): MethodReturnContext;
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
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param value Type: uint256, Indexed: false
   * @param validAfter Type: uint256, Indexed: false
   * @param validBefore Type: uint256, Indexed: false
   * @param nonce Type: bytes32, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  transferWithAuthorization(
    from: string,
    to: string,
    value: string,
    validAfter: string,
    validBefore: string,
    nonce: string | number[],
    v: string | number,
    r: string | number[],
    s: string | number[],
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _account Type: address, Indexed: false
   */
  unBlacklist(_account: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  unpause(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _newBlacklister Type: address, Indexed: false
   */
  updateBlacklister(_newBlacklister: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _newMasterMinter Type: address, Indexed: false
   */
  updateMasterMinter(_newMasterMinter: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _newPauser Type: address, Indexed: false
   */
  updatePauser(_newPauser: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newRescuer Type: address, Indexed: false
   */
  updateRescuer(newRescuer: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  version(): MethodConstantReturnContext<string>;
}
