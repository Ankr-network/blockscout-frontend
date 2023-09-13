import { t } from '@ankr.com/common';

import { Endpoint } from '../Endpoint';
import { EndpointsHeader } from '../EndpointsHeader';
import { MainEndpointsProps } from './types';
import { Placeholder } from './components/Placeholder';
import { useMainEndpoints } from './hooks/useMainEndpoints';
import { useMainEndpointsStyles } from './MainEndpointsStyles';
import { root } from '../../const';
import { EndpointPlaceholder } from '../EndpointPlaceholder';

export const MainEndpoints = ({
  hasConnectWalletMessage,
  hasPremium,
  onCopyEndpoint,
  feature,
  chainSubType,
  group,
  hasPrivateAccess,
  publicChain,
}: MainEndpointsProps) => {
  const { flattenURLs, hasFeature, hasPlaceholder, title, isDisabled } =
    useMainEndpoints({
      feature,
      chainSubType,
      group,
      hasPrivateAccess,
      publicChain,
      hasPremium,
    });

  const { classes } = useMainEndpointsStyles();

  const endpointsHeader = (
    <EndpointsHeader hasPremium={hasPremium} title={title} />
  );

  if (!hasFeature) {
    return null;
  }

  if (isDisabled) {
    return (
      <EndpointPlaceholder
        label={t('enterprise.disabled-endpoint-placeholder')}
        title={
          <EndpointsHeader
            title={t(`${root}.endpoints.title`, {
              chainName: group.chainName,
              urls: 1,
            })}
          />
        }
      />
    );
  }

  if (hasPlaceholder) {
    return <Placeholder title={endpointsHeader} />;
  }

  return (
    <div className={classes.root}>
      {endpointsHeader}
      {flattenURLs.map(url => (
        <Endpoint
          hasConnectWalletMessage={hasConnectWalletMessage}
          key={url}
          onCopy={onCopyEndpoint}
          url={url!}
        />
      ))}
    </div>
  );
};
