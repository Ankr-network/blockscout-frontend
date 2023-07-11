import { Button } from '@mui/material';

import { t } from '@ankr.com/common';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { InfoCard } from 'domains/userSettings/components/InfoCard';

export const ConnectRelatedWalletCard = () => {
  const { handleDisconnect } = useAuth();

  return (
    <InfoCard
      title={t('user-settings.connect-related-wallet-card.title')}
      description={t('user-settings.connect-related-wallet-card.description')}
      align="center"
    >
      <Button onClick={handleDisconnect}>
        {t('user-settings.connect-related-wallet-card.change-wallet-button')}
      </Button>
    </InfoCard>
  );
};
