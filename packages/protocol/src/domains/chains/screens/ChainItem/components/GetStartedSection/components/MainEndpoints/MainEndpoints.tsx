import { Endpoint } from '../Endpoint';
import { EndpointsHeader } from '../EndpointsHeader';
import { MainEndpointsProps } from './types';
import { Placeholder } from './components/Placeholder';
import { useMainEndpoints } from './hooks/useMainEndpoints';
import { useMainEndpointsStyles } from './MainEndpointsStyles';

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
  const { flattenURLs, hasFeature, hasPlaceholder, title } = useMainEndpoints({
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
