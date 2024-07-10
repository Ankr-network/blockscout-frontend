import { useCallback } from 'react';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { referralProgramTranslation } from 'modules/referralProgram/translation';
import { removeReferralCodeFromUrl } from 'modules/referralProgram/utils/removeReferralCodeFromUrl';
import { useAppDispatch } from 'store/useAppDispatch';
import { useApplyReferralCodeMutation } from 'modules/referralProgram/actions/applyReferralCode';
import { useReferralProgram } from 'modules/referralProgram/hooks/useReferralProgram';
import { useSavedReferralCode } from 'modules/referralProgram/hooks/useSavedReferralCode';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

export interface IUseApplyReferralCodeProps {
  hasSuccessNotification?: boolean;
  onError?: (error: unknown) => void;
  onSuccess?: () => void;
  referralCode: string | undefined;
  shouldRemoveSavedData?: boolean;
}

const { showNotification } = NotificationActions;

export const useApplyReferralCode = ({
  hasSuccessNotification = true,
  onError,
  onSuccess,
  referralCode,
  shouldRemoveSavedData = true,
}: IUseApplyReferralCodeProps) => {
  const [applyReferralCode, { isLoading: isApplying }] =
    useApplyReferralCodeMutation();

  const { handleRemoveSavedReferralCode } = useSavedReferralCode();

  const { keys, t } = useTranslation(referralProgramTranslation);

  const { blockchainName } = useReferralProgram();

  const dispatch = useAppDispatch();

  const handleApplyReferralCode = useCallback(async () => {
    if (referralCode) {
      const response = await applyReferralCode({ code: referralCode });

      if (isMutationSuccessful(response)) {
        if (hasSuccessNotification) {
          dispatch(
            showNotification({
              message: t(keys.activationAcceptedMessage, { blockchainName }),
              severity: 'success',
              title: t(keys.activationAcceptedTitle, { blockchainName }),
            }),
          );
        }

        onSuccess?.();
      } else {
        onError?.(response.error);
      }

      if (shouldRemoveSavedData) {
        removeReferralCodeFromUrl();
        handleRemoveSavedReferralCode();
      }
    }
  }, [
    applyReferralCode,
    blockchainName,
    dispatch,
    handleRemoveSavedReferralCode,
    hasSuccessNotification,
    keys,
    onError,
    onSuccess,
    referralCode,
    shouldRemoveSavedData,
    t,
  ]);

  return { handleApplyReferralCode, isApplying };
};
