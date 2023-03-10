import { t } from '@ankr.com/common';

import { Endpoint, EndpointProps } from '../Endpoint';
import { EndpointGroup } from 'modules/endpoints/types';
import { ChainID } from 'modules/chains/types';
import { EndpointsHeader } from '../EndpointsHeader';
import { IApiChain } from 'domains/chains/api/queryChains';
import { root } from '../../const';
import { useRPCEndpointsStyles } from './RPCEndpointsStyles';
import { useMemo } from 'react';

export interface RPCEndpointsProps {
  group: EndpointGroup;
  hasConnectWalletMessage: boolean;
  hasPremium: boolean;
  onCopyEndpoint: EndpointProps['onCopy'];
  publicChain: IApiChain;
}

const header = `${root}.endpoints.title`;

export const RPCEndpoints = ({
  group,
  hasConnectWalletMessage,
  hasPremium,
  onCopyEndpoint,
  publicChain,
}: RPCEndpointsProps) => {
  const { urls, chainName } = group;

  const isMultiChain = publicChain.id === ChainID.MULTICHAIN;
  const rpcs = urls.flatMap(({ rpc }) => [rpc]);
  const title = useMemo(
    () =>
      isMultiChain
        ? t(`${root}.endpoints.title-multichain`)
        : t(header, { chainName, rpcs: rpcs.length }),
    [isMultiChain, chainName, rpcs.length],
  );

  const { classes } = useRPCEndpointsStyles();

  return (
    <div className={classes.rpcEndpoints}>
      <EndpointsHeader hasPremium={hasPremium} title={title} />
      {rpcs.map(url => (
        <Endpoint
          hasConnectWalletMessage={hasConnectWalletMessage}
          key={url}
          onCopy={onCopyEndpoint}
          url={url}
        />
      ))}
    </div>
  );
};
