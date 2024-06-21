import { ReactNode } from 'react';

import { AccountDetailsTopUp } from 'domains/account/screens/BillingPage/components/AccountDetailsTopUp';
import { ECurrency } from 'modules/payments/types';

import { ContactSalesForm } from '../components/ContactSalesForm';
import { ContentType, Plan } from '../types';
import { DefaultContent } from '../components/DefaultContent';
import { SignUpContent } from '../components/SignUpContent';

const { CONTACT_SALES_FORM, CONTACT_SALES_SUCCESS, DEFAULT, SIGN_UP, TOP_UP } =
  ContentType;

export interface ContentParams {
  contentType: ContentType;
  currency?: ECurrency;
  enterpriseUpgradeHandler: () => void;
  freeUpgradeHandler: () => void;
  onClose: () => void;
  onSubmitContactForm: () => void;
  plans: Plan[];
  premiumUpgradeHandler: () => void;
  resetTitle: () => void;
}

export const getContent = ({
  contentType,
  enterpriseUpgradeHandler,
  freeUpgradeHandler,
  onClose,
  onSubmitContactForm,
  plans,
  premiumUpgradeHandler,
  resetTitle,
}: ContentParams) => {
  const contentMap: Record<ContentType, ReactNode> = {
    [DEFAULT]: (
      <DefaultContent
        onEnterpriseUpgradeButtonClick={enterpriseUpgradeHandler}
        onFreeUpgradeButtonClick={freeUpgradeHandler}
        onPremiumUpgradeButtonClick={premiumUpgradeHandler}
        plans={plans}
      />
    ),
    [SIGN_UP]: <SignUpContent onClose={onClose} onOauthSignUp={resetTitle} />,
    [TOP_UP]: <AccountDetailsTopUp />,
    [CONTACT_SALES_FORM]: <ContactSalesForm onSubmit={onSubmitContactForm} />,
    [CONTACT_SALES_SUCCESS]: (
      <ContactSalesForm onSubmit={onSubmitContactForm} />
    ),
  };

  return contentMap[contentType];
};
