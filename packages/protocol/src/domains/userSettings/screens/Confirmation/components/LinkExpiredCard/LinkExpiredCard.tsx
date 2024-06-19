import { t, tHTML } from '@ankr.com/common';

import { InfoCard } from 'domains/userSettings/components/InfoCard';

import { LinkExpiredActionSlot } from './components/LinkExpiredActionSlot';
import { useLinkExpiredCard } from './useLinkExpiredCard';

export const LinkExpiredCard = () => {
  const { actionProps, email } = useLinkExpiredCard();

  return (
    <InfoCard
      align="center"
      title={t('user-settings.link-expired-card.title')}
      description={tHTML('user-settings.link-expired-card.description', {
        email: email || t('user-settings.common.email-value-fallback'),
      })}
    >
      <LinkExpiredActionSlot {...actionProps} />
    </InfoCard>
  );
};
