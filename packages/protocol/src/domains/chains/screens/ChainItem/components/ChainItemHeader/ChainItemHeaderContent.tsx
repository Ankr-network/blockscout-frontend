import { useMemo } from 'react';

import { ChainProtocolSwitch } from './components/ChainProtocolSwitch';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { Chain, ChainType } from 'domains/chains/types';
import { Endpoints } from '../GetStartedSection/components/Endpoints';
import { SecondaryTabs } from '../SecondaryTabs';
import { MultiChainOverview } from './components/MultichainOverview';
import { ChainOverview } from './components/ChainOverview';
import { MobileGroupSelector } from './components/MobileGroupSelector';
import { useChainItemHeaderContentStyles } from './ChainItemHeaderStyles';
import { PremiumContent } from '../GetStartedSection/components/PremiumContent';
import { getEndpointsGroup } from '../../utils/getEndpointsGroup';
import { useChainProtocolContext } from 'domains/chains/screens/ChainItem/hooks/useChainProtocolContext';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';

export interface ChainItemHeaderProps {
  chain: Chain;
  publicChain: Chain;
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

type OmittedProps = Omit<ChainItemHeaderProps, 'toggleBeacon'>;

interface ChainItemHeaderContentProps extends OmittedProps {
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
  isMultiChain,
  selectGroup,
}: ChainItemHeaderContentProps) => {
  const { protocolGroup, isChainProtocolSwitchEnabled } =
    useChainProtocolContext();

  const endpointsGroup = useMemo(
    () => getEndpointsGroup({ group, isChainProtocolSwitchEnabled }),
    [group, isChainProtocolSwitchEnabled],
  );

  const { classes } = useChainItemHeaderContentStyles();

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
        />
      )}
      {(withChainTypeSelector ||
        withGroupSelector ||
        Boolean(protocolGroup)) && (
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
            rootClassName={classes.rootMobileGroupSelector}
            groupID={groupID}
            groups={groups}
            onGroupSelect={selectGroup}
            visible={withGroupSelector}
            fullWidth
          />
          <ChainProtocolSwitch />
        </div>
      )}
      <div className={!isMultiChain ? classes.content : undefined}>
        <Endpoints
          publicChain={publicChain}
          chainType={chainType}
          group={endpointsGroup}
        />
        <GuardUserGroup blockName={BlockWithPermission.UpgradePlan}>
          <PremiumContent isMultiChain={isMultiChain} />
        </GuardUserGroup>
      </div>
    </>
  );
};
