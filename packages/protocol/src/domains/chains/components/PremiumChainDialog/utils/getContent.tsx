import { ReactNode } from 'react';

import { ContentType, Item } from '../types';
import { DefaultContent } from '../components/DefaultContent';
import { SignUpContent } from '../components/SignUpContent';
import { TopUpForm } from '../components/TopUpForm';
import { usePremiumUpgradeHandler } from '../hooks/usePremiumUpgradeHandler';

const { DEFAULT, SIGN_UP, TOP_UP } = ContentType;

export interface ContentParams {
  contentType: ContentType;
  items: Item[];
  onClose: () => void;
  onTrack?: () => void;
  premiumUpgradeHandler: ReturnType<typeof usePremiumUpgradeHandler>;
  resetTitle: () => void;
}

export const getContent = ({
  contentType,
  items,
  onClose,
  onTrack,
  premiumUpgradeHandler,
  resetTitle,
}: ContentParams) => {
  const contentMap: Record<ContentType, ReactNode> = {
    [DEFAULT]: (
      <DefaultContent
        items={items}
        onPremiumUpgradeButtonClick={premiumUpgradeHandler}
        onTrack={onTrack}
      />
    ),
    [SIGN_UP]: <SignUpContent onClose={onClose} onGoogleSignUp={resetTitle} />,
    [TOP_UP]: <TopUpForm />,
  };

  return contentMap[contentType];
};
