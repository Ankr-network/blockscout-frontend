import {
  SecondaryTab,
  TabSize,
} from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import {
  HarmonyLibrary,
  HarmonyLibraryID,
  HarmonyMethod,
} from 'domains/requestComposer/constants/harmony';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { EndpointGroup } from 'modules/endpoints/types';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';

import { HarmonySampleCode } from '../HarmonySampleCode';

interface UseMethodsTabsUtilsArguments {
  group: EndpointGroup;
  title: HarmonyMethod;
  args: Record<string, string | number>;
  libraryID: HarmonyLibraryID;
}

export const useMethodsTabsUtils = ({
  group,
  title,
  args,
  libraryID,
}: UseMethodsTabsUtilsArguments) => {
  const rawTabs: Tab<HarmonyLibraryID>[] = useLocaleMemo(
    () => [
      {
        id: HarmonyLibraryID.Harmony,
        content: (
          <HarmonySampleCode
            group={group}
            title={title}
            args={args}
            libraryID={HarmonyLibraryID.Harmony}
          />
        ),
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={HarmonyLibrary[HarmonyLibraryID.Harmony]}
            size={TabSize.Small}
          />
        ),
      },
    ],
    [group, title, args],
  );

  return useTabs({
    initialTabID: libraryID,
    tabs: rawTabs,
  });
};
