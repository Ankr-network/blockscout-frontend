/* eslint-disable max-lines-per-function */
import classNames from 'classnames';
import { Typography } from '@material-ui/core';

import { CopyToClipButton } from 'uiKit/CopyToClipButton';
import { AddNetworkButton } from 'modules/auth/components/AddNetwork';
import { t } from 'modules/i18n/utils/intl';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { isAddNetworkSupported } from 'modules/common/utils/browserDetect';
import { ChainId } from 'domains/chains/api/chain';
import { useIsMDDown } from 'modules/themes/useTheme';
import { IS_REACT_SNAP } from 'uiKit/NoReactSnap';

import { Chain } from '../ChainItemHeader/ChainItemHeaderTypes';
import { useStyles } from './CopyButtonsStyles';

interface IKintoButtonsProps {
  chainId: ChainId;
  onCopy: () => void;
  isXSDown: boolean;
  chain: Chain | null;
}

export const KintoButtons = ({
  chainId,
  onCopy,
  isXSDown,
  chain,
}: IKintoButtonsProps) => {
  const classes = useStyles();
  const isMDDown = useIsMDDown();

  const shouldShowCopyIcon = isXSDown && !IS_REACT_SNAP;
  const kintoRpcText = 'https://rpc.kinto-rpc.com';

  const formattedChain = chain
    ? {
        ...chain,
        rpcLinks: [kintoRpcText],
      }
    : null;

  return (
    <div data-test-id="copy-button">
      <div
        className={classNames(
          classes.top,
          chain && isAddNetworkSupported(isMDDown) ? chainId : '',
        )}
      >
        <Typography
          variant="subtitle1"
          className={classNames(classes.label, chainId)}
          color="textPrimary"
        >
          {t('chain-item.kava.json-rpc')}
        </Typography>
        <div className={classes.link}>
          {shouldShowCopyIcon ? (
            <CopyToClipIcon
              text={kintoRpcText}
              message={t('common.copy-message')}
              size="l"
              textColor="textPrimary"
              onCopy={onCopy}
              chainId={chainId}
            />
          ) : (
            <CopyToClipButton
              buttonText={t('chain-item.copy-button.button-text')}
              text={kintoRpcText}
              textMessage={t('common.copy-message')}
              className={classes.copyButton}
              onCopy={onCopy}
              chainId={chainId}
            />
          )}
          {formattedChain && (
            <AddNetworkButton
              chain={formattedChain}
              className={classNames(classes.addNetworkButton, chainId)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
