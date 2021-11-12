import React from 'react';

import { NoReactSnap } from 'uiKit/NoReactSnap';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { ChainItemQuery as ChainItemBase } from './ChainItemQuery';
import { useMetatags } from './ChainItemUtils';

export const ChainItem = () => {
  const { chainId } = ChainsRoutesConfig.chainDetails.useParams();

  useMetatags(chainId);

  return (
    <NoReactSnap>
      <ChainItemBase chainId={chainId} />
    </NoReactSnap>
  );
};
