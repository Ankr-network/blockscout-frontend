import { ReactNode } from 'react';
import { ButtonMetamask } from 'uiKit/ButtonMetamask';

import { IApiChain } from 'domains/chains/api/queryChains';
import { Chain } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListTypes';
import { ChainType } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { useAddNetworkButton } from './useAddNetworkButton';

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
  const { mappedNetwork, handleButtonClick, loading } = useAddNetworkButton({
    chain: chain as IApiChain,
    chainType,
    group,
  });

  /* hiding the addNetwork button for networks not supported in MetaMask */
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
