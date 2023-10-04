import { ReactNode } from 'react';

import { AccountDetailsTopUp } from 'domains/account/screens/AccountDetails/components/AccountDetailsTopUp';

import { ContactSalesForm } from '../components/ContactSalesForm';
import { ContentType, Plan } from '../types';
import { DefaultContent } from '../components/DefaultContent';
import { SignUpContent } from '../components/SignUpContent';
import { TopUpCurrency } from '../components/TopUpForm/types';

const { DEFAULT, SIGN_UP, TOP_UP, CONTACT_SALES_FORM, CONTACT_SALES_SUCCESS } =
  ContentType;

export interface ContentParams {
  contentType: ContentType;
  currency?: TopUpCurrency;
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
    [TOP_UP]: <AccountDetailsTopUp hasHeader={false} />,
    [CONTACT_SALES_FORM]: <ContactSalesForm onSubmit={onSubmitContactForm} />,
    [CONTACT_SALES_SUCCESS]: (
      <ContactSalesForm onSubmit={onSubmitContactForm} />
    ),
  };

  return contentMap[contentType];
};
