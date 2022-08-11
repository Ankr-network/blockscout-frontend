import { ChainItemTab } from '../components/ChainItemTab';
import { DataUsageContent } from '../../DataUsageContent';
import { EndpointGroup } from 'modules/endpoints/types';
import { GetStartedContent } from '../../GetStartedContent';
import { IChainItemDetails } from 'domains/chains/actions/fetchChain';
import { InfrastructureContent } from '../../InfrastructureContent';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { TabId } from '../types';
import { t } from 'modules/i18n/utils/intl';
import { useInitialTabId } from './useInitialTabId';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { useRedirect } from './useRedirect';

export interface ChainItemTabsParams {
  data: IChainItemDetails;
  group: EndpointGroup;
}

export const useChainItemTabs = ({ data, group }: ChainItemTabsParams) => {
  const { chain } = data;
  const chainId = chain.id;

  const initialTabID = useInitialTabId();

  const rawTabs: Tab<TabId>[] = useLocaleMemo(
    () => [
      {
        id: TabId.GetStarted,
        content: <GetStartedContent chain={chain} group={group} />,
        title: (isSelected: boolean) => (
          <ChainItemTab
            isSelected={isSelected}
            label={t('chain-item.tabs.get-started')}
          />
        ),
      },
      {
        id: TabId.UsageData,
        content: <DataUsageContent chainId={chainId} />,
        title: (isSelected: boolean) => (
          <ChainItemTab
            isSelected={isSelected}
            label={t('chain-item.tabs.usage-data')}
          />
        ),
      },
      {
        id: TabId.Infrastructure,
        content: <InfrastructureContent chainId={chainId} data={data} />,
        title: (isSelected: boolean) => (
          <ChainItemTab
            isSelected={isSelected}
            label={t('chain-item.tabs.infrastructure')}
          />
        ),
      },
    ],
    [chain, chainId, data, group],
  );

  const redirect = useRedirect(chainId);

  return useTabs({
    initialTabID,
    onTabSelect: redirect,
    tabs: rawTabs,
  });
};
