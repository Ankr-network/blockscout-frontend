import React from 'react';

import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { ChainItemQuery as ChainItemBase } from './ChainItemQuery';
import { useMetatags } from './ChainItemUtils';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { pageViewEvent } from 'modules/analytics/trackMixpanel';

export const ChainItem = () => {
  const { chainId } = ChainsRoutesConfig.chainDetails.useParams();

  useMetatags(chainId);

  useOnMount(() => pageViewEvent());

  return <ChainItemBase chainId={chainId} />;
};
