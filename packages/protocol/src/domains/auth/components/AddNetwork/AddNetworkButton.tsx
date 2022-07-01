import React from 'react';
import { ButtonMetamask } from 'uiKit/ButtonMetamask';
import { Chain } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListTypes';
import { useAddNetworkButton } from './useAddNetworkButton';
import { isAddNetworkSupported } from 'modules/common/utils/browserDetect';

interface IAddNetworkProps {
  chain: Chain;
  size?: 'large' | 'medium';
  className?: string;
  hasPlusIcon?: boolean;
}

export const AddNetworkButton = ({
  chain,
  size,
  className,
  hasPlusIcon,
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
      isDisabled={loading}
      size={size}
      className={className}
      onClick={handleButtonClick}
      hasPlusIcon={hasPlusIcon}
    />
  );
};
