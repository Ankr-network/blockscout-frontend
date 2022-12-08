import { t } from '@ankr.com/common';
import { Box } from '@material-ui/core';

import { AvailableWriteProviders, EWalletId } from '@ankr.com/provider';

import { UnsupportedWallet } from 'modules/auth/common/components/UnsupportedWallet';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useReconnect } from 'modules/auth/common/hooks/useReconnect';
import { WalletGuard } from 'modules/auth/eth/components/WalletGuard';
import { CloverWalletIcon } from 'modules/common/components/Icons/CloverWalletIcon';
import { Container } from 'uiKit/Container';

const provider = AvailableWriteProviders.ethCompatible;

interface IBridgeWalletGuardProps {
  children: JSX.Element;
}

export const BridgeWalletGuard = ({
  children,
}: IBridgeWalletGuardProps): JSX.Element => {
  const { reconnect } = useReconnect(provider);
  const { walletId } = useConnectedData(provider);

  const renderedSupportSlot = (
    <Box component="section" py={{ xs: 5, md: 8 }}>
      <Container>
        <UnsupportedWallet
          iconSlot={<CloverWalletIcon />}
          title={t('bridge.unsupported.clover-title')}
          onClick={reconnect}
        />
      </Container>
    </Box>
  );

  return (
    <WalletGuard
      currentWalletId={walletId}
      notSupportedWallets={[EWalletId.clover]}
      supportSlot={renderedSupportSlot}
    >
      {children}
    </WalletGuard>
  );
};
