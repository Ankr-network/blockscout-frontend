import { t } from '@ankr.com/common';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { useIsSMDown } from 'ui';

import { getShortTxHash } from 'modules/common/utils/getShortStr';
import { Dialog } from 'uiKit/Dialog';
import { CompleteIcon } from 'uiKit/Icons/CompleteIcon';
import { NavLink } from 'uiKit/NavLink';

import { ReactComponent as CopyIcon } from '../../../../assets/img/copy.svg';

import { useTokenInfoDialogStyles as useStyles } from './useTokenInfoDialogStyles';

export interface ITokenInfoDialogProps {
  open: boolean;
  tokenName: string;
  tokenAddress: string;
  moreHref?: string;
  description: string;
  addTokenToWallet?: () => void;
  onClose?: () => void;
}

const MAX_TX_HASH_SIZE = 6;

export const TokenInfoDialog = ({
  open,
  tokenName,
  moreHref,
  tokenAddress,
  description,
  addTokenToWallet,
  onClose,
}: ITokenInfoDialogProps): JSX.Element => {
  const classes = useStyles();
  const [isAddressCopied, setIsAddressCopied] = useState(false);
  const isSMDown = useIsSMDown();

  const shortHash = isSMDown
    ? getShortTxHash(tokenAddress, MAX_TX_HASH_SIZE)
    : tokenAddress;

  const handleCopyDestinationAddress = useCallback(() => {
    setIsAddressCopied(isCopied => !isCopied);
  }, [setIsAddressCopied]);

  useEffect(() => {
    if (!isAddressCopied) {
      return undefined;
    }

    const timeoutId = setTimeout(handleCopyDestinationAddress, 1_500);

    return () => clearTimeout(timeoutId);
  }, [isAddressCopied, handleCopyDestinationAddress]);

  return (
    <Dialog className={classes.root} open={open} onClose={onClose}>
      <Container className={classes.container} data-testid="history-dialog">
        <Typography className={classes.header} variant="h3">
          {t('dashboard.token-info.title', { token: tokenName })}
        </Typography>

        <div className={classes.row}>
          <Typography className={classes.rowName}>
            {t('dashboard.token-info.contract')}
          </Typography>

          <Typography className={classes.tokenAddress}>{shortHash}</Typography>

          {!isAddressCopied ? (
            <CopyToClipboard
              data-testid="copy-destination-address"
              text={tokenAddress}
              onCopy={handleCopyDestinationAddress}
            >
              <CopyIcon className={classes.copyIcon} height={24} width={24} />
            </CopyToClipboard>
          ) : (
            <div className={classes.complete}>
              <CompleteIcon
                className={classes.completeIcon}
                data-testid="copy-destination-address-complete"
              />
            </div>
          )}
        </div>

        <Typography align="left" className={classes.description}>
          {description}
        </Typography>

        <div className={classes.buttons}>
          <Grid container spacing={3}>
            {typeof addTokenToWallet === 'function' && (
              <Grid item xs>
                <Button fullWidth variant="outlined" onClick={addTokenToWallet}>
                  {t('dashboard.token-info.addToken', { token: tokenName })}
                </Button>
              </Grid>
            )}

            {moreHref && (
              <Grid item xs>
                <NavLink fullWidth href={moreHref} variant="outlined">
                  {t('dashboard.token-info.learn-more')}
                </NavLink>
              </Grid>
            )}
          </Grid>
        </div>
      </Container>
    </Dialog>
  );
};
