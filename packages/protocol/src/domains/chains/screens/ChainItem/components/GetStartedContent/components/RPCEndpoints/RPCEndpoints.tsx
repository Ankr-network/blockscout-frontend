import { Endpoint } from '../Endpoint';
import { EndpointGroup } from 'modules/endpoints/types';
import { EndpointsHeader } from '../EndpointsHeader';
import { IApiChain } from 'domains/chains/api/queryChains';
import { root } from '../../const';
import { t } from 'modules/i18n/utils/intl';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useRPCEndpointsStyles } from './RPCEndpointsStyles';

export interface RPCEndpointsProps {
  chain: IApiChain;
  group: EndpointGroup;
}

const header = `${root}.endpoints.title`;

export const RPCEndpoints = ({
  chain,
  group: { urls, chainName },
}: RPCEndpointsProps) => {
  const { credentials } = useAuth();

  const rpcs = urls.flatMap(({ rpc }) => [rpc]);
  const title = t(header, { chainName, rpcs: rpcs.length });

  const classes = useRPCEndpointsStyles();

  return (
    <div className={classes.rpcEndpoints}>
      <EndpointsHeader isPremium={!!credentials} title={title} />
      {rpcs.map(url => (
        <Endpoint chain={chain} url={url} key={url} />
      ))}
    </div>
  );
};
