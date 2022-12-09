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

export const useMethodsTabsUtils = (
  group: EndpointGroup,
  title: HarmonyMethod,
  args: Record<string, string | number>,
  libraryID: HarmonyLibraryID,
) => {
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
            isDarkTheme
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
