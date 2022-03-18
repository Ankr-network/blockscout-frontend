import React, { useEffect } from 'react';
import { Typography, Button } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';

import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { Preloader } from 'uiKit/Preloader';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { fetchPrivateChainDetails } from 'domains/chains/actions/fetchPrivateChainDetails';
import { t } from 'modules/i18n/utils/intl';

import { useStyles } from './ExclusiveRPCEndpointsStyles';
import { RPCEndpointsTabsManager } from '../RPCEndpointsTabManager';

interface ExclusiveRPCEndpointsProps {
  chainId: string;
}

export const ExclusiveRPCEndpoints = ({
  chainId,
}: ExclusiveRPCEndpointsProps) => {
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
        const { rpcUrls, wsUrls, testnets } = data;

        const title = (
          <Typography variant="body2" className={classes.text}>
            {t('chain-item.header.private-endpoints', {
              plural: t('chain-item.header.plural'),
            })}
          </Typography>
        );

        const mainnetEndpoints = (
          <div className={classes.bottom}>
            {rpcUrls.map(item => {
              return (
                <CopyToClipIcon
                  text={item}
                  message={t('common.copy-message')}
                  size="l"
                  textColor="textPrimary"
                  className={classes.copyToClip}
                  key={item}
                />
              );
            })}
            {wsUrls.map(item => {
              return (
                <CopyToClipIcon
                  text={item}
                  message={t('common.copy-message')}
                  size="l"
                  textColor="textPrimary"
                  className={classes.copyToClip}
                  key={item}
                />
              );
            })}
          </div>
        );

        const testnetEndpoints =
          testnets && testnets.length > 0 ? (
            <div className={classes.bottom}>
              {testnets.map((testnet, index) => (
                <React.Fragment key={index}>
                  {testnet.rpcUrls?.map(item => (
                    <CopyToClipIcon
                      text={item}
                      message={t('common.copy-message')}
                      size="l"
                      textColor="textPrimary"
                      className={classes.copyToClip}
                      key={item}
                    />
                  ))}
                  {testnet.wsUrls?.map(item => (
                    <CopyToClipIcon
                      text={item}
                      message={t('common.copy-message')}
                      size="l"
                      textColor="textPrimary"
                      className={classes.copyToClip}
                      key={item}
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
          ) : null;

        const additionalContent = (
          <Button variant="text" disabled className={classes.button}>
            {t('chain-item.header.settings-button')}
          </Button>
        );

        return (
          <RPCEndpointsTabsManager
            additionalContent={additionalContent}
            mainnetEndpoints={mainnetEndpoints}
            testnetEndpoints={testnetEndpoints}
            title={title}
          />
        );
      }}
    </Queries>
  );
};
