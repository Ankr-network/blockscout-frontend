import { ChainType } from 'domains/chains/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { SecondaryTabs } from '../../../SecondaryTabs';
import { ChainProtocolSwitch } from '../ChainProtocolSwitch';
import { MobileGroupSelector } from '../MobileGroupSelector';
import { useChainSelectorContentStyles } from './useChainSelectorContentStyles';

interface IChainSelectorContentProps {
  protocolGroup?: EndpointGroup;
  chainTypeTab?: Tab<ChainType>;
  chainTypeTabs: Tab<ChainType>[];
  groups: EndpointGroup[];
  groupID: ChainGroupID;
  groupTab?: Tab<ChainGroupID>;
  groupTabs: Tab<ChainGroupID>[];
  selectGroup: (id: ChainGroupID) => void;
}

export const ChainSelectorContent = ({
  protocolGroup,
  chainTypeTab,
  chainTypeTabs,
  groups,
  groupID,
  groupTab,
  groupTabs,
  selectGroup,
}: IChainSelectorContentProps) => {
  const { classes } = useChainSelectorContentStyles();

  const withChainTypeSelector = chainTypeTabs.length > 1;
  const withGroupSelector = groupTabs.length > 1;

  const isVisible =
    withChainTypeSelector || withGroupSelector || Boolean(protocolGroup);

  if (!isVisible) return null;

  return (
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
  );
};
