import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { pageViewEvent } from 'modules/analytics/trackMixpanel';

import { ChainItemQuery as ChainItemBase } from './ChainItemQuery';
import { useMetatags } from './ChainItemUtils';

export const ChainItem = () => {
  const { chainId } = ChainsRoutesConfig.chainDetails.useParams();

  useOnMount(() => pageViewEvent());

  useMetatags(chainId);

  return <ChainItemBase chainId={chainId} />;
};
