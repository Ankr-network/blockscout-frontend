import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { TopUpCurrency } from 'modules/analytics/mixpanel/const';
import { TrackTopUpSubmit } from 'domains/account/types';
import { resetTopUpOrigin } from 'domains/account/store/accountTopUpSlice';
import { useTopUp } from 'domains/account/hooks/useTopUp';

import { AmountValidator, FormValues } from '../types';
import { FormField } from '../constants';

export interface SubmitHandlerParams {
  handleOpenEmailDialog: () => void;
  hasEmailBound: boolean;
  trackSubmit?: TrackTopUpSubmit;
  validateAmount: AmountValidator;
}

const topUpPath = AccountRoutesConfig.topUp.generatePath();

export const useSubmitHandler = ({
  handleOpenEmailDialog,
  hasEmailBound,
  trackSubmit = () => {},
  validateAmount,
}: SubmitHandlerParams) => {
  const dispatch = useDispatch();
  const { handleSetAmount } = useTopUp();

  return useCallback(
    ({ amount }: FormValues) => {
      const error = validateAmount(amount);

      if (error) {
        return {
          [FormField.Amount]: error,
        };
      }

      handleSetAmount(new BigNumber(amount));

      if (!hasEmailBound) {
        handleOpenEmailDialog();
      } else {
        dispatch(resetTopUpOrigin());
        dispatch(push(topUpPath));

        trackSubmit(amount, TopUpCurrency.ANKR);
      }

      return undefined;
    },
    [
      dispatch,
      handleSetAmount,
      hasEmailBound,
      handleOpenEmailDialog,
      trackSubmit,
      validateAmount,
    ],
  );
};
