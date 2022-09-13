import React, { useEffect } from 'react';
import { Skeleton } from '@material-ui/lab';
import { Typography } from '@material-ui/core';
import { t } from 'common';

import { useDispatchRequest } from '@redux-requests/react';
import { fetchLastBlockNumber } from 'domains/requestComposer/actions/fetchLastBlockNumber';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useHeaderStyles } from './useHeaderStyles';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { stopPolling } from '@redux-requests/core';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

interface IHeaderProps {
  publicUrl: string;
}

export const Header = ({ publicUrl }: IHeaderProps) => {
  const classes = useHeaderStyles();
  const dispatch = useDispatch();
  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    dispatchRequest(fetchLastBlockNumber(publicUrl));
  }, [dispatchRequest, publicUrl]);

  useOnUnmount(() => {
    dispatch(stopPolling([fetchLastBlockNumber.toString()]));
  });

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        {t('chain-item.request-composer.header.title')}
      </Typography>
      <div className={classes.info}>
        <div className={classes.define}>
          <Typography variant="body2" className={classes.label}>
            {t('chain-item.request-composer.header.chain')}
          </Typography>
          <Typography variant="body2" className={classes.content}>
            {t('chain-item.request-composer.header.evm')}
          </Typography>
        </div>
        <div className={classes.define}>
          <Typography variant="body2" className={classes.label}>
            {t('chain-item.request-composer.header.connection')}
          </Typography>
          <Typography variant="body2" className={classes.content}>
            {t('chain-item.request-composer.header.https')}
          </Typography>
        </div>
        <Queries<ResponseData<typeof fetchLastBlockNumber>>
          requestActions={[fetchLastBlockNumber]}
          isPreloadDisabled
        >
          {({ data, loading }) => (
            <>
              {data && (
                <div className={classes.define}>
                  <Typography variant="body2" className={classes.label}>
                    {t('chain-item.request-composer.header.last-block-number')}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={classNames(classes.content, classes.blockNumber)}
                  >
                    {loading ? <Skeleton className={classes.skeleton} /> : data}
                  </Typography>
                </div>
              )}
            </>
          )}
        </Queries>
      </div>
    </div>
  );
};
