import { OverlaySpinner } from '@ankr.com/ui';

import { ChainProtocolContext } from 'domains/chains/screens/ChainPage/constants/ChainProtocolContext';
import { Placeholder } from 'modules/common/components/Placeholder';
import { PlansDialog } from 'modules/common/components/PlansDialog';
import { TabSize } from 'modules/common/components/SecondaryTab';
import { TimeframeTabs } from 'domains/chains/screens/ChainPage/components/TimeframeTabs';
import { useHeaderBannerHeight } from 'modules/layout/components/HeaderBanner/useHeaderBannerHeight';
import { useProjectSelect } from 'modules/common/components/ProjectSelect/hooks/useProjectSelect';
import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';

import { DashboardWidgets as DashboardWidgetsV1 } from '../components/DashboardWidgets/v1';
import { SelectorsContent } from '../components/SelectorsContent';
import { fallbackChain } from '../const';
import { useChainIds } from './hooks/useChainIds';
import { useChainSelectorGroups } from '../hooks/useChainSelectorGroups';
import { useChainsSelector } from '../hooks/useChainsSelector';
import { useDashboard } from './hooks/useDashboard';
import { useDashboardStyles } from '../useDashboardStyles';

export const DashboardContent = () => {
  const { isOpened, onClose, onOpen } = useUpgradePlanDialog();

  const {
    networksConfigurations,
    rawChains,
    timeframe,
    timeframeTabs,
    totalStatsLoading,
  } = useDashboard();

  const chainIds = useChainIds({ timeframe });

  const {
    chain,
    handleChange,
    isTestnetOnlyChainSelected,
    options: chainSelectOptions,
    renderValue,
    selectedChainId,
    showAdditionalSelect,
  } = useChainsSelector({
    chains: rawChains,
    chainIdsWithStats: chainIds,
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
    onBlockedTabClick: onOpen,
  });

  const bannerHeight = useHeaderBannerHeight();
  const { classes } = useDashboardStyles(bannerHeight);

  const { handleSetOption, options, selectedOption } = useProjectSelect();

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
            networksConfigurations={networksConfigurations}
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

        <Placeholder
          hasPlaceholder={totalStatsLoading}
          placeholder={<OverlaySpinner />}
        >
          <DashboardWidgetsV1
            statsChainId={statsChainId}
            detailsChainId={detailsChainId}
            timeframe={timeframe}
            selectedChainId={selectedChainId}
          />
        </Placeholder>
      </div>
      <PlansDialog open={isOpened} onClose={onClose} />
    </ChainProtocolContext.Provider>
  );
};
