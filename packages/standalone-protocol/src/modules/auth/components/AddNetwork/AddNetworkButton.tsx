import React from 'react';

import { ButtonMetamask } from 'uiKit/ButtonMetamask';
import { useAddNetworkButton } from './useAddNetworkButton';
import { isAddNetworkSupported } from 'modules/common/utils/browserDetect';
import { Chain } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/ChainItemHeaderTypes';
import { useIsMDDown } from 'ui';

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
  const { mappedNetwork, handleButtonClick } = useAddNetworkButton({
    chain,
  });

  const isMDDown = useIsMDDown();

  /* hiding the addNetwork button for some browsers which have problems with add network method */
  if (!isAddNetworkSupported(isMDDown)) {
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
      // @ts-ignore
      onClick={handleButtonClick}
      hasPlusIcon={hasPlusIcon}
      chainId={chain?.id}
    />
  );
};
