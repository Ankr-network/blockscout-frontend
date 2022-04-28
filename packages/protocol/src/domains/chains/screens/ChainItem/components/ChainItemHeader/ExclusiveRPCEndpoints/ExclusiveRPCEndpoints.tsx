import { Typography } from '@material-ui/core';
import { IApiChain } from 'domains/chains/api/queryChains';
import { RPCEndpointsTabsManager } from 'modules/common/components/RPCEndpointsTabManager';
import { EndpointsList } from 'modules/endpoints/components/EndpointsList';
import { useGroupedEndpoints } from 'modules/endpoints/hooks/useGrouppedEndpoints';
import { t } from 'modules/i18n/utils/intl';
import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { useStyles } from './ExclusiveRPCEndpointsStyles';

interface ExclusiveRPCEndpointsProps {
  chain: IApiChain;
}

const title = t('chain-item.header.endpoints-title');
const tooltip = t('chain-item.header.public-endpoints-tooltip');

export const ExclusiveRPCEndpoints = ({
  chain,
}: ExclusiveRPCEndpointsProps) => {
  const classes = useStyles();

  const { mainnet, testnet } = useGroupedEndpoints(chain);

  const tabsTitle = (
    <TooltipWrapper tooltipText={tooltip}>
      <Typography className={classes.title} variant="body2">
        {title}
      </Typography>
    </TooltipWrapper>
  );

  const testnetEndpoints =
    testnet.length > 0 ? <EndpointsList groups={testnet} /> : null;

  return (
    <RPCEndpointsTabsManager
      mainnetEndpoints={<EndpointsList groups={mainnet} />}
      testnetEndpoints={testnetEndpoints}
      title={tabsTitle}
    />
  );
};
