import { useCallback } from 'react';

import { useAppDispatch } from 'store/useAppDispatch';
import { useAppSelector } from 'store/useAppSelector';

import {
  resetReferralCode,
  setReferralCode,
} from '../store/referralProgramSlice';
import { selectReferralCode } from '../store/selectors';

export const useSavedReferralCode = () => {
  const savedReferralCode = useAppSelector(selectReferralCode);

  const dispatch = useAppDispatch();

  const handleSaveReferralCode = useCallback(
    (referralCode: string) => {
      dispatch(setReferralCode(referralCode));
    },
    [dispatch],
  );

  const handleRemoveSavedReferralCode = useCallback(() => {
    dispatch(resetReferralCode());
  }, [dispatch]);

  return {
    handleRemoveSavedReferralCode,
    handleSaveReferralCode,
    savedReferralCode,
  };
};
