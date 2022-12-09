import { useCallback } from 'react';

import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import {
  TronLibrary,
  TronLibraryID,
} from 'domains/requestComposer/constants/tron';
import { EndpointGroup } from 'modules/endpoints/types';
import { LibraryContent } from '../TronLibraryContent';

export const useLibraryTabs = (group: EndpointGroup) => {
  const content = useCallback(
    (selectedTabID: TronLibraryID) => (
      <LibraryContent group={group} libraryID={selectedTabID} />
    ),
    [group],
  );

  const rawTabs: Tab<TronLibraryID>[] = useLocaleMemo(
    () => [
      {
        id: TronLibraryID.Tron,
        content,
        title: (isSelected: boolean) => {
          return (
            <SecondaryTab
              isSelected={isSelected}
              label={TronLibrary[TronLibraryID.Tron]}
            />
          );
        },
      },
    ],
    [content],
  );

  return useTabs({
    initialTabID: TronLibraryID.Tron,
    tabs: rawTabs,
  });
};
