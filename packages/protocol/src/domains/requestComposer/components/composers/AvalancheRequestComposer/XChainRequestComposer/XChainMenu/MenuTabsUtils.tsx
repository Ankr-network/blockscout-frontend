import { useCallback } from 'react';

import { SecondaryTab } from 'modules/common/components/SecondaryTab';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import {
  AvalancheLibrary,
  AvalancheLibraryID,
} from 'domains/requestComposer/constants/avalanche';
import { EndpointGroup } from 'modules/endpoints/types';

import { LibraryContent } from './LibraryContent';

export const useLibraryTabs = (group: EndpointGroup) => {
  const content = useCallback(
    (selectedTabID: AvalancheLibraryID) => (
      <LibraryContent group={group} libraryID={selectedTabID} />
    ),
    [group],
  );

  const rawTabs: Tab<AvalancheLibraryID>[] = useLocaleMemo(
    () => [
      {
        id: AvalancheLibraryID.Avalanche,
        content,
        title: (isSelected: boolean) => {
          return (
            <SecondaryTab
              isSelected={isSelected}
              label={AvalancheLibrary[AvalancheLibraryID.Avalanche]}
            />
          );
        },
      },
    ],
    [content],
  );

  return useTabs({
    initialTabID: AvalancheLibraryID.Avalanche,
    tabs: rawTabs,
  });
};
