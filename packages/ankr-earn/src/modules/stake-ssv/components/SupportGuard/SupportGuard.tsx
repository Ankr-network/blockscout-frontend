import { Box } from '@material-ui/core';

import { AvailableWriteProviders, EWalletId } from '@ankr.com/provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { Container } from 'uiKit/Container';

import { UnsupportedBanner } from '../UnsupportedBanner';

interface ISupportGuardProps {
  children: JSX.Element;
}

export const SupportGuard = ({ children }: ISupportGuardProps): JSX.Element => {
  const { walletId } = useConnectedData(AvailableWriteProviders.ethCompatible);
  const isTrustWallet = walletId === EWalletId.trust;

  if (isTrustWallet) {
    return (
      <Box component="section" py={{ xs: 5, md: 8 }}>
        <Container>
          <UnsupportedBanner />
        </Container>
      </Box>
    );
  }

  return children;
};
