import { ReactNode } from 'react';
import { ButtonMetamask } from 'uiKit/ButtonMetamask';

import { IApiChain } from 'domains/chains/api/queryChains';
import { Chain } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListTypes';
import { ChainType } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { useAddNetworkButton } from './useAddNetworkButton';

interface IAddNetworkProps {
  publicChain: Chain;
  chainType?: ChainType;
  group?: EndpointGroup;
  className?: string;
  hasPlusIcon?: boolean;
  label?: ReactNode;
  size?: 'large' | 'medium';
}

export const AddNetworkButton = ({
  publicChain,
  chainType,
  group,
  className,
  hasPlusIcon,
  label,
  size,
}: IAddNetworkProps) => {
  const { handleButtonClick, loading } = useAddNetworkButton({
    publicChain: publicChain as IApiChain,
    chainType,
    group,
  });

  /* hiding the addNetwork button for networks not supported in MetaMask */
  if (!handleButtonClick) {
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
