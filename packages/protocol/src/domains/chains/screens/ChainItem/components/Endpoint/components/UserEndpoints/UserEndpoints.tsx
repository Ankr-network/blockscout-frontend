import { Box, Typography } from '@material-ui/core';
import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { useMemo } from 'react';

import { AddEndpointButton } from '../AddEndpointButton';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { UserEndpoint } from 'domains/infrastructure/actions/fetchEndpoints';
import { UserEndpointsForm } from './UserEndpointsForm';
import { getRpcLinks } from './UserEndpointsUtils';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { useStyles } from './UserEndpointsStyles';

interface UserEndpointsProps {
  chainName: string;
  data?: UserEndpoint[];
  hasChain?: boolean;
  isMoreThanLimit: boolean;
  limit?: number;
  privateUrls: string[];
  publicUrls: string[];
}

export const UserEndpoints = ({
  chainName,
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
                : tHTML('providers.endpoint.chain-tooltip-text', {
                    chainId: chainName,
                  })
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
