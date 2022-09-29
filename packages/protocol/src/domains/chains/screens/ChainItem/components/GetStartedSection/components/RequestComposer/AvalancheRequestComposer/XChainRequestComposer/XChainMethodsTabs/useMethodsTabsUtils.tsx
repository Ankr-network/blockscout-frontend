import {
  SecondaryTab,
  TabSize,
} from 'domains/chains/screens/ChainItem/components/SecondaryTab';

import {
  AvalancheLibrary,
  AvalancheLibraryID,
  XChainMethod,
} from 'domains/requestComposer/constants/avalanche';

import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { EndpointGroup } from 'modules/endpoints/types';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/avalanche/x-chain/RPCCallsConfig';
import { AvalancheSampleCode } from '../../AvalancheSampleCode';

export const useMethodsTabsUtils = (
  group: EndpointGroup,
  title: XChainMethod,
  args: string[],
  libraryID: AvalancheLibraryID,
) => {
  const rawTabs: Tab<AvalancheLibraryID>[] = useLocaleMemo(
    () => [
      {
        id: AvalancheLibraryID.Avalanche,
        content: (
          <AvalancheSampleCode<XChainMethod>
            group={group}
            title={title}
            args={args}
            libraryID={AvalancheLibraryID.Avalanche}
            config={RPC_CALLS_CONFIG}
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
