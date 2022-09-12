import { EVMMethod, LibraryID } from './constants';

export interface EVMMethodsRequest {
  methodName: EVMMethod;
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
  };
};

export type IRPCCallsConfig = {
  [key in EVMMethod]: {
    description: string;
    disabled?: boolean;
    [LibraryID.WEB3]: ILibraryConfig[key];
    [LibraryID.ETHERS]: ILibraryConfig[key];
  };
};
