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

import { useReferrer } from './useReferrer';

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

  const { handleFetchReferrer } = useReferrer({ skipFetching: true });

  const { handleRemoveSavedReferralCode } = useSavedReferralCode();

  const { blockchainName } = useReferralProgram();

  const {
    keys: { branded, unbranded },
    t,
  } = useTranslation(referralProgramTranslation);

  const keys = blockchainName ? branded : unbranded;

  const dispatch = useAppDispatch();

  const handleApplyReferralCode = useCallback(async () => {
    if (referralCode) {
      const response = await applyReferralCode({ code: referralCode });

      if (isMutationSuccessful(response)) {
        const isBranded = Boolean(blockchainName);

        if (hasSuccessNotification) {
          dispatch(
            showNotification({
              message: t(keys.activationAcceptedMessage, {
                blockchainName,
                isBranded,
              }),
              severity: 'success',
              title: t(keys.activationAcceptedTitle, {
                blockchainName,
                isBranded,
              }),
            }),
          );
        }

        await handleFetchReferrer();

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
    handleFetchReferrer,
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
