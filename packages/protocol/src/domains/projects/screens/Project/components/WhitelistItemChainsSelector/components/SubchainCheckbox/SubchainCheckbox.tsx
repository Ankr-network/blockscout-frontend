import { useCallback, useMemo } from 'react';
import { Chain } from '@ankr.com/chains-list';

import { Checkbox } from 'modules/common/components/Checkbox';
import { clearPathPrefix } from 'modules/chains/utils/clearPathPrefix';
import { getChainName } from 'domains/projects/utils/getChainName';

export interface SubchainCheckboxProps {
  handleSelectBlockchain: (path: string) => void;
  isDisabled?: boolean;
  selectedBlockchains: string[];
  subchain: Chain;
}

export const SubchainCheckbox = ({
  handleSelectBlockchain,
  isDisabled,
  selectedBlockchains,
  subchain,
}: SubchainCheckboxProps) => {
  const { paths = [] } = subchain;
  const subchainPath = clearPathPrefix(paths[0] || '');

  const isChecked = useMemo(
    () => selectedBlockchains.includes(subchainPath),
    [selectedBlockchains, subchainPath],
  );

  const onChange = useCallback(() => {
    if (subchainPath) {
      handleSelectBlockchain(subchainPath);
    }
  }, [handleSelectBlockchain, subchainPath]);

  return (
    <Checkbox
      isChecked={isChecked}
      isDisabled={!isChecked && isDisabled}
      label={getChainName(subchain)}
      onChange={onChange}
    />
  );
};
