import React from 'react';
import { Typography } from '@material-ui/core';

import { EndpointsList } from 'modules/endpoints/components/EndpointsList';
import { IApiChain } from 'domains/chains/api/queryChains';
import { RPCEndpointsTabsManager } from 'modules/common/components/RPCEndpointsTabManager';
import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { t } from 'modules/i18n/utils/intl';
import { useGroupedEndpoints } from 'modules/endpoints/hooks/useGrouppedEndpoints';
import { useStyles } from './PrivateEndpointsStyles';

interface PrivateEndpointsProps {
  chain: IApiChain;
}

const title = t('chain-item.header.endpoints-title');
const tooltip = t('providers.private-endpoints.tooltip');

export const PrivateEndpoints = ({ chain }: PrivateEndpointsProps) => {
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
