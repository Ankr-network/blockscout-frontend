import { useCallback, useMemo, useState } from 'react';
import { t } from '@ankr.com/common';

import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { userSettingsSetupTwoFA } from 'domains/userSettings/actions/twoFA/setupTwoFA';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { USER_SETTINGS_INTL_ROOT } from '../../constants';

enum TwoFASetup {
  QRCode,
  Manual,
}

export const useTwoFASetupVariant = () => {
  const [setupVariant, setSetupVariant] = useState(TwoFASetup.QRCode);

  const isQRCodeSetup = setupVariant === TwoFASetup.QRCode;
  const setManualVariant = useCallback(() => {
    setSetupVariant(TwoFASetup.Manual);
  }, []);

  const setQRCodeVariant = useCallback(() => {
    setSetupVariant(TwoFASetup.QRCode);
  }, []);

  return {
    isQRCodeSetup,
    setQRCodeVariant,
    setManualVariant,
  };
};

export const useTwoFASetupData = () => {
  const [loadQRCodeInfo, twoFAsetupDataState] = useQueryEndpoint(
    userSettingsSetupTwoFA,
  );

  useOnMount(() => {
    loadQRCodeInfo();
  });

  return { twoFAsetupDataState, fetch: loadQRCodeInfo };
};

export const useTitle = (
  isQRCodeSetup: boolean,
  isError: boolean,
  isLoading: boolean,
) => {
  return useMemo(() => {
    if (isQRCodeSetup) {
      return t(`${USER_SETTINGS_INTL_ROOT}.setup-dialog.title`);
    }

    if (isError) {
      t(`${USER_SETTINGS_INTL_ROOT}.control-dialog.error.title`);
    }

    if (isLoading) {
      return t(`${USER_SETTINGS_INTL_ROOT}.setup-dialog.loading`);
    }

    return t(`${USER_SETTINGS_INTL_ROOT}.setup-dialog.manual-setup.title`);
  }, [isQRCodeSetup, isError, isLoading]);
};
