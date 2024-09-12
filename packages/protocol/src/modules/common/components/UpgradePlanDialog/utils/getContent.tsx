import { ReactNode } from 'react';

import { AccountDetailsTopUp } from 'domains/account/screens/BillingPage/components/AccountDetailsTopUp';

import { ContentType } from '../types';
import { SignUpContent } from '../components/SignUpContent';

const { SIGN_UP, TOP_UP } = ContentType;

export interface ContentParams {
  contentType: ContentType;
  onClose: () => void;
  resetTitle: () => void;
}

export const getContent = ({
  contentType,
  onClose,
  resetTitle,
}: ContentParams) => {
  const contentMap: Record<ContentType, ReactNode> = {
    [SIGN_UP]: <SignUpContent onClose={onClose} onOauthSignUp={resetTitle} />,
    [TOP_UP]: <AccountDetailsTopUp />,
  };

  return contentMap[contentType];
};
