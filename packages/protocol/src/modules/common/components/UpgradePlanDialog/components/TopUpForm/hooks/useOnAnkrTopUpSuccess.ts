import { push } from 'connected-react-router';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { TopUpCurrency } from 'modules/analytics/mixpanel/const';
import { TopUpOrigin, TrackTopUpSubmit } from 'domains/account/types';
import { TopUpSuccessHandler } from '../types';
import {
  selectTopUpOrigin,
  setTopUpOrigin,
} from 'domains/account/store/accountTopUpSlice';

export const useOnAnkrTopUpSuccess = (
  trackSubmit: TrackTopUpSubmit = () => {},
): TopUpSuccessHandler => {
  const dispatch = useDispatch();
  const topUpOrigin = useSelector(selectTopUpOrigin);

  return useCallback(
    ({ amount }) => {
      dispatch(setTopUpOrigin(topUpOrigin ?? TopUpOrigin.ENDPOINTS));
      dispatch(push(AccountRoutesConfig.topUp.generatePath()));

      trackSubmit(amount, TopUpCurrency.ANKR);
    },
    [dispatch, trackSubmit, topUpOrigin],
  );
};
