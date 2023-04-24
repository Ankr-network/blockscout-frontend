import { ReactNode } from 'react';
import { ButtonMetamask } from 'uiKit/ButtonMetamask';

import { Chain, ChainType } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { useAddNetworkButton } from './useAddNetworkButton';
import { useAuth } from 'domains/auth/hooks/useAuth';

interface IAddNetworkProps {
  chain: Chain;
  chainType?: ChainType;
  group?: EndpointGroup;
  className?: string;
  hasPlusIcon?: boolean;
  label?: ReactNode;
  size?: 'large' | 'medium';
}

export const AddNetworkButton = ({
  chain,
  chainType,
  group,
  className,
  hasPlusIcon,
  label,
  size,
}: IAddNetworkProps) => {
  const { loading } = useAuth();

  const handleButtonClick = useAddNetworkButton({
    chain,
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
