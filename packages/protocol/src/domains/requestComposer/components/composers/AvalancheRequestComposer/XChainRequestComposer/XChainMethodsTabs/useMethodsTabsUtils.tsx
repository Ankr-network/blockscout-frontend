import { SecondaryTab, TabSize } from 'modules/common/components/SecondaryTab';
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

interface UseMethodsTabsUtilsArguments {
  group: EndpointGroup;
  title: XChainMethod;
  args: string[];
  libraryID: AvalancheLibraryID;
}

export const useMethodsTabsUtils = ({
  group,
  title,
  args,
  libraryID,
}: UseMethodsTabsUtilsArguments) => {
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
