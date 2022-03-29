import React from 'react';
import { Typography } from '@material-ui/core';

import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { IApiChain, IApiChainURL } from 'domains/chains/api/queryChains';
import { RPCEndpointsTabsManager } from 'modules/common/components/RPCEndpointsTabManager';
import { t } from 'modules/i18n/utils/intl';

import { useStyles } from './PublicRPCEndpointsStyles';

interface PublicRPCEndpointsProps {
  chain: IApiChain;
}

export const PublicRPCEndpoints = ({ chain }: PublicRPCEndpointsProps) => {
  const classes = useStyles();

  const isNervos = chain.id === 'nervos';
  const mainnetURLs = [
    ...chain.urls,
    ...(chain.extensions || []).flatMap<IApiChainURL>(({ urls }) => urls),
    ...(chain.extenders || []).flatMap<IApiChainURL>(({ urls }) => urls),
  ];
  const testnetURLs = (chain.testnets || []).flatMap<IApiChainURL>(
    ({ extensions, urls }) => [
      ...urls,
      ...(extensions || []).flatMap<IApiChainURL>(extension => extension.urls),
    ],
  );

  const isTitlePlural =
    mainnetURLs.flatMap<string>(({ rpc, ws }) => (ws ? [rpc, ws] : [rpc]))
      .length > 1 || testnetURLs.length > 0;
  const title = (
    <Typography variant="body2" className={classes.text}>
      {t('chain-item.header.public-endpoints', {
        plural: isTitlePlural ? t('chain-item.header.plural') : '',
      })}
    </Typography>
  );

  const mainnetEndpoints = (
    <div className={isNervos ? classes.nervos : classes.root}>
      {mainnetURLs.map(({ rpc, ws }, index) => {
        return (
          <div className={classes.section} key={rpc + ws}>
            <div className={classes.link}>
              <CopyToClipIcon
                text={rpc}
                message={t('common.copy-message')}
                copyText={t('common.copy-text')}
                size="l"
                textColor="textPrimary"
                className={classes.copyToClip}
              />
              {isNervos && (
                <Typography
                  variant="subtitle2"
                  className={classes.label}
                  color="textSecondary"
                >
                  {t(
                    `chain-item.nervos.${
                      index === 0 ? 'eth-based' : 'godwoken-based'
                    }`,
                  )}
                </Typography>
              )}
            </div>
            {ws && (
              <div className={classes.link}>
                <CopyToClipIcon
                  text={ws}
                  message={t('common.copy-message')}
                  copyText={t('common.copy-text')}
                  size="l"
                  textColor="textPrimary"
                  className={classes.copyToClip}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const testnetEndpoints =
    testnetURLs.length > 0 ? (
      <div className={classes.root}>
        {testnetURLs.map(({ rpc, ws }) => {
          return (
            <div className={classes.section} key={rpc + ws}>
              <div className={classes.link}>
                <CopyToClipIcon
                  text={rpc}
                  message={t('common.copy-message')}
                  copyText={t('common.copy-text')}
                  size="l"
                  textColor="textPrimary"
                  className={classes.copyToClip}
                />
              </div>
              {ws && (
                <div className={classes.link}>
                  <CopyToClipIcon
                    text={ws}
                    message={t('common.copy-message')}
                    copyText={t('common.copy-text')}
                    size="l"
                    textColor="textPrimary"
                    className={classes.copyToClip}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    ) : null;

  return (
    <RPCEndpointsTabsManager
      title={title}
      mainnetEndpoints={mainnetEndpoints}
      testnetEndpoints={testnetEndpoints}
    />
  );
};
