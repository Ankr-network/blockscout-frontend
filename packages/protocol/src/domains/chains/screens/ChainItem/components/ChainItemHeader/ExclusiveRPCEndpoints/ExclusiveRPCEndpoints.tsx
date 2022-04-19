import React from 'react';
import { Typography } from '@material-ui/core';

import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { Preloader } from 'uiKit/Preloader';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { flatNetworkURLs } from 'modules/auth/utils/flatNetworkURLs';
import { t } from 'modules/i18n/utils/intl';

import { useStyles } from './ExclusiveRPCEndpointsStyles';
import { RPCEndpointsTabsManager } from 'modules/common/components/RPCEndpointsTabManager';
import { IApiChain, IApiChainURL } from 'domains/chains/api/queryChains';
import { fetchPrivateChainDetails } from 'domains/chains/actions/fetchPrivateChainDetails';

export const ExclusiveRPCEndpoints = () => {
  const classes = useStyles();

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
          <Typography variant="body2" className={classes.title}>
            {t('chain-item.header.private-endpoints', {
              plural: isTitlePlural ? t('chain-item.header.plural') : '',
            })}
          </Typography>
        );

        const isNervos = data.id === 'nervos';
        const [root, section] = isNervos
          ? [classes.nervos, undefined]
          : [classes.root, classes.section];

        const mainnetEndpoints = (
          <div className={root}>
            {mainnetURLs.map(({ rpc, ws }) => (
              <div className={section} key={rpc + ws}>
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
            <div className={root}>
              {testnetURLs.map(({ rpc, ws }) => (
                <div className={section} key={rpc + ws}>
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

        return (
          <RPCEndpointsTabsManager
            mainnetEndpoints={mainnetEndpoints}
            testnetEndpoints={testnetEndpoints}
            title={title}
          />
        );
      }}
    </Queries>
  );
};
