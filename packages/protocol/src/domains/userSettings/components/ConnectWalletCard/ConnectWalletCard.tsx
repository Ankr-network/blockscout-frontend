import { Button } from '@material-ui/core';

import { t } from 'common';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { InfoCard } from '../InfoCard';

export const ConnectWalletCard = () => {
  const { handleConnect } = useAuth();

  return (
    <InfoCard
      title={t('user-settings.connect-wallet-card.title')}
      description={t('user-settings.connect-wallet-card.description')}
      align="center"
      actionSlot={
        <Button onClick={handleConnect}>
          {t('user-settings.connect-wallet-card.connect-wallet-button')}
        </Button>
      }
    />
  );
};
