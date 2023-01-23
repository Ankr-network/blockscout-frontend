import { Endpoint, EndpointProps } from '../Endpoint';
import { EndpointGroup } from 'modules/endpoints/types';
import { EndpointsHeader } from '../EndpointsHeader';
import { root } from '../../const';
import { t } from '@ankr.com/common';
import { useWSEndpointsStyles } from './WSEndpointsStyles';

export interface WSEndpointsProps {
  group: EndpointGroup;
  hasConnectWalletMessage: boolean;
  onCopyEndpoint: EndpointProps['onCopy'];
}

const title = t(`${root}.endpoints.websocket-title`);

export const WSEndpoints = ({
  group: { urls },
  hasConnectWalletMessage,
  onCopyEndpoint,
}: WSEndpointsProps) => {
  const wss = urls.flatMap(({ ws }) => (ws ? [ws] : []));

  const { classes } = useWSEndpointsStyles();

  return wss.length ? (
    <div className={classes.wsEndpoints}>
      <EndpointsHeader title={title} />
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
