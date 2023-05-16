import { t } from '@ankr.com/common';
import { useCallback, useState } from 'react';

import { TwoFAInput } from 'domains/userSettings/components/TwoFADialog/components/TwoFAInput';
import { useConfirmTwoFA } from 'domains/userSettings/screens/Settings/hooks/useConfirmTwoFA';
import { useDisableTwoFA } from 'domains/userSettings/screens/Settings/hooks/useDisableTwoFA';
import { isAxiosAccountError } from 'store/utils/isAxiosAccountError';
import { getAxiosAccountErrorMessage } from 'store/utils/getAxiosAccountErrorMessage';
import { USER_SETTINGS_INTL_ROOT } from '../../../../constants';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { userSettingsFetchTwoFAStatus } from 'domains/userSettings/actions/twoFA/fetchTwoFAStatus';
import { TwoFAStatus } from 'multirpc-sdk';

interface TwoFAControlDialogDefaultProps {
  setSuccessView: () => void;
  setErrorView: () => void;
}

export const TwoFAControlDialogDefault = ({
  setSuccessView,
  setErrorView,
}: TwoFAControlDialogDefaultProps) => {
  const [, { data: { status } = { status: TwoFAStatus.None } }] =
    useQueryEndpoint(userSettingsFetchTwoFAStatus);
  const [errorMessage, setErrorMessage] = useState<string>();

  const isEnabled = status === TwoFAStatus.Enabled;

  const { handleConfirm } = useConfirmTwoFA();
  const { handleDisable } = useDisableTwoFA();

  const onConfirm = useCallback(
    async (totp: string) => {
      const { error } = await (isEnabled
        ? handleDisable({ params: { totp } })
        : handleConfirm({ params: { totp } }));

      let message = '';

      if (isAxiosAccountError(error)) {
        message = getAxiosAccountErrorMessage(error);
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
      buttonText={t(
        `${USER_SETTINGS_INTL_ROOT}.control-dialog.${
          isEnabled ? 'deactivate' : 'activate'
        }`,
      )}
    />
  );
};
