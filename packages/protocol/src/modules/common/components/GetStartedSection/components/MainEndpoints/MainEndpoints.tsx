import { Fragment } from 'react';

import { ChainID } from 'modules/chains/types';
import {
  ChainGroupID,
  FLARE_TESTNETS_GROUPS_LIST,
} from 'modules/endpoints/types';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { Endpoint } from '../Endpoint';
import { EndpointsHeader } from '../EndpointsHeader';
import { MainEndpointsProps } from './types';
import { Placeholder } from './components/Placeholder';
import { useMainEndpoints } from './hooks/useMainEndpoints';
import { useMainEndpointsStyles } from './MainEndpointsStyles';
import { renderFlareTitle } from './utils/renderFlareTitle';
import { mainEndpointsTranslation } from './translation';

export const MainEndpoints = ({
  chainSubType,
  feature,
  group,
  hasConnectWalletMessage,
  hasPremium,
  hasPrivateAccess,
  onCopyEndpoint,
  publicChain,
}: MainEndpointsProps) => {
  const { flattenURLs, hasFeature, hasPlaceholder, title } = useMainEndpoints({
    feature,
    chainSubType,
    group,
    hasPrivateAccess,
    publicChain,
    hasPremium,
  });

  const { classes } = useMainEndpointsStyles();
  const { keys, t } = useTranslation(mainEndpointsTranslation);

  const headerTooltip =
    group.id === ChainGroupID.BTC_BLOCKBOOK
      ? t(keys.blockbookTooltip)
      : undefined;

  const endpointsHeader = (
    <EndpointsHeader title={title} tooltipText={headerTooltip} />
  );

  if (!hasFeature) {
    return null;
  }

  if (hasPlaceholder) {
    return <Placeholder title={endpointsHeader} />;
  }

  const isFlareTestnetEndpoints =
    publicChain.id === ChainID.FLARE &&
    FLARE_TESTNETS_GROUPS_LIST.includes(group.id);

  if (isFlareTestnetEndpoints) {
    return (
      <>
        {flattenURLs.map(url => (
          <div className={classes.root} key={url}>
            <EndpointsHeader title={renderFlareTitle(url)} />
            <Endpoint
              hasConnectWalletMessage={hasConnectWalletMessage}
              key={url}
              onCopy={onCopyEndpoint}
              url={url}
            />
          </div>
        ))}
      </>
    );
  }

  return (
    <div className={classes.root}>
      {endpointsHeader}
      {flattenURLs.map(url => (
        <Fragment key={url}>
          <Endpoint
            hasConnectWalletMessage={hasConnectWalletMessage}
            onCopy={onCopyEndpoint}
            url={url}
          />
        </Fragment>
      ))}
    </div>
  );
};
