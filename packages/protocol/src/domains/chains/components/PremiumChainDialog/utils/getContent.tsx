import { ReactNode } from 'react';
import { ContentType, Item } from '../types';
import { DefaultContent } from '../components/DefaultContent';
import { SignUpContent } from '../components/SignUpContent';
import { TopUpForm } from '../components/TopUpForm';
import { ContactSalesForm } from '../components/ContactSalesForm';
import { usePremiumUpgradeHandler } from '../hooks/usePremiumUpgradeHandler';
import { useContactFormHandler } from '../hooks/useContactFormHandler';

const { DEFAULT, SIGN_UP, TOP_UP, CONTACT_SALES_FORM, CONTACT_SALES_SUCCESS } =
  ContentType;

export interface ContentParams {
  contentType: ContentType;
  items: Item[];
  onClose: () => void;
  onTrack?: () => void;
  premiumUpgradeHandler: ReturnType<typeof usePremiumUpgradeHandler>;
  contactFormHandler: ReturnType<typeof useContactFormHandler>;
  resetTitle: () => void;
  onSubmitContactForm: () => void;
}

export const getContent = ({
  contentType,
  items,
  onClose,
  onTrack,
  premiumUpgradeHandler,
  contactFormHandler,
  resetTitle,
  onSubmitContactForm,
}: ContentParams) => {
  const contentMap: Record<ContentType, ReactNode> = {
    [DEFAULT]: (
      <DefaultContent
        items={items}
        onPremiumUpgradeButtonClick={premiumUpgradeHandler}
        onEnterpriseUpgradeButtonClick={contactFormHandler}
        onTrack={onTrack}
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
