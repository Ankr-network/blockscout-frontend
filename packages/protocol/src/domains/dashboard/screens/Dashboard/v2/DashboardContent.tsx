import { ChainID, Timeframe } from '@ankr.com/chains-list';

import { TabSize } from 'modules/common/components/SecondaryTab';
import { ChainProtocolContext } from 'domains/chains/screens/ChainPage/constants/ChainProtocolContext';
import { TimeframeTabs } from 'domains/chains/screens/ChainPage/components/TimeframeTabs';
import { useEnterpriseEndpoints } from 'domains/enterprise/screens/EnterpriseChainsListPage/UserEndpointsWrapper/useEnterpriseEndpoints';
import { useEnterpriseApiKeySelect } from 'domains/enterprise/components/EnterpriseApiKeysSelect/useEnterpriseApiKeySelect';
import { useAppSelector } from 'store/useAppSelector';
import { emptyFn } from 'modules/common/utils/emptyFn';
import { selectPublicBlockchains } from 'modules/chains/store/selectors';
import { useTimeframe } from 'domains/chains/screens/ChainPage/components/ChainItemSections/hooks/useTimeframe';
import { useHeaderBannerHeight } from 'modules/layout/components/HeaderBanner/useHeaderBannerHeight';

import { useChainsSelector } from '../hooks/useChainsSelector';
import { useChainSelectorGroups } from '../hooks/useChainSelectorGroups';
import { fallbackChain } from '../const';
import { useDashboardStyles } from '../useDashboardStyles';
import { SelectorsContent } from '../components/SelectorsContent';
import { DashboardWidgets } from '../components/DashboardWidgets/v2';
import { selectEnterpriseBlockchainsDependingOnSelectedApiKeyWithUsage } from '../../../store/selectors/v2';

export const DashboardContent = () => {
  const allChains = useAppSelector(selectPublicBlockchains);

  const chainIds = useAppSelector(
    selectEnterpriseBlockchainsDependingOnSelectedApiKeyWithUsage,
  );

  const { timeframe, timeframeTabs } = useTimeframe({
    initialTimeframe: Timeframe.Month,
  });

  const {
    chain,
    handleChange,
    isTestnetOnlyChainSelected,
    options: chainSelectOptions,
    renderValue,
    selectedChainId,
    showAdditionalSelect,
  } = useChainsSelector({
    chains: allChains,
    chainIdsWithStats: chainIds as ChainID[],
  });

  const {
    chainProtocolContext,
    chainSubType,
    chainSubTypes,
    chainType,
    chainTypes,
    detailsChainId,
    groupID,
    groups,
    selectGroup,
    selectSubType,
    selectType,
    statsChainId,
  } = useChainSelectorGroups({
    chain: chain || fallbackChain,
    onBlockedTabClick: emptyFn,
  });

  const bannerHeight = useHeaderBannerHeight();
  const { classes } = useDashboardStyles(bannerHeight);

  const { apiKeys: enterpriseApiKeys } = useEnterpriseEndpoints();

  const { handleSetOption, options, selectedOption, selectedProjectId } =
    useEnterpriseApiKeySelect(enterpriseApiKeys);

  return (
    <ChainProtocolContext.Provider value={chainProtocolContext}>
      <div className={classes.root}>
        <div className={classes.selector}>
          <SelectorsContent
            projectOptions={options}
            handleSetOption={handleSetOption}
            selectedOption={selectedOption}
            selectedChainId={selectedChainId}
            handleChange={handleChange}
            renderValue={renderValue}
            chainSelectOptions={chainSelectOptions}
            networksConfigurations={allChains}
            chainSubType={chainSubType}
            chainSubTypes={chainSubTypes}
            selectSubType={selectSubType}
            showAdditionalSelect={showAdditionalSelect}
            chainType={chainType}
            chainTypes={chainTypes}
            selectType={selectType}
            groups={groups}
            groupID={groupID}
            selectGroup={selectGroup}
            isTestnetOnlyChainSelected={isTestnetOnlyChainSelected}
          />
          <TimeframeTabs
            className={classes.timeframe}
            tabClassName={classes.tab}
            tabs={timeframeTabs}
            timeframe={timeframe}
            size={TabSize.Small}
          />
        </div>

        <DashboardWidgets
          statsChainId={statsChainId}
          detailsChainId={detailsChainId}
          timeframe={timeframe}
          selectedProjectId={selectedProjectId}
        />
      </div>
    </ChainProtocolContext.Provider>
  );
};
