import { useCallback } from 'react';

import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import {
  NearLibrary,
  NearLibraryID,
} from 'domains/requestComposer/constants/near';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { EndpointGroup } from 'modules/endpoints/types';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { LibraryContent } from './LibraryContent';

export const useLibraryTabs = (group: EndpointGroup) => {
  const content = useCallback(
    (selectedTabID: NearLibraryID) => (
      <LibraryContent group={group} libraryID={selectedTabID} />
    ),
    [group],
  );

  const rawTabs: Tab<NearLibraryID>[] = useLocaleMemo(
    () => [
      {
        id: NearLibraryID.NEARJavaScriptAPI,
        content,
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={NearLibrary[NearLibraryID.NEARJavaScriptAPI]}
          />
        ),
      },
    ],
    [content],
  );

  return useTabs({
    initialTabID: NearLibraryID.NEARJavaScriptAPI,
    tabs: rawTabs,
  });
};
