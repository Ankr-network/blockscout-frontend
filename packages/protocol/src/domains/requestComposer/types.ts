import { EVMMethod, EVMLibraryID } from './constants';

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
    [EVMLibraryID.WEB3]: ILibraryConfig[key];
    [EVMLibraryID.ETHERS]: ILibraryConfig[key];
  };
};
