import React from 'react';
import classNames from 'classnames';

import { CopyToClipButton } from 'uiKit/CopyToClipButton';
import { AddNetworkButton } from 'modules/auth/components/AddNetwork';
import { t } from 'modules/i18n/utils/intl';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { ChainId } from 'domains/chains/api/chain';
import { IS_REACT_SNAP } from 'uiKit/NoReactSnap';

import { Chain } from '../ChainItemHeader/ChainItemHeaderTypes';
import { useStyles } from './CopyButtonsStyles';

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
      {isXSDown && !IS_REACT_SNAP ? (
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
