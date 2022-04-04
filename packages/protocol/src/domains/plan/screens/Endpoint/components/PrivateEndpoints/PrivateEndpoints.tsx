import React from 'react';
import { Typography } from '@material-ui/core';

import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { IApiChain, IApiChainURL } from 'domains/chains/api/queryChains';
import { RPCEndpointsTabsManager } from 'modules/common/components/RPCEndpointsTabManager';
import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { flatNetworkURLs } from 'modules/auth/utils/flatNetworkURLs';
import { t, tHTML } from 'modules/i18n/utils/intl';

import { useStyles } from './PrivateEndpointsStyles';

interface PrivateEndpointsProps {
  chain: IApiChain;
}

export const PrivateEndpoints = ({ chain }: PrivateEndpointsProps) => {
  const classes = useStyles();

  const { mainnetURLs, mainnetURLsCount, testnetURLs } = flatNetworkURLs<
    IApiChainURL,
    IApiChain
  >(chain);

  const isTitlePlural = mainnetURLsCount > 1 || testnetURLs.length > 0;

  const title = (
    <TooltipWrapper tooltipText={tHTML('providers.private-endpoints.tooltip')}>
      <Typography variant="body2" className={classes.title}>
        {t('providers.private-endpoints.title', {
          plural: isTitlePlural ? t('providers.private-endpoints.plural') : '',
        })}
      </Typography>
    </TooltipWrapper>
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

  return (
    <RPCEndpointsTabsManager
      title={title}
      mainnetEndpoints={mainnetEndpoints}
      testnetEndpoints={testnetEndpoints}
    />
  );
};
