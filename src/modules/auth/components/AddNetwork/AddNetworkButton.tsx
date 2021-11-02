import React from 'react';
import { ButtonMetamask } from 'uiKit/ButtonMetamask';
import { Chain } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListTypes';
import { useAddNetworkButton } from './useAddNetworkButton';
import { isAddNetworkSupported } from '../../../common/utils/browserDetect';

interface IAddNetworkProps {
  chain: Chain;
  size?: 'large' | 'medium';
  className?: string;
}

export const AddNetworkButton = ({
  chain,
  size,
  className,
}: IAddNetworkProps) => {
  const { mappedNetwork, handleButtonClick } = useAddNetworkButton({ chain });

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
      size={size}
      className={className}
      onClick={handleButtonClick}
    />
  );
};
