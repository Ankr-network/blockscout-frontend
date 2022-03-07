import { Box } from '@material-ui/core';

import { AvailableWriteProviders } from 'provider';

import { useConnectedData } from 'modules/auth/hooks/useConnectedData';
import { BridgeContainer } from 'modules/bridge/components/BridgeContainer';
import { Notification } from 'modules/bridge/components/Notification';
import { TxView } from 'modules/bridge/screens/BridgeMainPage/components/TxView';
import { t } from 'modules/i18n/utils/intl';

import { BridgeMainView } from './components/BridgeMainView';
import { useTxnData } from './hooks/useTxnData';

export const BridgeMainPage = (): JSX.Element => {
  const { isConnected } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );
  const txnData = useTxnData();

  const isTxViewShowed = !!txnData;
  const isMainViewShowed = !isTxViewShowed;
  const isNotificationShowed = isMainViewShowed && isConnected;

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
