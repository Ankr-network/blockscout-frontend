import { AvailableWriteProviders } from '@ankr.com/provider';
import { Box } from '@material-ui/core';
import { resetRequests } from '@redux-requests/core';
import { useEffect } from 'react';

import { t } from 'common';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { approve } from 'modules/bridge/actions/approve';
import { deposit } from 'modules/bridge/actions/deposit';
import { notarize } from 'modules/bridge/actions/notarize';
import { withdrawal } from 'modules/bridge/actions/withdrawal';
import { BridgeContainer } from 'modules/bridge/components/BridgeContainer';
import { Notification } from 'modules/bridge/components/Notification';
import { TxView } from 'modules/bridge/screens/BridgeMainPage/components/TxView';
import { useAppDispatch } from 'store/useAppDispatch';

import { BridgeMainView } from './components/BridgeMainView';
import { useTxnData } from './hooks/useTxnData';

export const BridgeMainPage = (): JSX.Element => {
  const { isConnected } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );
  const txnData = useTxnData();
  const dispatch = useAppDispatch();

  const isTxViewShowed = !!txnData;
  const isMainViewShowed = !isTxViewShowed;
  const isNotificationShowed = isMainViewShowed && isConnected;

  useEffect(() => {
    return () => {
      dispatch(
        resetRequests([
          notarize.toString(),
          withdrawal.toString(),
          approve.toString(),
          deposit.toString(),
        ]),
      );
    };
  }, [dispatch]);

  return (
    <Box component="section" py={{ xs: 5, md: 8 }}>
      <BridgeContainer>
        {isMainViewShowed && <BridgeMainView />}

        {isTxViewShowed && (
          <TxView
            amount={txnData.amount}
            chainIdFrom={txnData.chainIdFrom}
            chainIdTo={txnData.chainIdTo}
            destinationAddress={txnData.destinationAddress}
            token={txnData.token}
            tx={txnData.tx}
          />
        )}

        {isNotificationShowed && (
          <Notification>{t('bridge.banner.footer')}</Notification>
        )}
      </BridgeContainer>
    </Box>
  );
};
