import { Box, Paper } from '@material-ui/core';
import { resetRequests } from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { AvailableWriteProviders } from '@ankr.com/provider';
import { t } from 'common';

import { switchNetwork } from 'modules/auth/common/actions/switchNetwork';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { approve } from 'modules/bridge/actions/approve';
import { deposit } from 'modules/bridge/actions/deposit';
import { notarize } from 'modules/bridge/actions/notarize';
import { watchAsset } from 'modules/bridge/actions/watchAsset';
import { withdrawal } from 'modules/bridge/actions/withdrawal';
import { Notification } from 'modules/bridge/components/Notification';
import { Transaction } from 'modules/bridge/components/Transaction';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import { AuditInfo, AuditInfoItem } from 'modules/common/components/AuditInfo';
import { AUDIT_LINKS } from 'modules/common/const';
import { isFirefox } from 'modules/common/utils/isFirefox';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { EKnownDialogs, useDialog } from 'modules/dialogs';
import { useAppDispatch } from 'store/useAppDispatch';
import { Button } from 'uiKit/Button';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';
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
  const dispatch = useAppDispatch();

  const {
    isLoading: isWithdrawalLoading,
    isReceived,
    txHash: withdrawalTxHash,
    onClick: onWithdrawlClick,
  } = useWithdraw();

  const { loading: isNotarizeLoading, data: notarizeData } = useQuery({
    type: notarize,
  });

  const dispatchRequest = useDispatchRequest();
  const history = useHistory();
  const { chainId, isMetaMask } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const { loading: isSwitchNetworkPending } = useMutation({
    type: switchNetwork,
  });

  const { handleOpen: handleConnectOpen } = useDialog(EKnownDialogs.connect);
  const { isConnected } = useAuth(AvailableWriteProviders.ethCompatible);

  const isNotarizeCompleted = !!notarizeData;

  const onAddTokenClick = () => {
    dispatchRequest(watchAsset({ token, chainId: chainIdTo }));
  };

  const onSwitchNetworkClick = () => {
    dispatchRequest(
      switchNetwork({
        providerId: AvailableWriteProviders.ethCompatible,
        chainId: chainIdTo,
      }),
    );
  };

  const onCloseClick = () => {
    history.push(DashboardRoutes.dashboard.generatePath());

    dispatch(
      resetRequests([
        notarize.toString(),
        withdrawal.toString(),
        approve.toString(),
        deposit.toString(),
      ]),
    );
  };

  const isWrongNetwork = chainId !== chainIdTo;
  const showWithdrawlBtn =
    isConnected && !isReceived && !isWrongNetwork && isNotarizeCompleted;
  const showConnectBtn = !isConnected;
  const showAddTokenBtn = isConnected && isReceived && isMetaMask && !isFirefox;
  const showSwitchNetworkBtn = isConnected && isWrongNetwork && isMetaMask;

  useEffect(() => {
    if (isNotarizeCompleted || !isConnected) {
      return;
    }

    dispatchRequest(notarize(tx, chainIdFrom));
  }, [
    chainIdFrom,
    dispatchRequest,
    isConnected,
    isNotarizeCompleted,
    setStep,
    tx,
  ]);

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
                token,
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

        <Box className={classes.footerBtn}>
          {showWithdrawlBtn && (
            <Button
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
              color="default"
              size="large"
              variant="outlined"
              onClick={onAddTokenClick}
            >
              {t('bridge.tx.buttons.add-to-metamask', { token })}
            </Button>
          )}

          {showSwitchNetworkBtn && (
            <Button
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

          {showConnectBtn && (
            <Button color="primary" size="large" onClick={handleConnectOpen}>
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

        <AuditInfo>
          <AuditInfoItem link={AUDIT_LINKS.bridge} variant="beosin" />
        </AuditInfo>
      </Paper>

      {currentStep !== EStep.Finish && (
        <Notification>{t('bridge.tx.close-notification')}</Notification>
      )}
    </>
  );
};
