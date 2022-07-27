import { t, tHTML } from 'common';
import { InfoCard } from 'domains/userSettings/components/InfoCard';
import { LinkExpiredActionSlot } from './components/LinkExpiredActionSlot';
import { useLinkExpiredCard } from './useLinkExpiredCard';

export const LinkExpiredCard = () => {
  const {
    email,
    isResendEmailDisabled,
    resendEmailErrorMessage,
    onResendEmail,
  } = useLinkExpiredCard();

  return (
    <InfoCard
      title={t('user-settings.link-expired-card.title')}
      description={tHTML('user-settings.link-expired-card.description', {
        email: email || t('user-settings.common.email-value-fallback'),
      })}
      align="center"
      actionSlot={
        <LinkExpiredActionSlot
          isResendEmailDisabled={isResendEmailDisabled}
          resendEmailErrorMessage={resendEmailErrorMessage}
          onResendEmail={onResendEmail}
          onChangeEmail={undefined}
        />
      }
    />
  );
};
