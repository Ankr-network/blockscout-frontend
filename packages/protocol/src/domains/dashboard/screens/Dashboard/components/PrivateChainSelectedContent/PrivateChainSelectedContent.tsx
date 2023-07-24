import { useEffect } from 'react';

import { ChainProtocolSwitch } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/components/ChainProtocolSwitch';
import { useChainSelectorContentStyles } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/components/ChainSelectorContent/useChainSelectorContentStyles';
import { useChainProtocolContext } from 'domains/chains/screens/ChainItem/hooks/useChainProtocolContext';
import { ChainType } from 'domains/chains/types';
import { SelectMenuProps } from 'modules/common/components/ProjectSelect/ProjectSelect';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';

import { GroupSelector } from '../GroupSelector';
import { TypeSelector } from '../TypeSelector';

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
  selectType,
  groups,
  groupID,
  selectGroup,
  isTestnetOnlyChain,
  menuProps,
  classNameMenuItem,
  ignoreProtocol,
}: IPrivateChainSelectedContentProps) => {
  const { protocolGroup } = useChainProtocolContext();

  const { classes } = useChainSelectorContentStyles();

  const withChainTypeSelector = chainTypes.length > 1;
  const withGroupSelector = groups.length > 1;

  const isVisible =
    withChainTypeSelector || withGroupSelector || Boolean(protocolGroup);

  useEffect(() => {
    if (isTestnetOnlyChain && chainType === ChainType.Mainnet) {
      selectType(ChainType.Testnet);
    }
  }, [isTestnetOnlyChain, chainType, selectType]);

  if (!isVisible) return null;

  return (
    <div className={classes.selectors}>
      {!isTestnetOnlyChain && (
        <TypeSelector
          chainType={chainType}
          chainTypes={chainTypes}
          onTypeSelect={selectType}
          menuProps={menuProps}
          classNameMenuItem={classNameMenuItem}
        />
      )}
      <GroupSelector
        groupID={groupID}
        groups={groups}
        onGroupSelect={selectGroup}
        menuProps={menuProps}
        classNameMenuItem={classNameMenuItem}
      />
      {!ignoreProtocol && <ChainProtocolSwitch />}
    </div>
  );
};
