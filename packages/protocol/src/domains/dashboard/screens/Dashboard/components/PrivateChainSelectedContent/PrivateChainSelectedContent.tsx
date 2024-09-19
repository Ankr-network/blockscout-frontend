import { useMemo } from 'react';
import { ChainType } from '@ankr.com/chains-list';

import { ChainProtocolSwitch } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/components/ChainProtocolSwitch';
import { useChainSelectorContentStyles } from 'modules/common/components/ChainSelectorContent/useChainSelectorContentStyles';
import { useChainSelectVisibility } from 'domains/projects/screens/NewProject/components/TypeSelector/hooks/useChainSelectVisibility';
import { SelectMenuProps } from 'modules/common/components/ProjectSelect/ProjectSelect';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';

import { GroupSelector } from '../GroupSelector';
import { TypeSelector } from '../TypeSelector';
import { mergeTendermintsGroups } from './utils/mergeTendermintsGroups';

export interface IPrivateChainSelectedContentProps extends SelectMenuProps {
  chainType: ChainType;
  chainTypes: { value: ChainType; label: string }[];
  selectType: (id: ChainType) => void;
  groups: EndpointGroup[];
  groupID: ChainGroupID;
  selectGroup: (id: ChainGroupID) => void;
  isTestnetOnlyChain?: boolean;
  ignoreProtocol?: boolean;
}

export const PrivateChainSelectedContent = ({
  chainType,
  chainTypes,
  classNameMenuItem,
  groupID,
  groups,
  ignoreProtocol,
  isTestnetOnlyChain,
  menuProps,
  selectGroup,
  selectType,
}: IPrivateChainSelectedContentProps) => {
  const { classes } = useChainSelectorContentStyles();

  const mergedGroups = useMemo(() => mergeTendermintsGroups(groups), [groups]);

  const isGroupSelectorVisible = useChainSelectVisibility({
    chainTypes,
    chainType,
    groups: mergedGroups,
    isTestnetOnlyChain,
    selectType,
  });

  return (
    <div className={classes.selectors}>
      <TypeSelector
        chainType={chainType}
        chainTypes={chainTypes}
        classNameMenuItem={classNameMenuItem}
        isMenuAlwaysVisible
        menuProps={menuProps}
        onTypeSelect={selectType}
      />
      {isGroupSelectorVisible && (
        <GroupSelector
          groupID={groupID}
          groups={mergedGroups}
          onGroupSelect={selectGroup}
          menuProps={menuProps}
          classNameMenuItem={classNameMenuItem}
        />
      )}
      {!ignoreProtocol && <ChainProtocolSwitch />}
    </div>
  );
};
