import {
  SecondaryTab,
  TabSize,
} from 'domains/chains/screens/ChainItem/components/SecondaryTab';

import {
  AvalancheLibrary,
  AvalancheLibraryID,
  CChainMethod,
} from 'domains/requestComposer/constants/avalanche';

import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { EndpointGroup } from 'modules/endpoints/types';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { CChainSampleCode } from './CChainSampleCode';

export const useMethodsTabsUtils = (
  group: EndpointGroup,
  title: CChainMethod,
  args: string[],
  libraryID: AvalancheLibraryID,
) => {
  const rawTabs: Tab<AvalancheLibraryID>[] = useLocaleMemo(
    () => [
      {
        id: AvalancheLibraryID.Avalanche,
        content: (
          <CChainSampleCode
            group={group}
            title={title}
            args={args}
            libraryID={AvalancheLibraryID.Avalanche}
          />
        ),
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={AvalancheLibrary[AvalancheLibraryID.Avalanche]}
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
