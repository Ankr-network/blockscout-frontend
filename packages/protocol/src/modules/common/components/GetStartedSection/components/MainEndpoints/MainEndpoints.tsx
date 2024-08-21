import { Fragment } from 'react';

import { ChainID } from 'modules/chains/types';
import { FLARE_TESTNETS_GROUPS_LIST } from 'modules/endpoints/types';

import { Endpoint } from '../Endpoint';
import { EndpointsHeader } from '../EndpointsHeader';
import { MainEndpointsProps } from './types';
import { Placeholder } from './components/Placeholder';
import { useMainEndpoints } from './hooks/useMainEndpoints';
import { useMainEndpointsStyles } from './MainEndpointsStyles';
import { renderFlareTitle } from './utils/renderFlareTitle';

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

  const endpointsHeader = <EndpointsHeader title={title} />;

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
