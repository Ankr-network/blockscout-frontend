import { TabSize } from 'modules/common/components/SecondaryTab';
import { ChainProtocolContext } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';
import { TimeframeTabs } from 'domains/chains/screens/ChainItem/components/TimeframeTabs';
import { useEnterpriseEndpoints } from 'domains/enterprise/screens/Chains/UserEndpointsWrapper/useEnterpriseEndpoints';
import { useEnterpriseApiKeySelect } from 'domains/enterprise/components/EnterpriseApiKeysSelect/useEnterpriseApiKeySelect';
import { ChainID, Timeframe } from 'modules/chains/types';
import { useAppSelector } from 'store/useAppSelector';
import { emptyFn } from 'modules/common/utils/emptyFn';
import { selectConfiguredBlockchains } from 'modules/chains/store/selectors';
import { useTimeframe } from 'domains/chains/screens/ChainItem/components/ChainItemSections/hooks/useTimeframe';

import { useChainsSelector } from '../hooks/useChainsSelector';
import { useChainSelectorGroups } from '../hooks/useChainSelectorGroups';
import { fallbackChain } from '../const';
import { useDashboardStyles } from '../useDashboardStyles';
import { SelectorsContent } from '../components/SelectorsContent';
import { DashboardWidgets } from '../components/DashboardWidgets/v2';
import { selectEnterpriseBlockchainsDependingOnSelectedApiKeyWithUsage } from '../../../store/selectors/v2';

export const DashboardContent = () => {
  const allChains = useAppSelector(selectConfiguredBlockchains);

  const chainIds = useAppSelector(
    selectEnterpriseBlockchainsDependingOnSelectedApiKeyWithUsage,
  );

  const { timeframe, timeframeTabs } = useTimeframe({
    initialTimeframe: Timeframe.Month,
  });

  const {
    selectedChainId,
    handleChange,
    renderValue,
    options: chainSelectOptions,
    showAdditionalSelect,
    chain,
    unfilteredChain,
    isTestnetOnlyChainSelected,
  } = useChainsSelector({
    chains: allChains,
    allChains,
    chainIdsWithStats: chainIds as ChainID[],
  });

  const {
    statsChainId,
    detailsChainId,
    chainProtocolContext,
    chainType,
    chainTypes,
    selectType,
    chainSubType,
    chainSubTypes,
    selectSubType,
    groups,
    groupID,
    selectGroup,
  } = useChainSelectorGroups({
    chain: chain || fallbackChain,
    unfilteredChain: unfilteredChain || fallbackChain,
    onBlockedTabClick: emptyFn,
  });

  const { classes } = useDashboardStyles();

  const { apiKeys: enterpriseApiKeys } = useEnterpriseEndpoints();

  const { options, handleSetOption, selectedOption, selectedProjectId } =
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
