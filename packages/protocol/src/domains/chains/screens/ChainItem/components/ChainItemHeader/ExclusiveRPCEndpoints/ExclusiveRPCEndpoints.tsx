import React, { useEffect } from 'react';
import { Typography, Button } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';

import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { Preloader } from 'uiKit/Preloader';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { fetchPrivateChainDetails } from 'domains/chains/actions/fetchPrivateChainDetails';
import { flatNetworkURLs } from 'modules/auth/utils/flatNetworkURLs';
import { t } from 'modules/i18n/utils/intl';

import { useStyles } from './ExclusiveRPCEndpointsStyles';
import { RPCEndpointsTabsManager } from 'modules/common/components/RPCEndpointsTabManager';
import { IApiChain, IApiChainURL } from 'domains/chains/api/queryChains';

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
        const { mainnetURLs, mainnetURLsCount, testnetURLs } = flatNetworkURLs<
          IApiChainURL,
          IApiChain
        >(data);

        const isTitlePlural = mainnetURLsCount > 1 || testnetURLs.length > 0;
        const title = (
          <Typography variant="body2" className={classes.text}>
            {t('chain-item.header.private-endpoints', {
              plural: isTitlePlural ? t('chain-item.header.plural') : '',
            })}
          </Typography>
        );

        const mainnetEndpoints = (
          <div className={classes.root}>
            {mainnetURLs.map(({ rpc, ws }) => (
              <div className={classes.section} key={rpc + ws}>
                <CopyToClipIcon
                  className={classes.copyToClip}
                  message={t('common.copy-message')}
                  size="l"
                  text={rpc}
                  textColor="textPrimary"
                />
                {ws && (
                  <CopyToClipIcon
                    className={classes.copyToClip}
                    message={t('common.copy-message')}
                    size="l"
                    text={ws}
                    textColor="textPrimary"
                  />
                )}
              </div>
            ))}
          </div>
        );

        const testnetEndpoints =
          testnetURLs.length > 0 ? (
            <div className={classes.root}>
              {testnetURLs.map(({ rpc, ws }) => (
                <div className={classes.section} key={rpc + ws}>
                  <CopyToClipIcon
                    className={classes.copyToClip}
                    message={t('common.copy-message')}
                    size="l"
                    text={rpc}
                    textColor="textPrimary"
                  />
                  {ws && (
                    <CopyToClipIcon
                      className={classes.copyToClip}
                      message={t('common.copy-message')}
                      size="l"
                      text={ws}
                      textColor="textPrimary"
                    />
                  )}
                </div>
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
