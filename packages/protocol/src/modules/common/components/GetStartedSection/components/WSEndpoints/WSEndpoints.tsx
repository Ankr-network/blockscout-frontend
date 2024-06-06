import { ReactNode } from 'react';

import { Endpoint, EndpointProps } from '../Endpoint';
import { useWsEdnpointsStyles } from './useWsEndpointsStyles';

export interface WSEndpointsProps {
  title: ReactNode;
  wss: string[];
  hasConnectWalletMessage: boolean;
  onCopyEndpoint: EndpointProps['onCopy'];
}

export const WSEndpoints = ({
  hasConnectWalletMessage,
  onCopyEndpoint,
  title,
  wss,
}: WSEndpointsProps) => {
  const { classes } = useWsEdnpointsStyles();

  return wss.length > 0 ? (
    <div className={classes.root}>
      {title}
      {wss.map(url => (
        <Endpoint
          hasConnectWalletMessage={hasConnectWalletMessage}
          key={url}
          onCopy={onCopyEndpoint}
          url={url}
        />
      ))}
    </div>
  ) : null;
};
