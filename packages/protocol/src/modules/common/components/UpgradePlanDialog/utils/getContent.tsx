import { ReactNode } from 'react';

import { AccountDetailsTopUp } from 'domains/account/screens/BillingPage/components/AccountDetailsTopUp';

import { ContactSalesForm } from '../components/ContactSalesForm';
import { ContentType } from '../types';
import { SignUpContent } from '../components/SignUpContent';

const { CONTACT_SALES_FORM, CONTACT_SALES_SUCCESS, SIGN_UP, TOP_UP } =
  ContentType;

export interface ContentParams {
  contentType: ContentType;
  onClose: () => void;
  onSubmitContactForm: () => void;
  resetTitle: () => void;
}

export const getContent = ({
  contentType,
  onClose,
  onSubmitContactForm,
  resetTitle,
}: ContentParams) => {
  const contentMap: Record<ContentType, ReactNode> = {
    [SIGN_UP]: <SignUpContent onClose={onClose} onOauthSignUp={resetTitle} />,
    [TOP_UP]: <AccountDetailsTopUp />,
    [CONTACT_SALES_FORM]: <ContactSalesForm onSubmit={onSubmitContactForm} />,
    [CONTACT_SALES_SUCCESS]: (
      <ContactSalesForm onSubmit={onSubmitContactForm} />
    ),
  };

  return contentMap[contentType];
};
