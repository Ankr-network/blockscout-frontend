import {
  AvalancheLibraryID,
  CChainMethod,
  PChainMethod,
} from '../../constants/avalanche';

export interface CChainMethodResponse {}

export interface PChainMethodResponse {}

type AvalancheChain = CChainMethod | PChainMethod;

export type ILibraryConfig<T extends AvalancheChain> = {
  [key in T]: {
    exec: (...args: any) => any;
    codeSample: (...args: any) => any;
    args: any;
  };
};

export type IRPCCallsConfig<T extends AvalancheChain> = {
  [key in T]: {
    description: string;
    disabled?: boolean;
    [AvalancheLibraryID.Avalanche]: ILibraryConfig<T>[key];
  };
};
