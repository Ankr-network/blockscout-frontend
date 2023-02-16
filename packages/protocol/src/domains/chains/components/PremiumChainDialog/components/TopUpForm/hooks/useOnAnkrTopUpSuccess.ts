import { push } from 'connected-react-router';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { TopUpCurrnecy } from 'modules/analytics/mixpanel/const';
import { TopUpOrigin, TrackTopUpSubmit } from 'domains/account/types';
import { TopUpSuccessHandler } from '../types';
import { setTopUpOrigin } from 'domains/account/store/accountTopUpSlice';

export const useOnAnkrTopUpSuccess = (
  trackSubmit: TrackTopUpSubmit = () => {},
): TopUpSuccessHandler => {
  const dispatch = useDispatch();

  return useCallback(
    ({ amount }) => {
      dispatch(setTopUpOrigin(TopUpOrigin.ENDPOINTS));
      dispatch(push(AccountRoutesConfig.topUp.generatePath()));

      trackSubmit(amount, TopUpCurrnecy.ANKR);
    },
    [dispatch, trackSubmit],
  );
};
