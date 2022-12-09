import { t } from '@ankr.com/common';
import { Box, Container, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import CopyToClipboard from 'react-copy-to-clipboard';

import { getShortTxHash } from 'modules/common/utils/getShortStr';
import { getTokenName } from 'modules/common/utils/getTokenName';
import { getTxLinkByNetwork } from 'modules/common/utils/links/getTxLinkByNetwork';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { Button } from 'uiKit/Button';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';
import { CompleteIcon } from 'uiKit/Icons/CompleteIcon';
import { CopyIcon } from 'uiKit/Icons/CopyIcon';
import { ExternalLinkIcon } from 'uiKit/Icons/ExternalLinkIcon';
import { NavLink } from 'uiKit/NavLink';

import { useUnstakeSuccessHook } from './useUnstakeSuccessHook';
import { useUnstakeSuccessStyles } from './useUnstakeSuccessStyles';

interface IUnstakeSuccessProps {
  infoText?: string;
  period?: string;
  title?: string;
  tokenName?: string;
  amount?: BigNumber;
  destinationAddress?: string;
  txHash?: string;
  onClose?: () => void;
}

export const UnstakeSuccess = ({
  infoText,
  period,
  title,
  tokenName,
  amount,
  destinationAddress,
  txHash,
  onClose,
}: IUnstakeSuccessProps): JSX.Element => {
  const classes = useUnstakeSuccessStyles();
  const {
    isTxCopied,
    isAddressCopied,
    chainId,
    handleCopyTxHash,
    handleCopyDestinationAddress,
  } = useUnstakeSuccessHook();

  return (
    <Box component="section" py={{ xs: 5, md: 10 }}>
      <Container>
        <Paper className={classes.root}>
          <Typography className={classes.title} component="h2" variant="h1">
            {typeof title === 'string'
              ? title
              : t('unstake-dialog.success.title')}
          </Typography>

          <Typography className={classes.text}>
            {typeof infoText === 'string'
              ? infoText
              : t('unstake-dialog.success.description', {
                  token: tokenName,
                  period,
                })}
          </Typography>

          <div className={classes.table}>
            {amount && (
              <div className={classes.row}>
                <Typography className={classes.rowName}>
                  {t('progress.tx.grid.amount')}
                </Typography>

                <Typography className={classes.rowValue}>
                  {t('unit.token-value', {
                    value: amount.toFormat(),
                    token: tokenName && getTokenName(tokenName),
                  })}
                </Typography>
              </div>
            )}

            {destinationAddress && (
              <div className={classes.row}>
                <Typography className={classes.rowName}>
                  {t('progress.tx.grid.destination')}
                </Typography>

                <div className={classes.navigation}>
                  <Typography className={classes.rowValue}>
                    {getShortTxHash(destinationAddress)}
                  </Typography>

                  {!isAddressCopied ? (
                    <CopyToClipboard
                      data-testid="copy-destination-address"
                      text={destinationAddress}
                      onCopy={handleCopyDestinationAddress}
                    >
                      <CopyIcon />
                    </CopyToClipboard>
                  ) : (
                    <CompleteIcon
                      data-testid="copy-destination-address-complete"
                      size="xs"
                    />
                  )}

                  <NavLink
                    className={classes.link}
                    href={getTxLinkByNetwork(
                      destinationAddress,
                      chainId,
                      'address',
                    )}
                  >
                    <ExternalLinkIcon />
                  </NavLink>
                </div>
              </div>
            )}

            {txHash && (
              <div className={classes.row}>
                <Typography className={classes.rowName}>
                  {t('progress.tx.grid.tx')}
                </Typography>

                <div className={classes.navigation}>
                  <Typography className={classes.rowValue}>
                    {getShortTxHash(txHash)}
                  </Typography>

                  {!isTxCopied ? (
                    <CopyToClipboard
                      data-testid="copy-tx-hash"
                      text={txHash}
                      onCopy={handleCopyTxHash}
                    >
                      <CopyIcon />
                    </CopyToClipboard>
                  ) : (
                    <CompleteIcon
                      data-testid="copy-tx-hash-complete"
                      size="xs"
                    />
                  )}

                  <NavLink
                    className={classes.link}
                    href={getTxLinkByNetwork(txHash, chainId)}
                  >
                    <ExternalLinkIcon />
                  </NavLink>
                </div>
              </div>
            )}
          </div>

          <NavLink
            fullWidth
            className={classes.btn}
            href={DashboardRoutes.dashboard.generatePath()}
            size="large"
            variant="contained"
          >
            {t('unstake-dialog.success.return')}
          </NavLink>

          {typeof onClose === 'function' && (
            <Button
              className={classes.closeBtn}
              variant="outlined"
              onClick={onClose}
            >
              <CloseIcon htmlColor="inherit" size="xxs" />
            </Button>
          )}
        </Paper>
      </Container>
    </Box>
  );
};
