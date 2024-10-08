import { Checkbox, FormControlLabel } from '@mui/material';
import { Chain, ChainPath } from '@ankr.com/chains-list';
import { useCallback } from 'react';
import { CheckboxClasses } from '@mui/material/Checkbox/checkboxClasses';

import { EndpointGroup } from 'modules/endpoints/types';

import { getCustomLabelForChainsCornerCases } from '../../utils/getCustomLabelForChainsCornerCases';
import { getChainName } from '../../utils/getChainName';
import { getPathFromSubchain } from './useChainTypeSelectorWithSubchains';

interface ISubchainSelectorProps {
  isLoading?: boolean;
  classes?: Partial<CheckboxClasses>;
  checkBoxClassName?: string;
  subChain: Chain;
  endpoints: EndpointGroup[];
  selectedChainPaths: ChainPath[];
  handleChangeChild: (path: ChainPath) => void;
}

export const SubchainSelector = ({
  checkBoxClassName,
  classes,
  endpoints,
  handleChangeChild,
  isLoading,
  selectedChainPaths,
  subChain,
}: ISubchainSelectorProps) => {
  const currentEndpoint = endpoints.find(endpoint =>
    endpoint.chains.some(endpointChain => endpointChain.id === subChain.id),
  );

  const path = getPathFromSubchain(subChain);

  const label = currentEndpoint
    ? getCustomLabelForChainsCornerCases({
        chainId: subChain.id,
        label: currentEndpoint.name,
      })
    : getChainName(subChain);

  const onChangeChild = useCallback(
    () => handleChangeChild(path),
    [handleChangeChild, path],
  );

  return (
    <FormControlLabel
      classes={classes}
      control={
        <Checkbox
          disabled={isLoading}
          className={checkBoxClassName}
          checked={selectedChainPaths.includes(path)}
          onClick={onChangeChild}
        />
      }
      label={label}
    />
  );
};
