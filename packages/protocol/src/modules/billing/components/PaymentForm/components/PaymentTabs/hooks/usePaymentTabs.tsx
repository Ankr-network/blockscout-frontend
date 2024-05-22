import { useMemo } from 'react';
import { t } from '@ankr.com/common';

import { EPaymentType } from 'modules/billing/types';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { PaymentTypeTitle } from 'modules/billing/components/PaymentForm/components/PaymentTypeTitle/PaymentTypeTitle';
import { renderPaymentTypeTooltip } from 'modules/billing/utils/renderPaymentTypeTooltip';

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
            label={PaymentTypeTitle({
              isCapitalized: true,
              paymentType: EPaymentType.Recurring,
            })}
          />
        ),
        tooltip: renderPaymentTypeTooltip(EPaymentType.Recurring),
      },
      {
        id: EPaymentType.OneTime,
        title: (isSelected: boolean) => (
          <PaymentTab
            isSelected={isSelected}
            label={PaymentTypeTitle({
              isCapitalized: true,
              paymentType: EPaymentType.OneTime,
            })}
          />
        ),
        tooltip: renderPaymentTypeTooltip(EPaymentType.OneTime),
      },
      {
        id: EPaymentType.Deal,
        title: (isSelected: boolean) => (
          <PaymentTab
            isSelected={isSelected}
            label={PaymentTypeTitle({
              isCapitalized: true,
              paymentType: EPaymentType.Deal,
              promo: t('account.payment-form.deal-proposal.label'),
            })}
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
