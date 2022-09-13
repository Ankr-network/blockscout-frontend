import { useCallback } from 'react';

import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { LibraryContent } from '../LibraryContent';
import { Library, LibraryID } from 'domains/requestComposer/constants';
import { EndpointGroup } from 'modules/endpoints/types';

export const useLibraryTabs = (group: EndpointGroup) => {
  const content = useCallback(
    (selectedTabID: LibraryID) => (
      <LibraryContent group={group} libraryID={selectedTabID} />
    ),
    [group],
  );

  const rawTabs: Tab<LibraryID>[] = useLocaleMemo(
    () => [
      {
        id: LibraryID.WEB3,
        content,
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={Library[LibraryID.WEB3]}
          />
        ),
      },
      {
        id: LibraryID.ETHERS,
        content,
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={Library[LibraryID.ETHERS]}
          />
        ),
      },
    ],
    [content],
  );

  return useTabs({
    initialTabID: LibraryID.WEB3,
    tabs: rawTabs,
  });
};
