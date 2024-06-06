import { ReactNode } from 'react';

import { ButtonMetamask } from 'uiKit/ButtonMetamask';
import { Chain, ChainSubType, ChainType } from 'modules/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { useAddNetworkButton } from './useAddNetworkButton';

interface IAddNetworkProps {
  chain: Chain;
  chainType?: ChainType;
  chainSubType?: ChainSubType;
  group?: EndpointGroup;
  className?: string;
  label?: ReactNode;
  size?: 'large' | 'medium' | 'small';
  isEnterprise?: boolean;
}

export const AddNetworkButton = ({
  chain,
  chainSubType,
  chainType,
  className,
  group,
  isEnterprise,
  label,
  size,
}: IAddNetworkProps) => {
  const { loading } = useAuth();

  const handleButtonClick = useAddNetworkButton({
    chain,
    chainType,
    chainSubType,
    group,
    isEnterprise,
  });

  /* hiding the addNetwork button for networks not supported in MetaMask */
  if (!handleButtonClick) {
    return null;
  }

  return (
    <ButtonMetamask
      className={className}
      isDisabled={loading}
      label={label}
      onClick={handleButtonClick}
      size={size}
    />
  );
};
