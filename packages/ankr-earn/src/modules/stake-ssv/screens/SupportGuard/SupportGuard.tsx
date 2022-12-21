import { t } from '@ankr.com/common';
import { Box } from '@material-ui/core';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useReconnect } from 'modules/auth/common/hooks/useReconnect';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { Container } from 'uiKit/Container';

import { UnsupportedBanner } from '../../components/UnsupportedBanner';

const provider = AvailableWriteProviders.ethCompatible;

export const SupportGuard = (): JSX.Element => {
  const { reconnect } = useReconnect(provider);
  const { walletName } = useConnectedData(provider);

  const currentWallet = walletName || t('stake-ssv.unsupported.current-wallet');

  return (
    <DefaultLayout verticalAlign="center">
      <Box component="section" py={{ xs: 5, md: 8 }}>
        <Container>
          <UnsupportedBanner
            currentWallet={currentWallet}
            onClick={reconnect}
          />
        </Container>
      </Box>
    </DefaultLayout>
  );
};
