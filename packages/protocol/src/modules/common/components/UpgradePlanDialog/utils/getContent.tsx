import { ReactNode } from 'react';

import { ContactSalesForm } from '../components/ContactSalesForm';
import { ContentType, Plan } from '../types';
import { DefaultContent } from '../components/DefaultContent';
import { SignUpContent } from '../components/SignUpContent';
import { TopUpForm } from '../components/TopUpForm';

const { DEFAULT, SIGN_UP, TOP_UP, CONTACT_SALES_FORM, CONTACT_SALES_SUCCESS } =
  ContentType;

export interface ContentParams {
  contentType: ContentType;
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
    [SIGN_UP]: <SignUpContent onClose={onClose} onGoogleSignUp={resetTitle} />,
    [TOP_UP]: <TopUpForm />,
    [CONTACT_SALES_FORM]: <ContactSalesForm onSubmit={onSubmitContactForm} />,
    [CONTACT_SALES_SUCCESS]: (
      <ContactSalesForm onSubmit={onSubmitContactForm} />
    ),
  };

  return contentMap[contentType];
};
