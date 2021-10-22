import React, { useEffect } from 'react';
import { Typography, Button } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';

import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { Preloader } from 'uiKit/Preloader';
import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './useStyles';
import { fetchPrivateChainDetails } from 'domains/chains/actions/fetchPrivateChainDetails';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';

interface PrivateHeaderProps {
  chainId: string;
}

export const PrivateHeader = ({ chainId }: PrivateHeaderProps) => {
  const classes = useStyles();

  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    dispatchRequest(fetchPrivateChainDetails(chainId));
  }, [dispatchRequest, chainId]);

  return (
    <Queries<ResponseData<typeof fetchPrivateChainDetails>>
      requestActions={[fetchPrivateChainDetails]}
      spinner={
        <div className={classes.preloaderWrapper}>
          <Preloader centered />
        </div>
      }
    >
      {({ data }) => {
        const { rpcUrl, wsUrl, requests } = data;

        return (
          <div className={classes.root}>
            <div className={classes.top}>
              <div className={classes.left}>
                <Typography variant="body2" className={classes.text}>
                  {t('chain-item.header.bottom')}
                </Typography>
                {requests && (
                  <ChainRequestsLabel
                    description={t('chains.requests', { value: requests })}
                    descriptionColor="textSecondary"
                  />
                )}
              </div>
              <Button variant="text" disabled>
                {t('chain-item.header.settings-button')}
              </Button>
            </div>
            <div className={classes.bottom}>
              <CopyToClipIcon
                text={rpcUrl}
                message={t('common.copy-message')}
                size="l"
                textColor="textPrimary"
                className={classes.copyToClip}
              />
              {wsUrl && (
                <CopyToClipIcon
                  text={wsUrl}
                  message={t('common.copy-message')}
                  size="l"
                  textColor="textPrimary"
                  className={classes.copyToClip}
                />
              )}
            </div>
          </div>
        );
      }}
    </Queries>
  );
};
