import { t } from '@ankr.com/common';
import { useCallback, useState } from 'react';
import { TwoFAStatus } from 'multirpc-sdk';

import { TwoFAInput } from 'domains/userSettings/components/TwoFADialog/components/TwoFAInput';
import { useConfirmTwoFA } from 'domains/userSettings/screens/Settings/hooks/useConfirmTwoFA';
import { useDisableTwoFA } from 'domains/userSettings/screens/Settings/hooks/useDisableTwoFA';
import { isAxiosAccountingError } from 'store/utils/isAxiosAccountingError';
import { getAxiosAccountingErrorMessage } from 'store/utils/getAxiosAccountingErrorMessage';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { userSettingsFetchTwoFAStatus } from 'domains/userSettings/actions/twoFA/fetchTwoFAStatus';

import { USER_SETTINGS_INTL_ROOT } from '../../../../constants';

interface TwoFAControlDialogDefaultProps {
  setSuccessView: () => void;
  setErrorView: () => void;
}

export const TwoFAControlDialogDefault = ({
  setErrorView,
  setSuccessView,
}: TwoFAControlDialogDefaultProps) => {
  const [, { data: { status } = { status: TwoFAStatus.None } }] =
    useQueryEndpoint(userSettingsFetchTwoFAStatus);
  const [errorMessage, setErrorMessage] = useState<string>();

  const isEnabled = status === TwoFAStatus.Enabled;

  const { handleConfirm, isLoading: isConfirmLoading } = useConfirmTwoFA();
  const { handleDisable, isLoading: isDisableLoading } = useDisableTwoFA();

  const onConfirm = useCallback(
    async (totp: string) => {
      const { error } = await (isEnabled
        ? handleDisable({ params: { totp } })
        : handleConfirm({ params: { totp } }));

      let message = '';

      if (isAxiosAccountingError(error)) {
        message = getAxiosAccountingErrorMessage(error);
        setErrorMessage(message);
      } else if (error) {
        setErrorView();
      } else {
        setSuccessView();
      }
    },
    [handleConfirm, handleDisable, isEnabled, setSuccessView, setErrorView],
  );

  return (
    <TwoFAInput
      onConfirm={onConfirm}
      errorMessage={errorMessage}
      onReset={() => setErrorMessage('')}
      isLoading={isConfirmLoading || isDisableLoading}
      buttonText={t(
        `${USER_SETTINGS_INTL_ROOT}.control-dialog.${
          isEnabled ? 'deactivate' : 'activate'
        }`,
      )}
    />
  );
};
