import React, { ReactNode } from 'react';
import { ButtonMetamask } from 'uiKit/ButtonMetamask';

import { Chain } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListTypes';
import { useAddNetworkButton } from './useAddNetworkButton';
import { isAddNetworkSupported } from 'modules/common/utils/browserDetect';

interface IAddNetworkProps {
  chain: Chain;
  className?: string;
  hasPlusIcon?: boolean;
  label?: ReactNode;
  size?: 'large' | 'medium';
}

export const AddNetworkButton = ({
  chain,
  className,
  hasPlusIcon,
  label,
  size,
}: IAddNetworkProps) => {
  const { mappedNetwork, handleButtonClick, loading } = useAddNetworkButton({
    chain,
  });

  /* hiding the addNetwork button for some browsers which have problems with add network method */
  if (!isAddNetworkSupported()) {
    return null;
  }

  /* hiding the addNetwork button for some networks */
  if (!mappedNetwork) {
    return null;
  }

  return (
    <ButtonMetamask
      className={className}
      hasPlusIcon={hasPlusIcon}
      isDisabled={loading}
      label={label}
      onClick={handleButtonClick}
      size={size}
    />
  );
};
