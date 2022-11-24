import { t } from '@ankr.com/common';
import { Box } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { disconnect } from 'modules/auth/common/actions/disconnect';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { EKnownDialogs, useDialog } from 'modules/dialogs';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { Container } from 'uiKit/Container';

import { UnsupportedBanner } from '../../components/UnsupportedBanner';

export const SupportGuard = (): JSX.Element => {
  const dispatchRequest = useDispatchRequest();

  const { walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const { handleOpen } = useDialog(EKnownDialogs.connect);

  const handleBtnClick = async () => {
    await dispatchRequest(disconnect(AvailableWriteProviders.ethCompatible));
    handleOpen();
  };

  const currentWallet = walletName || t('stake-ssv.unsupported.current-wallet');

  return (
    <DefaultLayout verticalAlign="center">
      <Box component="section" py={{ xs: 5, md: 8 }}>
        <Container>
          <UnsupportedBanner
            currentWallet={currentWallet}
            onClick={handleBtnClick}
          />
        </Container>
      </Box>
    </DefaultLayout>
  );
};
