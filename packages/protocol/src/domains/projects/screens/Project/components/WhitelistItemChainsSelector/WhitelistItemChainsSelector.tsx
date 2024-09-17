import { Chain } from '@ankr.com/chains-list';

import { WhitelistItemChainsSelectorTitle } from 'domains/projects/components/WhitelistItemChainsSelectorTitle';
import { isEVMBased } from 'modules/chains/utils/isEVMBased';

import { SubchainCheckbox } from './components/SubchainCheckbox';
import { useWhitelistItemChainsSelectorStyles } from './useWhitelistItemChainsSelectorStyles';
import { Description } from './components/Description';

export interface WhitelistItemChainsSelectorProps {
  areNonEVMSubchainsDisabled?: boolean;
  description: string;
  handleSelectBlockchain: (path: string) => void;
  isValid: boolean;
  selectedBlockchains: string[];
  selectionLimit?: number;
  subchains: Chain[];
}

export const WhitelistItemChainsSelector = ({
  areNonEVMSubchainsDisabled,
  description,
  handleSelectBlockchain,
  isValid,
  selectedBlockchains,
  selectionLimit,
  subchains,
}: WhitelistItemChainsSelectorProps) => {
  const { classes } = useWhitelistItemChainsSelectorStyles();

  return (
    <div>
      <WhitelistItemChainsSelectorTitle />
      <Description description={description} isValid={isValid} />
      <div className={classes.checkboxes}>
        {subchains.map(chain => {
          const isNonEVMChain = !isEVMBased(chain.id);
          const isSelectionLimitReached =
            selectionLimit === selectedBlockchains.length;

          const isDisabled =
            (areNonEVMSubchainsDisabled && isNonEVMChain) ||
            isSelectionLimitReached;

          return (
            <SubchainCheckbox
              handleSelectBlockchain={handleSelectBlockchain}
              isDisabled={isDisabled}
              key={chain.id}
              selectedBlockchains={selectedBlockchains}
              subchain={chain}
            />
          );
        })}
      </div>
    </div>
  );
};
