import { t } from '@ankr.com/common';

import { ConnectButton } from 'domains/auth/components/ConnectButton';

import { InfoCard } from '../InfoCard';

export const ConnectWalletCard = () => {
  return (
    <InfoCard
      title={t('user-settings.connect-wallet-card.title')}
      description={t('user-settings.connect-wallet-card.description')}
      align="center"
    >
      <ConnectButton
        variant="contained"
        buttonText={t('user-settings.connect-wallet-card.button')}
      />
    </InfoCard>
  );
};
