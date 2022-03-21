import React from 'react';
import { Typography } from '@material-ui/core';

import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { IApiChain } from 'domains/chains/api/queryChains';
import { RPCEndpointsTabsManager } from 'modules/common/components/RPCEndpointsTabManager';
import { t } from 'modules/i18n/utils/intl';

import { useStyles } from './PublicRPCEndpointsStyles';

interface PublicRPCEndpointsProps {
  chain: IApiChain;
  isNervos?: boolean;
}

export const PublicRPCEndpoints = ({
  chain,
  isNervos,
}: PublicRPCEndpointsProps) => {
  const classes = useStyles();

  const mainnetLinks = [...chain.rpcUrls, ...chain.wsUrls];
  const testnetLinks = (chain.testnets || []).flatMap<string>(
    ({ rpcUrls, wsUrls }) => [...rpcUrls, ...wsUrls],
  );

  const isTitlePlural = mainnetLinks.length > 1 || testnetLinks.length > 0;
  const title = (
    <Typography variant="body2" className={classes.text}>
      {t('chain-item.header.public-endpoints', {
        plural: isTitlePlural ? t('chain-item.header.plural') : '',
      })}
    </Typography>
  );

  const mainnetEndpoints = (
    <div className={classes.root}>
      {mainnetLinks.map((link, index) => {
        return (
          <div className={classes.section} key={link}>
            <div className={classes.link}>
              <CopyToClipIcon
                text={link}
                message={t('common.copy-message')}
                copyText={t('common.copy-text')}
                size="l"
                textColor="textPrimary"
                className={classes.copyToClip}
              />
            </div>
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
        );
      })}
    </div>
  );

  const testnetEndpoints =
    testnetLinks.length > 0 ? (
      <div className={classes.root}>
        {testnetLinks.map(link => {
          return (
            <div className={classes.section} key={link}>
              <div className={classes.link}>
                <CopyToClipIcon
                  text={link}
                  message={t('common.copy-message')}
                  copyText={t('common.copy-text')}
                  size="l"
                  textColor="textPrimary"
                  className={classes.copyToClip}
                />
              </div>
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
