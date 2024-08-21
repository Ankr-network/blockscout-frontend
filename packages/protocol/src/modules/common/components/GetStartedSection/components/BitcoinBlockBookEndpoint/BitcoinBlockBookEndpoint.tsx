import { useAppSelector } from 'store/useAppSelector';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { ChainID } from 'modules/chains/types';
import { selectBlockchainsData } from 'modules/chains/store/selectors';
import { CONFIG } from 'modules/api/MultiService';
import { useUserEndpointToken } from 'domains/chains/hooks/useUserEndpointToken';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { Endpoint } from '../Endpoint';
import { EndpointsHeader } from '../EndpointsHeader';
import { useBitcoinBlockBookEndpointStyles } from './useBitcoinBlockBookEndpointStyles';
import { blockbookTranslation } from './translation';

const buildRpcUrl = (
  rpcUrl: string,
  path: string,
  userEndpointToken: string,
) => {
  return rpcUrl
    .replace('{blockchain}', path)
    .replace('{user}', userEndpointToken);
};

export const BitcoinBlockBookEndpoint = () => {
  const { classes } = useBitcoinBlockBookEndpointStyles();

  const { hasConnectWalletMessage, isLoggedIn } = useAuth();

  const { keys, t } = useTranslation(blockbookTranslation);

  const userEndpointToken = useUserEndpointToken();

  const allChains = useAppSelector(selectBlockchainsData);

  const chain = allChains?.find(x => x.id === ChainID.BTC_BLOCKBOOK);

  const { privateRpcUrl } = CONFIG;

  const paths = chain?.paths?.map(path =>
    buildRpcUrl(privateRpcUrl, path, userEndpointToken ?? ''),
  );

  if (!chain || !paths) return null;

  const btcBlockbookUrl = isLoggedIn && paths.length > 1 ? paths[1] : paths[0];
  const formattedUrl = btcBlockbookUrl.endsWith('/')
    ? btcBlockbookUrl.slice(0, -1)
    : btcBlockbookUrl;

  return (
    <div className={classes.root}>
      <EndpointsHeader tooltipText={t(keys.tooltip)} title={t(keys.label)} />
      <Endpoint
        hasConnectWalletMessage={hasConnectWalletMessage}
        key={formattedUrl}
        onCopy={undefined}
        url={formattedUrl}
      />
    </div>
  );
};
