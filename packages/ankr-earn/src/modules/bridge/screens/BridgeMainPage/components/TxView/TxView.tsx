import { t } from '@ankr.com/common';
import { Box, Paper } from '@material-ui/core';
import { skipToken } from '@reduxjs/toolkit/query';
import BigNumber from 'bignumber.js';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useSwitchNetworkMutation } from 'modules/auth/common/actions/switchNetwork';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useAddBridgeTokenToWalletMutation } from 'modules/bridge/actions/addBridgeTokenToWallet';
import { useGetBridgeNotirizeQuery } from 'modules/bridge/actions/getBridgeNotirize';
import { Notification } from 'modules/bridge/components/Notification';
import { Transaction } from 'modules/bridge/components/Transaction';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import { AuditInfo, AuditInfoItem } from 'modules/common/components/AuditInfo';
import { AUDIT_LINKS } from 'modules/common/const';
import { getTokenName } from 'modules/common/utils/getTokenName';
import { isFirefox } from 'modules/common/utils/isFirefox';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { EKnownDialogs, useDialog } from 'modules/dialogs';
import { Button } from 'uiKit/Button';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';
import { Quote } from 'uiKit/Quote';
import { NumericStepper } from 'uiKit/Stepper';

import { Progress } from '../Progress';

import { EStep, useSteps } from './useSteps';
import { useTxViewStyles } from './useTxViewStyles';
import { useWithdraw } from './useWithdraw';

export interface ITxViewProps {
  token: AvailableBridgeTokens;
  amount: BigNumber;
  tx: string;
  chainIdFrom: number;
  chainIdTo: number;
  destinationAddress?: string;
}

export const TxView = ({
  token,
  amount,
  destinationAddress = '',
  tx,
  chainIdFrom,
  chainIdTo,
}: ITxViewProps): JSX.Element => {
  const classes = useTxViewStyles();
  const { stepTitle, stepsCount, stepText, currentStep, setStep } = useSteps();

  const { isConnected } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const { isLoading: isNotarizeLoading, data: notarizeData } =
    useGetBridgeNotirizeQuery(
      !isConnected
        ? skipToken
        : {
            transactionHash: tx,
            chainIdFrom,
          },
    );

  const {
    isLoading: isWithdrawalLoading,
    isReceived,
    txHash: withdrawalTxHash,
    onClick: onWithdrawlClick,
  } = useWithdraw(notarizeData);

  const history = useHistory();
  const { chainId, isInjected } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const [switchNetwork, { isLoading: isSwitchNetworkPending }] =
    useSwitchNetworkMutation();

  const [addBridgeTokenToWallet] = useAddBridgeTokenToWalletMutation();

  const { handleOpen: handleConnectOpen } = useDialog(EKnownDialogs.connect);

  const isNotarizeCompleted = !!notarizeData;
  const tokenName = getTokenName(token);

  const onAddTokenClick = () => {
    addBridgeTokenToWallet({ token, chainId: chainIdTo });
  };

  const onSwitchNetworkClick = () => {
    switchNetwork({
      providerId: AvailableWriteProviders.ethCompatible,
      chainId: chainIdTo,
    });
  };

  const onCloseClick = () => {
    history.push(DashboardRoutes.dashboard.generatePath());
  };

  const isWrongNetwork = chainId !== chainIdTo;
  const showWithdrawlBtn =
    isConnected && !isReceived && !isWrongNetwork && isNotarizeCompleted;
  const showConnectBtn = !isConnected;
  const showAddTokenBtn = isConnected && isReceived && isInjected && !isFirefox;
  const showSwitchNetworkBtn = isConnected && isWrongNetwork && isInjected;

  useEffect(() => {
    if (
      isConnected &&
      isNotarizeCompleted &&
      !isReceived &&
      !isWithdrawalLoading
    ) {
      setStep(EStep.Receive);
    }
  }, [
    isConnected,
    isNotarizeCompleted,
    setStep,
    isReceived,
    isWithdrawalLoading,
  ]);

  useEffect(() => {
    if (isWithdrawalLoading) {
      setStep(EStep.ReciveProgress);
    }
  }, [isWithdrawalLoading, setStep]);

  useEffect(() => {
    if (isReceived) {
      setStep(EStep.Finish);
      history.replace({ search: '' });
    }
  }, [history, setStep, isReceived]);

  return (
    <>
      <Paper className={classes.root}>
        <Box className={classes.stepper}>
          <NumericStepper activeStep={currentStep} stepsCount={stepsCount} />
        </Box>

        <Box className={classes.stepTitle}>{stepTitle}</Box>

        {!isNotarizeCompleted && isNotarizeLoading && (
          <Progress className={classes.progressBar} />
        )}

        <Box className={classes.description}>{stepText}</Box>

        <Box className={classes.grid}>
          <Box className={classes.gridRow}>
            <Box className={classes.gridCellLabel}>
              {t('bridge.tx.grid.amount')}
            </Box>

            <Box className={classes.gridCellValue}>
              {t('unit.token-value', {
                value: amount.toFormat(),
                token: tokenName,
              })}
            </Box>
          </Box>

          {destinationAddress && (
            <Box className={classes.gridRow}>
              <Box className={classes.gridCellLabel}>
                {t('bridge.tx.grid.destination')}
              </Box>

              <Box className={classes.gridCellValue}>{destinationAddress}</Box>
            </Box>
          )}

          <Box className={classes.gridRow}>
            <Box className={classes.gridCellLabel}>
              {t('bridge.tx.grid.tx')}
            </Box>

            <Box className={classes.gridCellValue}>
              {isReceived && withdrawalTxHash ? (
                <Transaction chainId={chainIdTo} tx={withdrawalTxHash} />
              ) : (
                <Transaction chainId={chainIdFrom} tx={tx} />
              )}
            </Box>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" marginTop={3}>
          {showWithdrawlBtn && (
            <Button
              fullWidth
              color="primary"
              disabled={isWithdrawalLoading}
              isLoading={isWithdrawalLoading}
              size="large"
              onClick={onWithdrawlClick}
            >
              {t('bridge.tx.buttons.receive')}
            </Button>
          )}

          {showAddTokenBtn && (
            <Button
              fullWidth
              color="default"
              size="large"
              variant="outlined"
              onClick={onAddTokenClick}
            >
              {t('bridge.tx.buttons.add-to-wallet', { token: tokenName })}
            </Button>
          )}

          {showSwitchNetworkBtn && isInjected && (
            <Button
              fullWidth
              color="primary"
              disabled={isSwitchNetworkPending}
              isLoading={isSwitchNetworkPending}
              size="large"
              onClick={onSwitchNetworkClick}
            >
              {t('bridge.tx.buttons.switch', {
                chainName: t(`chain.${chainIdTo}`),
              })}
            </Button>
          )}

          {showSwitchNetworkBtn && !isInjected && (
            <Quote mt={3} variant="warning">
              {t('bridge.main.switch-note', {
                chain: t(`chain.${chainIdTo}`),
              })}
            </Quote>
          )}

          {showConnectBtn && (
            <Button
              fullWidth
              color="primary"
              size="large"
              onClick={handleConnectOpen}
            >
              {t('bridge.tx.buttons.connect-wallet')}
            </Button>
          )}
        </Box>

        {currentStep === EStep.Finish && (
          <Button
            className={classes.closeBtn}
            variant="outlined"
            onClick={onCloseClick}
          >
            <CloseIcon htmlColor="inherit" size="xxs" />
          </Button>
        )}

        <AuditInfo mt={4}>
          <AuditInfoItem link={AUDIT_LINKS.bridge} variant="beosin" />
        </AuditInfo>
      </Paper>

      {currentStep !== EStep.Finish && (
        <Notification>{t('bridge.tx.close-notification')}</Notification>
      )}
    </>
  );
};
