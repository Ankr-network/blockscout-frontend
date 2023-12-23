import classNames from 'classnames';

import { CopyToClipButton } from 'uiKit/CopyToClipButton';
import { t } from 'modules/i18n/utils/intl';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { isAddNetworkSupported } from 'modules/common/utils/browserDetect';
import { ChainId } from 'domains/chains/api/chain';
import { useIsMDDown } from 'modules/themes/useTheme';
import { IS_REACT_SNAP } from 'uiKit/NoReactSnap';

import { Chain } from '../ChainItemHeader/ChainItemHeaderTypes';
import { useStyles } from './CopyButtonsStyles';

interface IStellarButtonProps {
  chainId: ChainId;
  onCopy: () => void;
  isXSDown: boolean;
  netLink: string;
  chain: Chain | null;
}

export const StellarButton = ({
  chainId,
  onCopy,
  isXSDown,
  netLink,
  chain,
}: IStellarButtonProps) => {
  const classes = useStyles();
  const isMDDown = useIsMDDown();

  const shouldShowCopyIcon = isXSDown && !IS_REACT_SNAP;
  const stellarText = netLink ? `${netLink}/http/stellar_horizon` : '';

  return (
    <div data-test-id="copy-button">
      <div
        className={classNames(
          classes.top,
          chain && isAddNetworkSupported(isMDDown) ? chainId : '',
        )}
      >
        <div className={classes.link}>
          {shouldShowCopyIcon ? (
            <CopyToClipIcon
              text={stellarText}
              message={t('common.copy-message')}
              size="l"
              textColor="textPrimary"
              onCopy={onCopy}
              chainId={chainId}
            />
          ) : (
            <CopyToClipButton
              buttonText={t('chain-item.copy-button.button-text')}
              text={stellarText}
              textMessage={t('common.copy-message')}
              className={classes.copyButton}
              onCopy={onCopy}
              chainId={chainId}
            />
          )}
        </div>
      </div>
    </div>
  );
};
