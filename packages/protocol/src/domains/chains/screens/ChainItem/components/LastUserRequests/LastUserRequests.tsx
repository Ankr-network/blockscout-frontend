import { t } from '@ankr.com/common';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { OverlaySpinner } from '@ankr.com/ui';

import { privateLatestRequests } from 'domains/chains/actions/fetchPrivateLatestRequests';
import { useLastUserRequestsStyles } from './useLastUserRequestsStyles';
import { Queries } from 'modules/common/components/Queries/Queries';
import { LatestRequest } from 'multirpc-sdk';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import {
  checkPayloadNowrap,
  formatDate,
  formatPayload,
  options,
} from './LastUserRequestsUtils';

export const LastUserRequests = () => {
  const { classes } = useLastUserRequestsStyles();

  const [fetchPrivateLatestRequests, latestRequestState, reset] =
    useQueryEndpoint(privateLatestRequests, options);

  useEffect(() => reset, [reset]);

  useEffect(() => {
    const { unsubscribe } = fetchPrivateLatestRequests();

    return unsubscribe;
  }, [fetchPrivateLatestRequests]);

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        {t('chain-item.usage-data.last-requests.title')}
      </Box>
      <Box className={classes.content}>
        <Queries<LatestRequest[]>
          queryStates={[latestRequestState]}
          isPreloadDisabled
          disableErrorRender
        >
          {({ data, isUninitialized, error }) => {
            if (error || (Array.isArray(data) && data?.length === 0)) {
              return (
                <Box className={classes.emptyContent}>
                  <Typography variant="body2" className={classes.empty}>
                    {t('chain-item.usage-data.last-requests.empty')}
                  </Typography>
                </Box>
              );
            }

            if (isUninitialized || !data) {
              return (
                <Box className={classes.loading}>
                  <OverlaySpinner />
                </Box>
              );
            }

            return (
              <>
                <Box className={classes.thead}>
                  <Box className={classes.row}>
                    <Box className={classes.item}>
                      {t(
                        'chain-item.usage-data.last-requests.table.header.column-1',
                      )}
                    </Box>
                    <Box className={classes.item}>
                      {t(
                        'chain-item.usage-data.last-requests.table.header.column-2',
                      )}
                    </Box>
                    <Box className={classes.item}>
                      {t(
                        'chain-item.usage-data.last-requests.table.header.column-3',
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box className={classes.tbody}>
                  {data?.map(({ blockchain, payload, ts }) => {
                    const formattedPayload = formatPayload(payload);
                    const hasNowrap = checkPayloadNowrap(formattedPayload);

                    return (
                      <Box className={classes.row}>
                        <Typography
                          variant="subtitle2"
                          className={classes.item}
                          component="span"
                        >
                          {blockchain}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          className={classes.item}
                          component="span"
                          noWrap={hasNowrap}
                        >
                          {formattedPayload}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          className={classes.item}
                          component="span"
                        >
                          {formatDate(ts)}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </>
            );
          }}
        </Queries>
      </Box>
    </Box>
  );
};
