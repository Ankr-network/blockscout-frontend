import { useCallback } from 'react';

import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { EVMLibrary, EVMLibraryID } from 'domains/requestComposer/constants';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { EndpointGroup } from 'modules/endpoints/types';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { LibraryContent } from './LibraryContent';

export const useLibraryTabs = (group: EndpointGroup) => {
  const content = useCallback(
    (selectedTabID: EVMLibraryID) => (
      <LibraryContent group={group} libraryID={selectedTabID} />
    ),
    [group],
  );

  const rawTabs: Tab<EVMLibraryID>[] = useLocaleMemo(
    () => [
      {
        id: EVMLibraryID.WEB3,
        content,
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={EVMLibrary[EVMLibraryID.WEB3]}
          />
        ),
      },
      {
        id: EVMLibraryID.ETHERS,
        content,
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={EVMLibrary[EVMLibraryID.ETHERS]}
          />
        ),
      },
      {
        id: EVMLibraryID.JSON_RPC,
        content,
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={EVMLibrary[EVMLibraryID.JSON_RPC]}
          />
        ),
      },
    ],
    [content],
  );
  return useTabs({
    initialTabID: EVMLibraryID.WEB3,
    tabs: rawTabs,
  });
};
