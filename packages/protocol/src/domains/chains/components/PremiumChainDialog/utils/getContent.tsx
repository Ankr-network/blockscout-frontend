import { ReactNode } from 'react';

import { ContentType, Item } from '../types';
import { DefaultContent } from '../components/DefaultContent/DefaultContent';
import { SignUpContent } from '../components/SignUpContent';
import { TopUpForm } from '../components/TopUpForm';
import { usePremiumUpgradeHandler } from '../hooks/usePremiumUpgradeHandler';

const { DEFAULT, SIGN_UP, TOP_UP } = ContentType;

export interface ContentParams {
  contentType: ContentType;
  isV2?: boolean;
  items: Item[];
  onTrack?: () => void;
  premiumUpgradeHandler: ReturnType<typeof usePremiumUpgradeHandler>;
  resetTitle: () => void;
}

export const getContent = ({
  contentType,
  isV2,
  items,
  onTrack,
  premiumUpgradeHandler,
  resetTitle,
}: ContentParams) => {
  const contentMap: Record<ContentType, ReactNode> = {
    [DEFAULT]: (
      <DefaultContent
        isV2={isV2}
        items={items}
        onPremiumUpgradeButtonClick={premiumUpgradeHandler}
        onTrack={onTrack}
      />
    ),
    [SIGN_UP]: <SignUpContent onGoogleSignUp={resetTitle} />,
    [TOP_UP]: <TopUpForm />,
  };

  return contentMap[contentType];
};
