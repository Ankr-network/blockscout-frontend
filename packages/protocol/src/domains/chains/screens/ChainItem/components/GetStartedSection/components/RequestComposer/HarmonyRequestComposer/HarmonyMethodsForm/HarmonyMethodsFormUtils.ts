import { HarmonyMethod } from 'domains/requestComposer/constants/harmony';
import { MethodOption } from 'domains/requestComposer/types';
import { HarmonyApiVersionPrefix } from '../HarmonyApiVersionTabs/versionTabsUtils';

export const methodsSelectOptions = (
  prefix?: HarmonyApiVersionPrefix,
): MethodOption[] =>
  Object.values(HarmonyMethod)
    .filter(item => item.indexOf(prefix ?? '') > -1)
    .map(name => ({
      label: name,
      value: name,
    }));
