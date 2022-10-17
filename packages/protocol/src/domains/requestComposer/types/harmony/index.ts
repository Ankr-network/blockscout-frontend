import {
  HarmonyLibraryID,
  HarmonyMethod,
} from 'domains/requestComposer/constants/harmony';

export interface IHarmonyArg {
  type: string;
  fieldName?: string;
  defaultValue?: string | number;
  description: string;
  placeholder?: string;
}

export type ILibraryConfig = {
  [key in HarmonyMethod]: {
    codeSample: (...args: any) => any;
    args?: IHarmonyArg[];
  };
};

export type IRPCCallsConfig = {
  [key in HarmonyMethod]: {
    description: string;
    disabled?: boolean;
    [HarmonyLibraryID.Harmony]: ILibraryConfig[key];
  };
};
