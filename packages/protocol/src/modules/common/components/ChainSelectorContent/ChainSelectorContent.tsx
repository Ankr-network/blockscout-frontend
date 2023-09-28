import { ChainSubType, ChainType } from 'domains/chains/types';
import { GroupSelector } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/components/GroupSelector';
import { Tab } from 'modules/common/hooks/useTabs';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { SecondaryTabs } from 'modules/common/components/SecondaryTabs';
import { ChainProtocolSwitch } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/components/ChainProtocolSwitch';
import { useChainSelectorContentStyles } from 'modules/common/components/ChainSelectorContent/useChainSelectorContentStyles';

interface IChainSelectorContentProps {
  chainTypeTab?: Tab<ChainType>;
  chainTypeTabs: Tab<ChainType>[];
  chainSubTypeTab?: Tab<ChainSubType>;
  chainSubTypeTabs: Tab<ChainSubType>[];
  groups: EndpointGroup[];
  groupID: ChainGroupID;
  groupTab?: Tab<ChainGroupID>;
  groupTabs: Tab<ChainGroupID>[];
  selectGroup: (id: ChainGroupID) => void;
  hasGroupSelector?: boolean;
  isProtocolSwitcherHidden?: boolean;
}

const MIN_GROUP_TABS = 2;

export const ChainSelectorContent = ({
  chainTypeTab,
  chainTypeTabs,
  chainSubTypeTabs,
  chainSubTypeTab,
  groups,
  groupID,
  groupTab,
  groupTabs,
  selectGroup,
  hasGroupSelector,
  isProtocolSwitcherHidden,
}: IChainSelectorContentProps) => {
  const { classes } = useChainSelectorContentStyles();

  const withChainSubTypeSelector = chainSubTypeTabs.length > 1;

  const withGroupSelector = withChainSubTypeSelector;
  const withGroupTabs =
    !withGroupSelector &&
    (groupTabs.length >= MIN_GROUP_TABS || hasGroupSelector);

  return (
    <div className={classes.controls}>
      <SecondaryTabs
        className={classes.chainTypeTabs}
        selectedTab={chainTypeTab}
        tabs={chainTypeTabs}
        visible
      />
      <SecondaryTabs
        className={classes.chainTypeTabs}
        selectedTab={chainSubTypeTab}
        tabs={chainSubTypeTabs}
        visible={withChainSubTypeSelector}
      />
      <SecondaryTabs
        className={classes.groupTabs}
        selectedTab={groupTab}
        tabs={groupTabs}
        visible={withGroupTabs}
      />
      <GroupSelector
        fullWidth
        groupID={groupID}
        groups={groups}
        onGroupSelect={selectGroup}
        rootClassName={classes.groupSelector}
        visible={withGroupSelector}
      />
      {!isProtocolSwitcherHidden && <ChainProtocolSwitch />}
    </div>
  );
};
