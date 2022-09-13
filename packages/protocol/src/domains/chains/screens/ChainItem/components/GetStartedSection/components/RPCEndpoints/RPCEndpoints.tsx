import { useAuth } from 'domains/auth/hooks/useAuth';
import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainType } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { t } from 'modules/i18n/utils/intl';
import { root } from '../../const';
import { Endpoint } from '../Endpoint';
import { EndpointsHeader } from '../EndpointsHeader';
import { useRPCEndpointsStyles } from './RPCEndpointsStyles';

export interface RPCEndpointsProps {
  publicChain: IApiChain;
  chainType: ChainType;
  group: EndpointGroup;
}

const header = `${root}.endpoints.title`;

export const RPCEndpoints = ({
  publicChain,
  chainType,
  group,
}: RPCEndpointsProps) => {
  const { credentials } = useAuth();
  const { urls, chainName } = group;

  const rpcs = urls.flatMap(({ rpc }) => [rpc]);
  const title = t(header, { chainName, rpcs: rpcs.length });

  const classes = useRPCEndpointsStyles();

  return (
    <div className={classes.rpcEndpoints}>
      <EndpointsHeader isPremium={!!credentials} title={title} />
      {rpcs.map(url => (
        <Endpoint
          publicChain={publicChain}
          chainType={chainType}
          group={group}
          url={url}
          key={url}
        />
      ))}
    </div>
  );
};
