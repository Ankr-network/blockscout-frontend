import { useMemo } from 'react';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainType } from 'domains/chains/types';
import { Endpoints } from '../GetStartedSection/components/Endpoints';
import { SecondaryTabs } from '../SecondaryTabs';
import { MultiChainOverview } from './components/MultichainOverview';
import { ChainOverview } from './components/ChainOverview';
import { MobileGroupSelector } from './components/MobileGroupSelector';
import { chainsWithMobileOnlySelector } from './const';
import { useChainItemHeaderContentStyles } from './ChainItemHeaderStyles';

export interface ChainItemHeaderProps {
  chain: IApiChain;
  publicChain: IApiChain;
  chainType: ChainType;
  chainTypeTab?: Tab<ChainType>;
  chainTypeTabs: Tab<ChainType>[];
  group: EndpointGroup;
  groups: EndpointGroup[];
  groupID: ChainGroupID;
  groupTab?: Tab<ChainGroupID>;
  groupTabs: Tab<ChainGroupID>[];
  isChainArchived: boolean;
  selectGroup: (id: ChainGroupID) => void;
}

interface ChainItemHeaderContentProps extends ChainItemHeaderProps {
  isMultiChain: boolean;
}

export const ChainItemHeaderContent = ({
  chain,
  publicChain,
  chainType,
  chainTypeTab,
  chainTypeTabs,
  group,
  groups,
  groupID,
  groupTab,
  groupTabs,
  isChainArchived,
  selectGroup,
  isMultiChain,
}: ChainItemHeaderContentProps) => {
  const shouldOnlyShowMobileSelector = useMemo(
    () => chainsWithMobileOnlySelector.has(chain.id),
    [chain.id],
  );

  const { classes } = useChainItemHeaderContentStyles(
    shouldOnlyShowMobileSelector,
  );

  const withChainTypeSelector = chainTypeTabs.length > 1;
  const withGroupSelector = groupTabs.length > 1;

  return (
    <>
      {isMultiChain ? (
        <MultiChainOverview />
      ) : (
        <ChainOverview
          chain={chain}
          chainType={chainType}
          group={group}
          isChainArchived={isChainArchived}
          publicChain={publicChain}
        />
      )}
      {(withChainTypeSelector || withGroupSelector) && (
        <div className={classes.controls}>
          <SecondaryTabs
            selectedTab={chainTypeTab}
            tabs={chainTypeTabs}
            visible={withChainTypeSelector}
          />
          <SecondaryTabs
            className={classes.desktopGroupSelector}
            selectedTab={groupTab}
            tabs={groupTabs}
            visible={withGroupSelector}
          />
          <MobileGroupSelector
            className={classes.mobileGroupSelector}
            groupID={groupID}
            groups={groups}
            onGroupSelect={selectGroup}
            visible={withGroupSelector}
            fullWidth
          />
        </div>
      )}
      <Endpoints
        publicChain={publicChain}
        chainType={chainType}
        group={group}
      />
    </>
  );
};
