import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { EVMLibrary, EVMLibraryID } from 'domains/requestComposer/constants';
import {
  HarmonyLibrary,
  HarmonyLibraryID,
} from 'domains/requestComposer/constants/harmony';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { EndpointGroup } from 'modules/endpoints/types';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { useCallback } from 'react';
import { LibraryContent } from '../../EVMRequestComposer/EVMMenu/LibraryContent';
import { HarmonyLibraryContent } from '../HarmonyLibraryContent';

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
        id: EVMLibraryID.JSON_RPC,
        content,
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={EVMLibrary[EVMLibraryID.JSON_RPC]}
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
