import { Method } from 'axios';
import {
  TronChainMethod,
  TronLibraryID,
} from 'domains/requestComposer/constants/tron';

export interface TronChainMethodResponse {}

export interface ITronArg {
  type: string;
  fieldName: string;
  description: string;
  placeholder: string;
}

export type ILibraryConfig = {
  [key in TronChainMethod]: {
    exec?: (...args: any) => any;
    method: Method;
    codeSample: (...args: any) => any;
    args?: any;
  };
};

export type IRPCCallsConfig = {
  [key in TronChainMethod]: {
    description: string;
    disabled?: boolean;
    [TronLibraryID.Tron]: ILibraryConfig[key];
  };
};
