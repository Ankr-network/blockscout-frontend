import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';
import { TabSize } from 'modules/common/components/SecondaryTab';
import { ChainProtocolContext } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';
import { TimeframeTabs } from 'domains/chains/screens/ChainItem/components/TimeframeTabs';
import { useProjectSelect } from 'modules/common/components/ProjectSelect/hooks/useProjectSelect';
import { useAppSelector } from 'store/useAppSelector';
import { ChainID } from 'modules/chains/types';
import { PlansDialog } from 'modules/common/components/PlansDialog';

import { useChainsSelector } from '../hooks/useChainsSelector';
import { useChainSelectorGroups } from '../hooks/useChainSelectorGroups';
import { fallbackChain } from '../const';
import { useDashboardStyles } from '../useDashboardStyles';
import { SelectorsContent } from '../components/SelectorsContent';
import { useDashboard } from './hooks/useDashboard';
import { DashboardWidgets as DashboardWidgetsV1 } from '../components/DashboardWidgets/v1';
import { selectChainsWithStats } from '../../../store/selectors/v1';

export const DashboardContent = () => {
  const { isOpened, onClose, onOpen } = useUpgradePlanDialog();

  const {
    allChains,
    networksConfigurations,
    rawChains,
    timeframe,
    timeframeTabs,
  } = useDashboard();

  const chainIds = useAppSelector(selectChainsWithStats);

  const {
    chain,
    handleChange,
    isTestnetOnlyChainSelected,
    options: chainSelectOptions,
    renderValue,
    selectedChainId,
    showAdditionalSelect,
    unfilteredChain,
  } = useChainsSelector({
    chains: rawChains,
    allChains,
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
    unfilteredChain: unfilteredChain || fallbackChain,
    onBlockedTabClick: onOpen,
  });

  const { classes } = useDashboardStyles();

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

        <DashboardWidgetsV1
          statsChainId={statsChainId}
          detailsChainId={detailsChainId}
          timeframe={timeframe}
          selectedChainId={selectedChainId}
        />
      </div>
      <PlansDialog open={isOpened} onClose={onClose} />
    </ChainProtocolContext.Provider>
  );
};
