import React from 'react';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';

import { useStyles } from './CopyButtonsStyles';
import { CopyToClipButton } from 'uiKit/CopyToClipButton';
import { AddNetworkButton } from 'modules/auth/components/AddNetwork';
import { t } from 'modules/i18n/utils/intl';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { Chain } from '../ChainItemHeader/ChainItemHeaderTypes';
import { isAddNetworkSupported } from 'modules/common/utils/browserDetect';

interface INervosButtonsProps {
  chainId: string;
  onCopy: () => void;
  isXSDown: boolean;
  netLink: string;
  chain: Chain | null;
}

export const NervosButtons = ({
  chainId,
  onCopy,
  isXSDown,
  netLink,
  chain,
}: INervosButtonsProps) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.top}>
        <div className={classes.link}>
          {isXSDown ? (
            <CopyToClipIcon
              text={`${netLink}/nervos`}
              message={t('common.copy-message')}
              size="l"
              textColor="textPrimary"
              onCopy={onCopy}
              chainId={chainId}
            />
          ) : (
            <CopyToClipButton
              buttonText={t('chain-item.copy-button.button-text')}
              text={`${netLink}/nervos`}
              textMessage={t('common.copy-message')}
              className={classes.copyButton}
              onCopy={onCopy}
              chainId={chainId}
            />
          )}
          {chain && (
            <AddNetworkButton
              chain={chain}
              className={classNames(classes.addNetworkButton, chainId)}
            />
          )}
        </div>
        <Typography
          variant="subtitle1"
          className={classes.label}
          color="textPrimary"
        >
          {t('chain-item.nervos.eth-based')}
        </Typography>
      </div>
      <div
        className={classNames(
          classes.top,
          chain && isAddNetworkSupported() ? chainId : '',
        )}
      >
        <div className={classes.link}>
          {isXSDown ? (
            <CopyToClipIcon
              text={`${netLink}/nervos_gw`}
              message={t('common.copy-message')}
              size="l"
              textColor="textPrimary"
              onCopy={onCopy}
              chainId={chainId}
            />
          ) : (
            <CopyToClipButton
              buttonText={t('chain-item.copy-button.button-text')}
              text={`${netLink}/nervos_gw`}
              textMessage={t('common.copy-message')}
              className={classes.copyButton}
              onCopy={onCopy}
              chainId={chainId}
            />
          )}
        </div>
        <Typography
          variant="subtitle1"
          className={classes.label}
          color="textPrimary"
        >
          {t('chain-item.nervos.godwoken-based')}
        </Typography>
      </div>
    </>
  );
};
