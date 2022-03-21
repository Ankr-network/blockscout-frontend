import React from 'react';
import { Typography } from '@material-ui/core';

import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { IApiChain } from 'domains/chains/api/queryChains';
import { RPCEndpointsTabsManager } from 'modules/common/components/RPCEndpointsTabManager';
import { t } from 'modules/i18n/utils/intl';

import { useStyles } from './PrivateEndpointsStyles';

interface PrivateEndpointsProps {
  chain: IApiChain;
}

export const PrivateEndpoints = ({ chain }: PrivateEndpointsProps) => {
  const classes = useStyles();

  const mainnetURLs = [...chain.rpcUrls, ...chain.wsUrls];
  const testnetURLs = (chain.testnets || []).flatMap(({ rpcUrls, wsUrls }) => [
    ...rpcUrls,
    ...wsUrls,
  ]);

  const isTitlePlural = mainnetURLs.length > 1 || testnetURLs.length > 0;
  const title = (
    <Typography variant="body2" className={classes.text}>
      {t('providers.private-endpoints.title', {
        plural: isTitlePlural ? t('providers.private-endpoints.plural') : '',
      })}
    </Typography>
  );

  const mainnetEndpoints = (
    <div className={classes.root}>
      {mainnetURLs.map(link => (
        <div className={classes.section} key={link}>
          <div className={classes.link}>
            <CopyToClipIcon
              text={link}
              message={t('common.copy-message')}
              copyText={t('common.copy')}
              size="l"
              textColor="textPrimary"
              className={classes.copyToClip}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const testnetEndpoints =
    testnetURLs.length > 0 ? (
      <div className={classes.root}>
        {testnetURLs.map(link => (
          <div className={classes.section} key={link}>
            <div className={classes.link}>
              <CopyToClipIcon
                text={link}
                message={t('common.copy-message')}
                copyText={t('common.copy')}
                size="l"
                textColor="textPrimary"
                className={classes.copyToClip}
              />
            </div>
          </div>
        ))}
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
