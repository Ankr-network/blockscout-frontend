import { ReactNode } from 'react';
import { ChainSubType, ChainType } from '@ankr.com/chains-list';

import { GroupSelector } from 'domains/chains/screens/ChainPage/components/ChainItemHeader/components/GroupSelector';
import { Tab } from 'modules/common/hooks/useTabs';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { SecondaryTabs } from 'modules/common/components/SecondaryTabs';
import { ChainProtocolSwitch } from 'domains/chains/screens/ChainPage/components/ChainItemHeader/components/ChainProtocolSwitch';
import { useChainSelectorContentStyles } from 'modules/common/components/ChainSelectorContent/useChainSelectorContentStyles';
import { useIsSMDown } from 'uiKit/Theme/useTheme';
import { SubchainLabels } from 'domains/chains/screens/ChainPage/components/ChainItemHeader/components/SubchainLabels';

export interface IChainSelectorContentProps {
  additionalSelector?: ReactNode;
  chainSubTypeTab?: Tab<ChainSubType>;
  chainSubTypeTabs: Tab<ChainSubType>[];
  chainTypeTab?: Tab<ChainType>;
  chainTypeTabs: Tab<ChainType>[];
  groupID: ChainGroupID;
  groupTab?: Tab<ChainGroupID>;
  groupTabs: Tab<ChainGroupID>[];
  groups: EndpointGroup[];
  hasGroupSelector?: boolean;
  isProtocolSwitcherHidden?: boolean;
  selectGroup: (id: ChainGroupID) => void;
  isGroupSelectorAutoWidth?: boolean;
  className?: string;
  classNameSelector?: string;
  extraContent?: ReactNode;
  isSubchainSelectorHidden?: boolean;
  isSecondLevelSelectorsHidden?: boolean;
  subchainLabels?: string[];
}

const MIN_GROUP_ITEMS = 2;
const MIN_SUBTYPE_ITEMS = 2;

export const ChainSelectorContent = ({
  additionalSelector,
  chainSubTypeTab,
  chainSubTypeTabs,
  chainTypeTab,
  chainTypeTabs,
  className,
  classNameSelector,
  extraContent,
  groupID,
  groupTab,
  groupTabs,
  groups,
  hasGroupSelector,
  isGroupSelectorAutoWidth = false,
  isProtocolSwitcherHidden,
  isSecondLevelSelectorsHidden,
  isSubchainSelectorHidden,
  selectGroup,
  subchainLabels,
}: IChainSelectorContentProps) => {
  const isMobile = useIsSMDown();

  const { classes, cx } = useChainSelectorContentStyles();

  const hasEnoughGroups = groupTabs.length >= MIN_GROUP_ITEMS;
  const hasEnoughSubTypes =
    chainSubTypeTabs.length >= MIN_SUBTYPE_ITEMS ||
    chainSubTypeTab?.id === ChainSubType.Athens3;

  const withGroupSelector = hasEnoughSubTypes;
  const withMobileGroupSelector = isMobile && hasEnoughGroups;
  const withGroupTabs =
    (!withGroupSelector && hasEnoughGroups) || hasGroupSelector;

  const hasSubchainLabels =
    isSubchainSelectorHidden && subchainLabels && subchainLabels?.length >= 1;

  const hasAdditionalContent =
    additionalSelector || extraContent || hasSubchainLabels;

  return (
    <div
      className={cx(
        {
          [classes.controls]: !isSubchainSelectorHidden,
          [classes.labels]: isSubchainSelectorHidden,
        },
        className,
      )}
    >
      {!isSubchainSelectorHidden && (
        <div className={cx(classes.chainSeletorWrapper, classNameSelector)}>
          <SecondaryTabs
            className={classes.chainTypeTabs}
            selectedTab={chainTypeTab}
            tabs={chainTypeTabs}
            visible
          />
          {!isSecondLevelSelectorsHidden && (
            <>
              <SecondaryTabs
                className={classes.chainTypeTabs}
                selectedTab={chainSubTypeTab}
                tabs={chainSubTypeTabs}
                visible={hasEnoughSubTypes}
              />
              <SecondaryTabs
                className={classes.groupTabs}
                selectedTab={groupTab}
                tabs={groupTabs}
                visible={withGroupTabs}
              />
              <div className={classes.groupSelectorAndProtocolSwitcherWrapper}>
                <GroupSelector
                  fullWidth={!isGroupSelectorAutoWidth || isMobile}
                  groupID={groupID}
                  groups={groups}
                  onGroupSelect={selectGroup}
                  className={classes.groupSelectorInner}
                  rootClassName={classes.groupSelector}
                  classNameInput={classes.groupSelectorInput}
                  visible={
                    (withGroupSelector || withMobileGroupSelector) &&
                    groups.length > 0
                  }
                />
                {!isProtocolSwitcherHidden && <ChainProtocolSwitch />}
              </div>
            </>
          )}
        </div>
      )}
      {hasAdditionalContent && (
        <div className={classes.additionalContent}>
          {hasSubchainLabels && (
            <div className={classes.subchainLabelsWrapper}>
              <SubchainLabels labels={subchainLabels} />
            </div>
          )}
          {additionalSelector}
          {extraContent}
        </div>
      )}
    </div>
  );
};
