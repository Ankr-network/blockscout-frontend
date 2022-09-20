import { AvalancheLibraryID, CChainMethod } from '../../constants/avalanche';

export interface CChainMethodResponse {}

export type ILibraryConfig = {
  [key in CChainMethod]: {
    exec: (...args: any) => any;
    codeSample: (...args: any) => any;
    args: any;
  };
};

export type IRPCCallsConfig = {
  [key in CChainMethod]: {
    description: string;
    disabled?: boolean;
    [AvalancheLibraryID.Avalanche]: ILibraryConfig[key];
  };
};
