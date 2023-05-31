import { useMemo } from 'react';

import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { Chain, ChainType } from 'domains/chains/types';
import { Endpoints } from '../GetStartedSection/components/Endpoints';
import { MultiChainOverview } from './components/MultichainOverview';
import { ChainOverview } from './components/ChainOverview';
import { useChainItemHeaderContentStyles } from './ChainItemHeaderStyles';
import { PremiumContent } from '../GetStartedSection/components/PremiumContent';
import { getEndpointsGroup } from '../../utils/getEndpointsGroup';
import { useChainProtocolContext } from 'domains/chains/screens/ChainItem/hooks/useChainProtocolContext';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { ChainSelectorContent } from './components/ChainSelectorContent';
import { useChainItemPlaceholder } from './useChainItemPlaceholder';

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
  const { placeholder } = useChainItemPlaceholder(isMultiChain);

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
      <ChainSelectorContent
        protocolGroup={protocolGroup}
        chainTypeTabs={chainTypeTabs}
        chainTypeTab={chainTypeTab}
        groups={groups}
        groupID={groupID}
        groupTabs={groupTabs}
        groupTab={groupTab}
        selectGroup={selectGroup}
      />
      <div className={!isMultiChain ? classes.content : undefined}>
        <Endpoints
          publicChain={publicChain}
          chainType={chainType}
          group={endpointsGroup}
          placeholder={placeholder}
        />
        <GuardUserGroup blockName={BlockWithPermission.UpgradePlan}>
          <PremiumContent isMultiChain={isMultiChain} />
        </GuardUserGroup>
      </div>
    </>
  );
};
