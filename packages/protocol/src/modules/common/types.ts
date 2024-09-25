export enum Env {
  Develop = 'develop',
  Production = 'prod',
  Stage = 'staging',
}

export type Sign = -1 | 0 | 1;

// Reference: https://github.com/MetaMask/rpc-errors/blob/main/src/error-constants.ts
export enum EMetamaskErrorCode {
  // RPC error codes
  Internal = -32603,
  InvalidInput = -32000,
  InvalidParams = -32602,
  InvalidRequest = -32600,
  LimitExceeded = -32005,
  MethodNotFound = -32601,
  MethodNotSupported = -32004,
  Parse = -32700,
  ResourceNotFound = -32001,
  ResourceUnavailable = -32002,
  TransactionRejected = -32003,
  // provider error codes
  UserRejectedRequest = 4001,
  Unauthorized = 4100,
  UnsupportedMethod = 4200,
  Disconnected = 4900,
  ChainDisconnected = 4901,
}

export interface IMetamaskError {
  code: EMetamaskErrorCode;
  message: string;
  data?: unknown;
}

export type TPrimitive =
  | bigint
  | boolean
  | null
  | number
  | string
  | symbol
  | undefined;
