import { TwoFAStatus } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { useCallback, useState } from 'react';

import { TwoFAInput } from 'domains/userSettings/components/TwoFADialog/components/TwoFAInput';
import { getAxiosAccountingErrorMessage } from 'store/utils/getAxiosAccountingErrorMessage';
import { isAxiosAccountingError } from 'store/utils/isAxiosAccountingError';
import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { useConfirmTwoFAMutation } from 'domains/userSettings/actions/twoFA/confirmTwoFA';
import { useDisableTwoFAMutation } from 'domains/userSettings/actions/twoFA/disableTwoFA';
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

  const [handleConfirm, { isLoading: isConfirmLoading }] =
    useConfirmTwoFAMutation();
  const [handleDisable, { isLoading: isDisableLoading }] =
    useDisableTwoFAMutation();

  const onConfirm = useCallback(
    async (totp: string) => {
      const promise = isEnabled
        ? handleDisable({ params: { totp } })
        : handleConfirm({ params: { totp } });

      const response = await promise;

      const error = isMutationSuccessful(response) ? undefined : response.error;

      if (isAxiosAccountingError(error)) {
        setErrorMessage(getAxiosAccountingErrorMessage(error));
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
