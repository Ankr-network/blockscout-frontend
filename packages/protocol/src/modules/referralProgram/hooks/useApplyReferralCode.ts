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
  onSuccess?: () => void;
  referralCode: string | undefined;
}

const { showNotification } = NotificationActions;

export const useApplyReferralCode = ({
  hasSuccessNotification = true,
  onSuccess,
  referralCode,
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

      if (isMutationSuccessful(response) && hasSuccessNotification) {
        dispatch(
          showNotification({
            message: t(keys.activationAcceptedMessage, { blockchainName }),
            severity: 'success',
            title: t(keys.activationAcceptedTitle, { blockchainName }),
          }),
        );
      }

      removeReferralCodeFromUrl();
      handleRemoveSavedReferralCode();

      onSuccess?.();
    }
  }, [
    applyReferralCode,
    blockchainName,
    dispatch,
    handleRemoveSavedReferralCode,
    hasSuccessNotification,
    keys,
    onSuccess,
    referralCode,
    t,
  ]);

  return { handleApplyReferralCode, isApplying };
};
