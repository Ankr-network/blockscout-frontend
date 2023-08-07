import { EndpointGroup } from 'modules/endpoints/types';
import { getRPCCallsConfig } from 'domains/requestComposer/utils/solana/RPCCallsConfig';
import { SecondaryTab, TabSize } from 'modules/common/components/SecondaryTab';
import {
  SolanaLibraryID,
  SolanaMethod,
} from 'domains/requestComposer/constants/solana';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';

import { SolanaSampleCode } from '../../SolanaSampleCode';

export interface MethodsTabsParams {
  args: string[];
  group: EndpointGroup;
  libraryID: SolanaLibraryID;
  title: SolanaMethod;
}

export const useMethodsTabs = ({
  args,
  group,
  libraryID,
  title,
}: MethodsTabsParams) => {
  const tabs: Tab<SolanaLibraryID>[] = useLocaleMemo(
    () => [
      {
        id: SolanaLibraryID.SolanaWeb3JS,
        content: (
          <SolanaSampleCode
            args={args}
            config={getRPCCallsConfig()}
            group={group}
            libraryID={libraryID}
            title={title}
          />
        ),
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={libraryID}
            size={TabSize.Small}
          />
        ),
      },
    ],
    [group, title, args],
  );

  return useTabs({ initialTabID: libraryID, tabs });
};
