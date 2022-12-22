import { t } from '@ankr.com/common';
import { Box } from '@material-ui/core';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { UnsupportedWallet } from 'modules/auth/common/components/UnsupportedWallet';
import { useDisconnectAndOpenModal } from 'modules/auth/common/hooks/useDisconnectAndOpenModal';
import { OkxWalletIcon } from 'modules/common/components/Icons/OkxWalletIcon';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { Container } from 'uiKit/Container';

const provider = AvailableWriteProviders.ethCompatible;

export const UnsupportedOkxWallet = (): JSX.Element => {
  const { disconnectAndOpenModal: reconnect } =
    useDisconnectAndOpenModal(provider);

  return (
    <DefaultLayout verticalAlign="center">
      <Box component="section" py={{ xs: 5, md: 8 }}>
        <Container>
          <UnsupportedWallet
            iconSlot={<OkxWalletIcon />}
            title={t('stake-mgno.unsupported.okx-title')}
            onClick={reconnect}
          />
        </Container>
      </Box>
    </DefaultLayout>
  );
};
