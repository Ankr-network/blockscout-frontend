import { Typography } from '@material-ui/core';
import { IApiChain } from 'domains/chains/api/queryChains';
import { RPCEndpointsTabsManager } from 'modules/common/components/RPCEndpointsTabManager';
import { EndpointsList } from 'modules/endpoints/components/EndpointsList';
import { useGroupedEndpoints } from 'modules/endpoints/hooks/useGrouppedEndpoints';
import { t } from 'modules/i18n/utils/intl';
import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { useInitialRPCEndpointsTabID } from '../ChainItemHeaderUtils';
import { useStyles } from './ExclusiveRPCEndpointsStyles';

interface ExclusiveRPCEndpointsProps {
  chain: IApiChain;
  netId?: string;
}

const title = t('chain-item.header.endpoints-title');
const tooltip = t('chain-item.header.public-endpoints-tooltip');

export const ExclusiveRPCEndpoints = ({
  chain,
  netId,
}: ExclusiveRPCEndpointsProps) => {
  const classes = useStyles();

  const { mainnet, testnet, devnet } = useGroupedEndpoints(chain);

  const initialTabID = useInitialRPCEndpointsTabID(chain, netId);

  const tabsTitle = (
    <TooltipWrapper tooltipText={tooltip}>
      <Typography className={classes.title} variant="body2">
        {title}
      </Typography>
    </TooltipWrapper>
  );

  const testnetEndpoints =
    testnet.length > 0 ? <EndpointsList groups={testnet} /> : null;

  const devnetEndpoints =
    devnet.length > 0 ? <EndpointsList groups={devnet} /> : null;

  return (
    <RPCEndpointsTabsManager
      mainnetEndpoints={<EndpointsList groups={mainnet} />}
      testnetEndpoints={testnetEndpoints}
      devnetEndpoints={devnetEndpoints}
      title={tabsTitle}
      initialTabID={initialTabID}
    />
  );
};
