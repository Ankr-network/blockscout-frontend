import React from 'react';
import classNames from 'classnames';

import { useStyles } from './CopyButtonsStyles';
import { CopyToClipButton } from 'uiKit/CopyToClipButton';
import { AddNetworkButton } from 'modules/auth/components/AddNetwork';
import { t } from 'modules/i18n/utils/intl';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { Chain } from '../ChainItemHeader/ChainItemHeaderTypes';
import { ChainId } from 'domains/chains/api/chain';

interface ChainButtonsProps {
  chainId: ChainId;
  onCopy: () => void;
  isXSDown: boolean;
  netLink: string;
  chain: Chain | null;
}

export const ChainButtons = ({
  chainId,
  onCopy,
  isXSDown,
  netLink,
  chain,
}: ChainButtonsProps) => {
  const classes = useStyles();

  const message = t('common.copy-message');

  return (
    <div className={classes.container} data-test-id="copy-button">
      {isXSDown ? (
        <CopyToClipIcon
          text={netLink}
          message={message}
          size="l"
          textColor="textPrimary"
          onCopy={onCopy}
          chainId={chainId}
        />
      ) : (
        <CopyToClipButton
          buttonText={t('chain-item.copy-button.button-text')}
          text={netLink}
          textMessage={message}
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
  );
};
