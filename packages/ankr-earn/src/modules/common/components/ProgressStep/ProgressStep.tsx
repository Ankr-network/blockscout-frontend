import { t } from '@ankr.com/common';
import { Box, Paper, Container, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { Token } from 'modules/common/types/token';
import { getShortTxHash } from 'modules/common/utils/getShortStr';
import { isFirefox } from 'modules/common/utils/isFirefox';
import { getTxLinkByNetwork } from 'modules/common/utils/links/getTxLinkByNetwork';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { Button } from 'uiKit/Button';
import { CompleteIcon } from 'uiKit/Icons/CompleteIcon';
import { CopyIcon } from 'uiKit/Icons/CopyIcon';
import { ExternalLinkIcon } from 'uiKit/Icons/ExternalLinkIcon';
import { NavLink } from 'uiKit/NavLink';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';

import { ReactComponent as PendingLogo } from './assets/pending-logo.svg';
import { ReactComponent as SuccessLogo } from './assets/success-logo.svg';
import { useProgressStepHook } from './useProgressStepHook';
import { useProgressStepStyles } from './useProgressStepStyles';

export interface IProgressStepProps {
  title: ReactNode;
  hint: ReactNode;
  buttonTitle?: ReactNode;
  isPending: boolean;
  isLoading?: boolean;
  amount?: BigNumber;
  symbol?: string;
  txHash?: string;
  nodeProvider?: string;
  destinationAddress?: string;
  error?: Error;
  onAddTokenToWallet?: () => void;
}

export enum TxErrorCodes {
  TX_FAILED = 'tx-fail',
}

export const ProgressStep = ({
  title,
  hint,
  isPending,
  isLoading = false,
  amount,
  symbol = '',
  txHash,
  nodeProvider,
  destinationAddress,
  buttonTitle,
  error,
  onAddTokenToWallet,
}: IProgressStepProps): JSX.Element => {
  const classes = useProgressStepStyles();
  const {
    isTxCopied,
    isAddressCopied,
    chainId,
    handleCopyTxHash,
    handleCopyDestinationAddress,
    onDashboardClick,
  } = useProgressStepHook(symbol as Token);

  const pageTitle = isPending
    ? t('progress.pendingTitle', { title })
    : t('progress.successTitle', { title });
  const isError = Boolean(error);
  // Metamask has issue with adding tokens to wallet on Firefox.
  // This solution is the same as dashboard cards have.
  const canShowAddTokenButton =
    typeof onAddTokenToWallet === 'function' && !!buttonTitle && !isFirefox;

  if (isLoading) {
    return (
      <Box
        component="section"
        data-testid="progress-step-loading"
        py={{ xs: 5, md: 10 }}
      >
        <Container>
          <Paper className={classes.root} component="div" variant="elevation">
            <QueryLoadingCentered />
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box component="section" py={{ xs: 5, md: 10 }}>
      <Container>
        <Paper className={classes.root} component="div" variant="elevation">
          {isPending ? <PendingLogo /> : <SuccessLogo />}

          <Typography className={classes.title} variant="h2">
            {isError ? t('progress.errorTitle') : pageTitle}
          </Typography>

          {isPending && (
            <Typography className={classes.info}>{hint}</Typography>
          )}

          {isError && (
            <Typography className={classes.info}>
              {error?.message === TxErrorCodes.TX_FAILED
                ? t('progress.errorTxFail')
                : t('progress.errorGeneralInfo')}
            </Typography>
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

            {nodeProvider && (
              <div className={classes.row}>
                <Typography className={classes.rowName}>
                  {t('progress.tx.grid.node-provider')}
                </Typography>

                <div className={classes.navigation}>
                  <Typography className={classes.rowValue}>
                    {nodeProvider}
                  </Typography>
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
            href={DashboardRoutes.dashboard.generatePath()}
            variant="contained"
            onMouseDown={onDashboardClick}
            onTouchStart={onDashboardClick}
          >
            {t('switcher.buttons.dashboard')}
          </NavLink>

          {canShowAddTokenButton && (
            <Button
              className={classes.button}
              variant="outlined"
              onClick={onAddTokenToWallet}
            >
              {buttonTitle}
            </Button>
          )}
        </Paper>
      </Container>
    </Box>
  );
};
