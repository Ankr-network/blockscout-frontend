import React, { useMemo } from 'react';
import { Box, Typography } from '@material-ui/core';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { useStyles } from './UserEndpointsStyles';
import { AddEndpointButton } from 'domains/nodeProviders/screens/ProvidersList/components/AddEndpointButton';
import { UserEndpointsForm } from './UserEndpointsForm';
import { IUserEndpoint } from 'domains/infrastructure/actions/fetchEndpoints';
import { getRpcLinks } from './UserEndpointsUtils';
import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { ChainsRoutesConfig } from 'domains/chains/Routes';

interface UserEndpointsProps {
  data?: IUserEndpoint[];
  hasChain?: boolean;
  isMoreThanLimit: boolean;
  limit?: number;
  privateUrls: string[];
  publicUrls: string[];
}

export const UserEndpoints = ({
  data = [],
  hasChain,
  isMoreThanLimit,
  limit,
  privateUrls,
  publicUrls,
}: UserEndpointsProps) => {
  const classes = useStyles();

  const { chainId } = ChainsRoutesConfig.chainDetails.useParams();

  const addEndpointLink = useMemo(
    () => ChainsRoutesConfig.addEndpoint.generatePath(chainId),
    [chainId],
  );

  const rpcLinks = useMemo(() => getRpcLinks(data), [data]);

  return (
    <>
      <Box className={classes.top}>
        <TooltipWrapper
          iconClassName={classes.tooltipIcon}
          tooltipText={tHTML('providers.user-endpoints.tooltip')}
        >
          <Typography variant="body2" className={classes.text}>
            {t('providers.user-endpoints.title', {
              plural: rpcLinks.length > 1 ? t('chain-item.header.plural') : '',
            })}
          </Typography>
        </TooltipWrapper>

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
        <UserEndpointsForm
          endpoints={data}
          chainId={chainId}
          privateUrls={privateUrls}
          publicUrls={publicUrls}
        />
      )}
    </>
  );
};
