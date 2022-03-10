import { Box, Paper, Container, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { getShortTxHash } from 'modules/common/utils/getShortStr';
import { getTxLinkByNetwork } from 'modules/common/utils/getTxLinkByNetwork';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'uiKit/Button';
import { CompleteIcon } from 'uiKit/Icons/CompleteIcon';
import { CopyIcon } from 'uiKit/Icons/CopyIcon';
import { ExternalLinkIcon } from 'uiKit/Icons/ExternalLinkIcon';
import { NavLink } from 'uiKit/NavLink';

import { useProgressStepHook } from './useProgressStepHook';
import { useProgressStepStyles } from './useProgressStepStyles';

export interface IProgressStepProps {
  title: ReactNode;
  hint: ReactNode;
  buttonTitle: ReactNode;
  isPending: boolean;
  amount?: BigNumber;
  symbol?: string;
  txHash?: string;
  destinationAddress?: string;
  onAddTokenToWallet: () => void;
}

export const ProgressStep = ({
  title,
  hint,
  isPending,
  amount,
  symbol = '',
  txHash,
  destinationAddress,
  buttonTitle,
  onAddTokenToWallet,
}: IProgressStepProps): JSX.Element => {
  const classes = useProgressStepStyles();
  const {
    isTxCopied,
    isAddressCopied,
    chainId,
    handleCopyTxHash,
    handleCopyDestinationAddress,
  } = useProgressStepHook();

  return (
    <Box component="section" py={{ xs: 5, md: 10 }}>
      <Container>
        <Paper className={classes.root} component="div" variant="elevation">
          <Typography className={classes.title} variant="h2">
            {isPending
              ? t('progress.pendingTitle', { title })
              : t('progress.successTitle', { title })}
          </Typography>

          {isPending && (
            <Typography className={classes.info}>{hint}</Typography>
          )}

          <div className={classes.table}>
            {amount && (
              <div className={classes.row}>
                <Typography className={classes.rowName}>
                  {t('progress.tx.grid.amount')}
                </Typography>

                <Typography className={classes.rowValue}>
                  {t('unit.token-value', {
                    value: amount.toFormat(),
                    token: symbol,
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
            className={classes.button}
            href="/earn/dashboard"
            variant="contained"
          >
            {t('eth2Swap.buttons.dashboard')}
          </NavLink>

          <Button
            className={classes.button}
            variant="outlined"
            onClick={onAddTokenToWallet}
          >
            {buttonTitle}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};
