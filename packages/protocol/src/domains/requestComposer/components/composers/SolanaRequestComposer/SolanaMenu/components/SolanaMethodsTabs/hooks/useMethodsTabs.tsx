import { EndpointGroup } from 'modules/endpoints/types';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/solana/RPCCallsConfig';
import {
  SecondaryTab,
  TabSize,
} from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import {
  SolanaLibraryID,
  SolanaMethod,
} from 'domains/requestComposer/constants/solana';
import { SolanaSampleCode } from '../../SolanaSampleCode';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';

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
            config={RPC_CALLS_CONFIG}
            group={group}
            libraryID={libraryID}
            title={title}
          />
        ),
        title: (isSelected: boolean) => (
          <SecondaryTab
            isDarkTheme
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
