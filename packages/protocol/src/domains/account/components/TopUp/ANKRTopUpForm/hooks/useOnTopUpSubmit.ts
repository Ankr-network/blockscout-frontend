import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { TopUpCurrency } from 'modules/analytics/mixpanel/const';
import { TrackTopUpSubmit } from 'domains/account/types';
import { useTopUp } from 'domains/account/hooks/useTopUp';
import { resetTopUpOrigin } from 'domains/account/store/accountTopUpSlice';
import { useConnectWalletDialog } from 'modules/layout/components/ConnectWalletDialog/hooks/useConnectWalletDialog';

import { TopUpFormValues } from '../ANKRTopUpFormTypes';

export const useOnTopUpSubmit = (
  confirmedEmail?: string,
  pendingEmail?: string,
  trackSubmit: TrackTopUpSubmit = () => {},
) => {
  const [showEmailBanner, setShowEmailBanner] = useState(false);

  const dispatch = useDispatch();
  const { handleSetAmount } = useTopUp();
  const {
    isWeb3UserWithEmailBound,
    isOpened: isConnectWaletDialogOpened,
    handleOpenDialog: handleOpenConnectWaletDialog,
    handleCloseDialog: handleCloseConnectWaletDialog,
  } = useConnectWalletDialog();

  const onSuccess = useCallback(() => {
    dispatch(resetTopUpOrigin());
    dispatch(push(AccountRoutesConfig.topUp.generatePath()));
  }, [dispatch]);

  const onClose = useCallback(() => {
    setShowEmailBanner(false);
  }, []);

  const onSubmit = useCallback(
    (data: TopUpFormValues) => {
      handleSetAmount(new BigNumber(data.amount));

      if (isWeb3UserWithEmailBound) {
        handleOpenConnectWaletDialog();
      } else if (!confirmedEmail || pendingEmail) {
        setShowEmailBanner(true);
      } else {
        onSuccess();

        trackSubmit(data.amount, TopUpCurrency.ANKR);
      }
    },
    [
      handleSetAmount,
      confirmedEmail,
      onSuccess,
      pendingEmail,
      trackSubmit,
      isWeb3UserWithEmailBound,
      handleOpenConnectWaletDialog,
    ],
  );

  return {
    onSubmit,
    emailDialogProps: { isOpened: showEmailBanner, onClose },
    connectWalletDialogProps: {
      isOpened: isConnectWaletDialogOpened,
      handleCloseDialog: handleCloseConnectWaletDialog,
    },
  };
};
