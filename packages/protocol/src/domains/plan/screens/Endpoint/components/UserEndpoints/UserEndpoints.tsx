import React, { useMemo } from 'react';
import { Box, Typography } from '@material-ui/core';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { useStyles } from './UserEndpointsStyles';
import { AddEndpointButton } from 'domains/nodeProviders/screens/ProvidersList/components/AddEndpointButton';
import { PlanRoutesConfig } from 'domains/plan/Routes';
import { UserEndpointsForm } from './UserEndpointsForm';
import { IUserEndpoint } from 'domains/nodeProviders/actions/fetchEndpoints';
import { getRpcLinks } from './UserEndpointsUtils';
import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';

interface UserEndpointsProps {
  data?: IUserEndpoint[];
  hasChain?: boolean;
  isMoreThanLimit: boolean;
  limit?: number;
}

export const UserEndpoints = ({
  data = [],
  hasChain,
  isMoreThanLimit,
  limit,
}: UserEndpointsProps) => {
  const classes = useStyles();

  const { chainId } = PlanRoutesConfig.endpoint.useParams();

  const addEndpointLink = useMemo(
    () => PlanRoutesConfig.addEndpoint.generatePath(chainId),
    [chainId],
  );

  const rpcLinks = useMemo(() => getRpcLinks(data), [data]);

  return (
    <>
      <Box className={classes.top}>
        <Typography variant="body2" className={classes.text}>
          {t('providers.private-endpoints.user-endpoint', {
            plural: rpcLinks.length > 1 ? t('chain-item.header.plural') : '',
          })}
        </Typography>

        {isMoreThanLimit || !hasChain ? (
          <TooltipWrapper
            hasIcon={false}
            tooltipText={
              isMoreThanLimit
                ? tHTML('providers.endpoint.tooltip-text', { limit })
                : tHTML('providers.endpoint.chain-tooltip-text', { chainId })
            }
          >
            <AddEndpointButton
              link={addEndpointLink}
              isDisabled={!hasChain || isMoreThanLimit}
            />
          </TooltipWrapper>
        ) : (
          <AddEndpointButton link={addEndpointLink} isDisabled={!hasChain} />
        )}
      </Box>
      {rpcLinks.length > 0 && (
        <UserEndpointsForm endpoints={data} chainId={chainId} />
      )}
    </>
  );
};
