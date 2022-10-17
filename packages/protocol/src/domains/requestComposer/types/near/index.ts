import {
  NearLibraryID,
  NearMethod,
} from 'domains/requestComposer/constants/near';

export interface NearMethodResponse {}

export type ILibraryConfig = {
  [key in NearMethod]: {
    exec: (...args: any) => any;
    codeSample: (...args: any) => any;
    args: any;
    parseArgs?: ((input: string) => any)[];
  };
};

export type IRPCCallsConfig = {
  [key in NearMethod]: {
    description: string;
    disabled?: boolean;
    [NearLibraryID.NEARJavaScriptAPI]: ILibraryConfig[key];
  };
};
