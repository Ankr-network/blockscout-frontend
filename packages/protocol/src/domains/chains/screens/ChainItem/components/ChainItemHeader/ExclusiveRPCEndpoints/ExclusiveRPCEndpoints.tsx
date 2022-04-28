import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { EndpointsList } from 'modules/endpoints/components/EndpointsList';
import { IApiChain } from 'domains/chains/api/queryChains';
import { PlanRoutesConfig } from 'domains/plan/Routes';
import { RPCEndpointsTabsManager } from 'modules/common/components/RPCEndpointsTabManager';
import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { t } from 'modules/i18n/utils/intl';
import { useGroupedEndpoints } from 'modules/endpoints/hooks/useGrouppedEndpoints';
import { useStyles } from './ExclusiveRPCEndpointsStyles';

interface ExclusiveRPCEndpointsProps {
  chain: IApiChain;
  isPremium: boolean;
}

const title = t('chain-item.header.endpoints-title');
const tooltip = t('chain-item.header.public-endpoints-tooltip');

export const ExclusiveRPCEndpoints = ({
  chain,
  isPremium,
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

  const additionalContent = (
    <Button
      className={classes.button}
      component={Link}
      disabled={!isPremium}
      to={PlanRoutesConfig.endpoint.generatePath(chain.id)}
      variant="text"
    >
      {t('chain-item.header.settings-button')}
    </Button>
  );

  const testnetEndpoints =
    testnet.length > 0 ? <EndpointsList groups={testnet} /> : null;

  return (
    <RPCEndpointsTabsManager
      additionalContent={additionalContent}
      mainnetEndpoints={<EndpointsList groups={mainnet} />}
      testnetEndpoints={testnetEndpoints}
      title={tabsTitle}
    />
  );
};
