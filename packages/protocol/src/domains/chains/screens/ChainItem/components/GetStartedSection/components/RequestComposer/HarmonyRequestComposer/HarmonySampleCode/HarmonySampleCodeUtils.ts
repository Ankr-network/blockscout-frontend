import { HarmonyMethod } from 'domains/requestComposer/constants/harmony';
import { IHarmonyArg } from 'domains/requestComposer/types/harmony';
import { ArgumentType } from '../../components/MethodsForm/MethodsFormUtils';

const ARG_PREFIX = 'arg';

const getArgName = (arg: string): string | number => {
  const regexp = new RegExp(ARG_PREFIX);
  const index = arg.replace(regexp, '');
  return Number.isNaN(Number(index)) ? arg : Number(index) - 1;
};

const formatUnfilledParameter = (args: any[], argList?: IHarmonyArg[]) => {
  argList?.forEach((arg, index) => {
    const { type, defaultValue } = arg;
    if (!args[index]) {
      if (type === ArgumentType.boolean) {
        args[index] = false;
      } else if (type === ArgumentType.number) {
        args[index] = 0;
      } else {
        args[index] = defaultValue ?? '';
      }
    }
  });
};

export const formatParameters = (
  parameters: any,
  methodName: HarmonyMethod,
  argList?: IHarmonyArg[],
) => {
  const args: any[] = [];
  Object.keys(parameters).forEach(key => {
    if (parameters[key] === '') {
      delete parameters[key];
    }
  });

  if (
    methodName === HarmonyMethod.hmyv2_getBlockByHash ||
    methodName === HarmonyMethod.hmyv2_getBlockByNumber ||
    methodName === HarmonyMethod.hmy_getBlocks ||
    methodName === HarmonyMethod.hmyv2_getBlocks
  ) {
    Object.keys(parameters).forEach(key => {
      if (key.indexOf(ARG_PREFIX) > -1) {
        const argName = getArgName(key);
        if (typeof argName === 'string') {
          args.push(parameters[key]);
        } else if (typeof argName === 'number') {
          args[argName] = parameters[key];
        }
      }
    });

    return [
      ...args,
      {
        fullTx: parameters.fullTx,
        withSigners: parameters.withSigners,
        inclStaking: parameters.inclStaking,
      },
    ];
  }

  if (
    methodName === HarmonyMethod.hmy_getTransactionsHistory ||
    methodName === HarmonyMethod.hmyv2_getTransactionsHistory ||
    methodName === HarmonyMethod.hmyv2_getStakingTransactionsHistory
  ) {
    return [parameters];
  }

  if (
    methodName === HarmonyMethod.hmy_call ||
    methodName === HarmonyMethod.hmy_estimateGas ||
    methodName === HarmonyMethod.hmyv2_call ||
    methodName === HarmonyMethod.hmyv2_estimateGas
  ) {
    const paramArgs: Record<string, string> = {};

    Object.keys(parameters).forEach(key => {
      const argName = getArgName(key);
      if (typeof argName === 'string') {
        paramArgs[key] = parameters[key];
      }
    });
    return parameters.arg7 ? [paramArgs, parameters.arg7] : [paramArgs];
  }

  if (
    methodName === HarmonyMethod.hmy_getAllValidatorInformation ||
    methodName === HarmonyMethod.hmyv2_getAllValidatorInformation
  ) {
    return [0];
  }

  Object.keys(parameters).forEach(key => {
    if (key.indexOf(ARG_PREFIX) > -1) {
      const argName = getArgName(key);
      if (typeof argName === 'string') {
        args.push(parameters[key]);
      } else if (typeof argName === 'number') {
        args[argName] = parameters[key];
      }
    } else {
      args.push({ [key]: parameters[key] });
    }
  });

  formatUnfilledParameter(args, argList);

  return args;
};
