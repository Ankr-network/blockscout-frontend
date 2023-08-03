import { useCallback } from 'react';

import { EndpointGroup } from 'modules/endpoints/types';
import { SecondaryTab } from 'modules/common/components/SecondaryTab';
import { SolanaLibraryID } from 'domains/requestComposer/constants/solana';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';

import { LibraryContent } from '../components/LibraryContent';

export const useLibraryTabs = (group: EndpointGroup) => {
  const content = useCallback(
    (selectedTabID: SolanaLibraryID) => (
      <LibraryContent group={group} libraryID={selectedTabID} />
    ),
    [group],
  );

  const tabs: Tab<SolanaLibraryID>[] = useLocaleMemo(
    () => [
      {
        id: SolanaLibraryID.SolanaWeb3JS,
        content,
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={SolanaLibraryID.SolanaWeb3JS}
          />
        ),
      },
    ],
    [content],
  );

  return useTabs({ tabs });
};
