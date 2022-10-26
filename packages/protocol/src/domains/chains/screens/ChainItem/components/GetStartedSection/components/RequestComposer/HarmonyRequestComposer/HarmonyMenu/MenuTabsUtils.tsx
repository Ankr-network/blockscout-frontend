import { useCallback } from 'react';

import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { EVMLibrary, EVMLibraryID } from 'domains/requestComposer/constants';
import { EndpointGroup } from 'modules/endpoints/types';
import {
  HarmonyLibrary,
  HarmonyLibraryID,
} from 'domains/requestComposer/constants/harmony';
import { HarmonyLibraryContent } from '../HarmonyLibraryContent';
import { LibraryContent } from '../../EVMRequestComposer/EVMMenu/LibraryContent';

export const useLibraryTabs = (group: EndpointGroup) => {
  const content = useCallback(
    (selectedTabID: EVMLibraryID) => (
      <LibraryContent group={group} libraryID={selectedTabID} />
    ),
    [group],
  );

  const harmonyContent = useCallback(
    (selectedTabID: HarmonyLibraryID) => (
      <HarmonyLibraryContent group={group} libraryID={selectedTabID} />
    ),
    [group],
  );

  const rawTabs: Tab<EVMLibraryID | HarmonyLibraryID>[] = useLocaleMemo(
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
        id: HarmonyLibraryID.Harmony,
        content: harmonyContent,
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={HarmonyLibrary[HarmonyLibraryID.Harmony]}
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
