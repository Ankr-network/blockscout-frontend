import { t } from '@ankr.com/common';
import { InfoCard } from '../InfoCard';
import { ConnectButton } from 'domains/auth/components/ConnectButton';

export const ConnectWalletCard = () => {
  return (
    <InfoCard
      title={t('user-settings.connect-wallet-card.title')}
      description={t('user-settings.connect-wallet-card.description')}
      align="center"
      actionSlot={<ConnectButton variant="contained" />}
    />
  );
};
