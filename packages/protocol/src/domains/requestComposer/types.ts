import { EVMLibraryID, EVMMethod } from './constants';

export type ABI = ABIItem[];

export interface ABIInput {
  components?: ABIInput[];
  indexed?: boolean;
  internalType?: string;
  name: string;
  type: string;
}

export interface ABIItem {
  anonymous?: boolean;
  constant?: boolean;
  gas?: number;
  inputs?: ABIInput[];
  name?: string;
  outputs?: ABIOutput[];
  payable?: boolean;
  stateMutability?: StateMutability;
  type: ABIItemType;
}

export enum ABIItemType {
  CONSTRUCTOR = 'constructor',
  EVENT = 'event',
  FALLBACK = 'fallback',
  FUNCTION = 'function',
}

export interface ABIOutput {
  components?: ABIOutput[];
  internalType?: string;
  name: string;
  type: string;
}

export interface MethodsRequest<T> {
  methodName: T;
  params: string[];
}

export type MethodOption = {
  label: string;
  value: string;
};

export interface EVMMethodResponse {}

export type ILibraryConfig = {
  [key in EVMMethod]: {
    exec: (...args: any) => any;
    codeSample: (...args: any) => any;
    args: any;
    parseArgs?: ((input: string) => any)[];
  };
};

export type IRPCCallsConfig = {
  [key in EVMMethod]: {
    description: string;
    disabled?: boolean;
    [EVMLibraryID.WEB3]: ILibraryConfig[key];
    [EVMLibraryID.ETHERS]: ILibraryConfig[key];
    [EVMLibraryID.JSON_RPC]: ILibraryConfig[key];
  };
};

export enum StateMutability {
  NONPAYABLE = 'nonpayable',
  PAYABLE = 'payable',
  PURE = 'pure',
  VIEW = 'view',
}
