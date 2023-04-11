import { t } from '@ankr.com/common';
import { useMemo } from 'react';
import { BlockchainType } from 'multirpc-sdk';

import { Endpoint, EndpointProps } from '../Endpoint';
import { EndpointGroup } from 'modules/endpoints/types';
import { ChainID } from 'modules/chains/types';
import { EndpointsHeader } from '../EndpointsHeader';
import { IApiChain } from 'domains/chains/api/queryChains';
import { Placeholder } from './components/Placeholder';
import { root } from '../../const';
import { useRPCEndpointsStyles } from './RPCEndpointsStyles';

export interface RPCEndpointsProps {
  group: EndpointGroup;
  hasBeacon: boolean;
  hasConnectWalletMessage: boolean;
  hasPremium: boolean;
  hasPrivateAccess: boolean;
  onCopyEndpoint: EndpointProps['onCopy'];
  publicChain: IApiChain;
}

const header = `${root}.endpoints.title`;

export const RPCEndpoints = ({
  group,
  hasBeacon,
  hasConnectWalletMessage,
  hasPremium,
  hasPrivateAccess,
  onCopyEndpoint,
  publicChain,
}: RPCEndpointsProps) => {
  const { urls, chainName, chains } = group;

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

  const endpointsHeader = (
    <EndpointsHeader hasPremium={hasPremium} title={title} />
  );

  const isMainnetForPremiumOnly =
    chains[0]?.type === BlockchainType.Mainnet &&
    chains[0]?.isMainnetPremiumOnly;

  if (
    (!hasPrivateAccess && hasBeacon) ||
    (!hasPrivateAccess && isMainnetForPremiumOnly)
  ) {
    return <Placeholder title={endpointsHeader} />;
  }

  return (
    <div className={classes.rpcEndpoints}>
      {endpointsHeader}
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
