import { t } from '@ankr.com/common';

import { ChainType } from 'domains/chains/types';
import { Endpoint, EndpointProps } from '../Endpoint';
import { EndpointGroup } from 'modules/endpoints/types';
import { EndpointsHeader } from '../EndpointsHeader';
import { IApiChain } from 'domains/chains/api/queryChains';
import { root } from '../../const';
import { useRPCEndpointsStyles } from './RPCEndpointsStyles';

export interface RPCEndpointsProps {
  chainType: ChainType;
  group: EndpointGroup;
  hasConnectWalletMessage: boolean;
  isPremium: boolean;
  onCopyEndpoint: EndpointProps['onCopy'];
  publicChain: IApiChain;
}

const header = `${root}.endpoints.title`;

export const RPCEndpoints = ({
  chainType,
  group,
  hasConnectWalletMessage,
  isPremium,
  onCopyEndpoint,
  publicChain,
}: RPCEndpointsProps) => {
  const { urls, chainName } = group;

  const rpcs = urls.flatMap(({ rpc }) => [rpc]);
  const title = t(header, { chainName, rpcs: rpcs.length });

  const { classes } = useRPCEndpointsStyles();

  return (
    <div className={classes.rpcEndpoints}>
      <EndpointsHeader isPremium={isPremium} title={title} />
      {rpcs.map(url => (
        <Endpoint
          chainType={chainType}
          group={group}
          hasConnectWalletMessage={hasConnectWalletMessage}
          key={url}
          onCopy={onCopyEndpoint}
          publicChain={publicChain}
          url={url}
        />
      ))}
    </div>
  );
};
