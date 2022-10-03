import {
  SecondaryTab,
  TabSize,
} from 'domains/chains/screens/ChainItem/components/SecondaryTab';

import {
  TronChainMethod,
  TronLibrary,
  TronLibraryID,
} from 'domains/requestComposer/constants/tron';

import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { EndpointGroup } from 'modules/endpoints/types';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { TronSampleCode } from '../TronSampleCode';

export const useMethodsTabsUtils = (
  group: EndpointGroup,
  title: TronChainMethod,
  args: Record<string, string | number>,
  libraryID: TronLibraryID,
) => {
  const rawTabs: Tab<TronLibraryID>[] = useLocaleMemo(
    () => [
      {
        id: TronLibraryID.Tron,
        content: (
          <TronSampleCode
            group={group}
            title={title}
            args={args}
            libraryID={TronLibraryID.Tron}
          />
        ),
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={TronLibrary[TronLibraryID.Tron]}
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
