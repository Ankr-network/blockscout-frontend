import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { getEmailBindings } from 'domains/userSettings/actions/email/getEmailBindings';
import {
  disableBanner,
  selectIsBannerDisabled,
} from 'domains/userSettings/store/userSettingsDisabledBannersSlice';
import { UserSettingsBanners } from 'domains/userSettings/types';
import { makeEmailStatuses } from 'domains/userSettings/utils/makeEmailStatuses';
import { IEmailResponse } from 'multirpc-sdk';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAppSelector } from 'store/useAppSelector';

type IUseDialogVisibilityResult = {
  isDialogVisible: boolean;
  handleDoNotShowAgain: () => void;
  handleClose: () => void;
};

export const useDialogVisibility = (
  asCard: boolean,
): IUseDialogVisibilityResult => {
  const dispatch = useAppDispatch();
  const dispatchRequest = useDispatchRequest();

  const { isWalletConnected, address } = useAuth();

  useEffect(() => {
    if (isWalletConnected && !asCard) {
      dispatchRequest(getEmailBindings());
    }
  }, [asCard, dispatchRequest, isWalletConnected]);

  const { loading, data } = useQuery<IEmailResponse[] | null>({
    type: getEmailBindings.toString(),
  });

  const { isEmailNotUsed } = useMemo(() => makeEmailStatuses(data), [data]);

  const [isOpen, setIsOpen] = useState(false);

  const isBannerDisabled = useAppSelector(
    selectIsBannerDisabled(UserSettingsBanners.ADD_EMAIl, address),
  );

  const wasBannerDisabled = useMemo(
    () => isBannerDisabled,

    // * only re-compute on 'isWalletConnected' change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isWalletConnected],
  );

  const shouldBeVisible = useMemo(
    () => isWalletConnected && !loading && isEmailNotUsed && !wasBannerDisabled,
    [isEmailNotUsed, isWalletConnected, loading, wasBannerDisabled],
  );

  useEffect(() => {
    if (shouldBeVisible) setIsOpen(true);
  }, [shouldBeVisible]);

  const isDialogVisible = useMemo(
    () => isOpen && shouldBeVisible,
    [isOpen, shouldBeVisible],
  );

  const handleClose = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const handleDoNotShowAgain = useCallback((): void => {
    dispatch(
      disableBanner({
        bannerToDisable: UserSettingsBanners.ADD_EMAIl,
        address,
      }),
    );
    setIsOpen(false);
  }, [address, dispatch]);

  return {
    isDialogVisible,
    handleClose,
    handleDoNotShowAgain,
  };
};
