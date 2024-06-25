import { useMemo } from 'react';
import { t } from '@ankr.com/common';

import { EPaymentType } from 'modules/payments/types';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { renderPaymentTypeTooltip } from 'modules/payments/utils/renderPaymentTypeTooltip';
import { PaymentTypeTitle } from 'modules/payments/components/PaymentTypeTitle';

import { PaymentTab } from '../../PaymentTab';

export interface IUsePaymentTabsProps {
  initialTabID?: EPaymentType;
}

export const usePaymentTabs = ({
  initialTabID,
}: IUsePaymentTabsProps | void = {}) => {
  const rawTabs = useMemo<Tab<EPaymentType>[]>(
    () => [
      {
        id: EPaymentType.Recurring,
        title: (isSelected: boolean) => (
          <PaymentTab
            isSelected={isSelected}
            label={
              <PaymentTypeTitle
                isCapitalized
                paymentType={EPaymentType.Recurring}
              />
            }
          />
        ),
        tooltip: renderPaymentTypeTooltip(EPaymentType.Recurring),
      },
      {
        id: EPaymentType.OneTime,
        title: (isSelected: boolean) => (
          <PaymentTab
            isSelected={isSelected}
            label={
              <PaymentTypeTitle
                isCapitalized
                paymentType={EPaymentType.OneTime}
              />
            }
          />
        ),
        tooltip: renderPaymentTypeTooltip(EPaymentType.OneTime),
      },
      {
        id: EPaymentType.Deal,
        title: (isSelected: boolean) => (
          <PaymentTab
            isSelected={isSelected}
            label={
              <PaymentTypeTitle
                isCapitalized
                paymentType={EPaymentType.Deal}
                promo={t('account.payment-form.deal-proposal.label')}
              />
            }
          />
        ),
        tooltip: renderPaymentTypeTooltip(EPaymentType.Deal),
      },
    ],
    [],
  );

  const [tabs, selectedTab] = useTabs({
    initialTabID,
    tabs: rawTabs,
  });

  return { selectedTab, tabs };
};
