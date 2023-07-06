import { useCallback } from 'react';

import { TopUpCurrnecy } from 'modules/analytics/mixpanel/const';
import { TrackTopUpSubmit } from 'domains/account/types';
import { resetTopUpOrigin } from 'domains/account/store/accountTopUpSlice';
import { selectFirstBundlePaymentPlan } from 'domains/account/store/selectors';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAppSelector } from 'store/useAppSelector';
import { useLazyFetchLinkForBundlePaymentQuery } from 'domains/account/actions/bundles/fetchLinkForBundlePayment';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useBundlePayment = (trackSubmit?: TrackTopUpSubmit) => {
  const { bundle, price } = useAppSelector(selectFirstBundlePaymentPlan) ?? {};

  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const [fetchLink, { isLoading }] = useLazyFetchLinkForBundlePaymentQuery();

  const amount = price?.amount;
  const priceId = bundle?.price_id;
  const productId = bundle?.product_id;

  const dispatch = useAppDispatch();

  const subscribe = useCallback(async () => {
    if (productId && priceId) {
      dispatch(resetTopUpOrigin());

      const { data: url } = await fetchLink({ group, priceId, productId });

      if (trackSubmit && amount) {
        trackSubmit(amount, TopUpCurrnecy.USD, () => {
          if (url) {
            window.location.href = url;
          }
        });
      } else if (url) {
        window.location.href = url;
      }
    }
  }, [amount, dispatch, fetchLink, group, priceId, productId, trackSubmit]);

  return { isLoading, subscribe };
};
