import React, { useMemo, useCallback } from 'react';

import { IChainItemDetails } from 'domains/chains/actions/fetchChain';
import { formatChain, getLink } from './CopyButtonsUtils';
import { IS_REACT_SNAP } from 'uiKit/NoReactSnap';
import { useIsXSDown } from 'modules/themes/useTheme';
import { copyEndpointEvent } from 'modules/analytics/trackMixpanel';
import { NervosButtons } from './NervosButtons';
import { ChainButtons } from './ChainButtons';

interface ICopyButtonsProps {
  data?: IChainItemDetails;
  chainId: string;
}

export const CopyButtons = ({ data, chainId }: ICopyButtonsProps) => {
  const chain = data?.chain;
  const formattedChain = useMemo(() => formatChain(chain), [chain]);
  const netLink = getLink(chainId);
  const isXSDown = useIsXSDown();

  const onCopy = useCallback(() => copyEndpointEvent(), []);

  if (IS_REACT_SNAP) return null;

  if (chainId === 'nervos') {
    return (
      <NervosButtons
        chain={formattedChain}
        chainId={chainId}
        onCopy={onCopy}
        isXSDown={isXSDown}
        netLink={netLink}
      />
    );
  }

  return (
    <ChainButtons
      chain={formattedChain}
      chainId={chainId}
      onCopy={onCopy}
      isXSDown={isXSDown}
      netLink={netLink}
    />
  );
};
