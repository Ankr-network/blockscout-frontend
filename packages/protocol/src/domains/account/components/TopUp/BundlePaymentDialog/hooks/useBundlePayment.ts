import { useCallback } from 'react';

import { TopUpCurrency } from 'modules/analytics/mixpanel/const';
import { TrackTopUpSubmit } from 'domains/account/types';
import { resetTopUpOrigin } from 'domains/account/store/accountTopUpSlice';
import { selectBundlePaymentPlanByPriceId } from 'domains/account/store/selectors';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAppSelector } from 'store/useAppSelector';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useEmailData } from 'domains/userSettings/screens/Settings/hooks/useSettings';
import { useLazyFetchLinkForBundlePaymentQuery } from 'domains/account/actions/bundles/fetchLinkForBundlePayment';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

interface IUsdBundlePaymentProps {
  priceId?: string;
  trackSubmit?: TrackTopUpSubmit;
}

export const useBundlePayment = ({
  priceId,
  trackSubmit,
}: IUsdBundlePaymentProps) => {
  const { bundle, price } =
    useAppSelector(state => selectBundlePaymentPlanByPriceId(state, priceId)) ??
    {};

  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const [fetchLink, { isLoading }] = useLazyFetchLinkForBundlePaymentQuery();
  const emailData = useEmailData();
  const { onOpen: openEmailDialog, ...emailDialogProps } = useDialog();

  const amount = price?.amount;
  const productId = bundle?.product_id;
  const { confirmedEmail, pendingEmail } = emailData;

  const dispatch = useAppDispatch();

  const subscribe = useCallback(async () => {
    if (!confirmedEmail || pendingEmail) {
      openEmailDialog();
    } else if (productId && priceId) {
      dispatch(resetTopUpOrigin());

      const { data: url } = await fetchLink({ group, priceId, productId });

      if (trackSubmit && amount) {
        trackSubmit(amount, TopUpCurrency.USD, () => {
          if (url) {
            window.location.href = url;
          }
        });
      } else if (url) {
        window.location.href = url;
      }
    }
  }, [
    amount,
    confirmedEmail,
    dispatch,
    fetchLink,
    group,
    openEmailDialog,
    pendingEmail,
    priceId,
    productId,
    trackSubmit,
  ]);

  return { emailData, emailDialogProps, isLoading, subscribe };
};
