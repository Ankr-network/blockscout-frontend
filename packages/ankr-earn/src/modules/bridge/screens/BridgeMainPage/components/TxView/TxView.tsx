import { Box, Paper } from '@material-ui/core';
import { resetRequests } from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { t } from 'common';
import { AvailableWriteProviders } from 'provider';

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
import { AuditedLabel } from 'modules/common/components/AuditedLabel';
import { BRIDGE_AUDIT_LINK } from 'modules/common/const';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { useAppDispatch } from 'store/useAppDispatch';
import { Button } from 'uiKit/Button';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';
import { NumericStepper } from 'uiKit/Stepper';

import { Progress } from '../Progress';

import { EStep, useSteps } from './useSteps';
import { useTxViewStyles } from './useTxViewStyles';

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

  const { loading: isNotarizeLoading, data: notarizeData } = useQuery({
    type: notarize,
  });
  const [depositTx, setDepositTx] = useState('');
  const dispatchRequest = useDispatchRequest();
  const history = useHistory();
  const { chainId, isMetaMask } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const { loading: isSwitchNetworkPending } = useMutation({
    type: switchNetwork,
  });

  const { data: withdrawalData, loading: isWithdrawalLoading } = useQuery({
    type: withdrawal,
  });

  const isReceive = !!withdrawalData;

  const { dispatchConnect, isConnected } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );
  const isNotarizeCompleted = !!notarizeData;

  const onAddTokenClick = () => {
    dispatchRequest(watchAsset({ token, chainId: chainIdTo }));
  };

  const onWithdrawlClick = () => {
    if (!isNotarizeCompleted) {
      return;
    }

    setStep(EStep.ReciveProgress);

    dispatchRequest(
      withdrawal(
        notarizeData.encodedProof,
        notarizeData.encodedReceipt,
        notarizeData.signature,
      ),
    ).then(({ error }) => {
      if (error) {
        setStep(EStep.Receive);
      }
    });
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
    isConnected && !isReceive && !isWrongNetwork && isNotarizeCompleted;
  const showConnectBtn = !isConnected;
  const showAddTokenBtn = isConnected && isReceive && isMetaMask;
  const showSwitchNetworkBtn = isConnected && isWrongNetwork && isMetaMask;

  useEffect(() => {
    if (isNotarizeCompleted || !isConnected) {
      return;
    }

    dispatchRequest(notarize(tx, chainIdFrom)).then(({ error }) => {
      if (!error) {
        setStep(EStep.Receive);
      }
    });
  }, [
    chainIdFrom,
    dispatchRequest,
    isConnected,
    isNotarizeCompleted,
    setStep,
    tx,
  ]);

  useEffect(() => {
    if (isNotarizeCompleted && isConnected) {
      setStep(EStep.Receive);
    }
  }, [isConnected, isNotarizeCompleted, setStep]);

  useEffect(() => {
    if (withdrawalData) {
      setStep(EStep.Finish);
      setDepositTx(withdrawalData.transactionHash);
      history.replace({ search: '' });
    }
  }, [history, setStep, withdrawalData]);

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
              {depositTx ? (
                <Transaction chainId={chainIdTo} tx={depositTx} />
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
            <Button color="primary" size="large" onClick={dispatchConnect}>
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

        <AuditedLabel auditLink={BRIDGE_AUDIT_LINK} />
      </Paper>

      {currentStep !== EStep.Finish && (
        <Notification>{t('bridge.tx.close-notification')}</Notification>
      )}
    </>
  );
};
