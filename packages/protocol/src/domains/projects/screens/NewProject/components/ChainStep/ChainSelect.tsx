import { Box } from '@mui/material';

import { ChainProtocolContext } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';
import { PrivateChainSelectedContent } from 'domains/dashboard/screens/Dashboard/components/PrivateChainSelectedContent';
import { Chain } from 'domains/chains/types';
import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { useChainsSelector } from './hooks/useChainsSelector';

interface ChainSelectProps {
  className?: string;
  chain: Chain;
}

export const ChainSelect = ({
  chain: { id: nestedSelectedChainId },
  className,
}: ChainSelectProps) => {
  const { isOpened, onOpen, onClose } = useUpgradePlanDialog();

  const {
    chainProtocolContext,
    chainTypes,
    selectType,
    nonEvmGroups,
    selectGroup,
    isTestnetOnlyChainSelected,
    classNameMenuItem,
    menuProps,
    chainType,
    groupId,
  } = useChainsSelector(nestedSelectedChainId, onOpen);

  return (
    <ChainProtocolContext.Provider value={chainProtocolContext}>
      <Box className={className}>
        <PrivateChainSelectedContent
          chainType={chainType}
          chainTypes={chainTypes}
          selectType={selectType}
          groups={nonEvmGroups}
          groupID={groupId}
          selectGroup={selectGroup}
          isTestnetOnlyChain={isTestnetOnlyChainSelected}
          classNameMenuItem={classNameMenuItem}
          menuProps={menuProps}
          ignoreProtocol
        />
      </Box>
      <UpgradePlanDialog open={isOpened} onClose={onClose} />
    </ChainProtocolContext.Provider>
  );
};
