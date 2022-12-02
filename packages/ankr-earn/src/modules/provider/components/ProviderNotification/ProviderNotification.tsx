import { Box } from '@material-ui/core';

import { useDialog } from 'modules/common/hooks/useDialog';

import { ProviderBanner } from '../ProviderBanner/ProviderBanner';
import { ProviderDialog } from '../ProviderDialog/ProviderDialog';
import { Rewards } from '../Rewards';

import { useBanner } from './useBanner';
import { useProviderNotification } from './useProviderNotification';

export const ProviderNotification = (): JSX.Element | null => {
  const { isActive: isBannerActive, handleClose } = useBanner();
  const { isOpened, onOpen, onClose } = useDialog();
  const { ethAmount, usdAmount } = useProviderNotification();

  const isActive = isBannerActive && !ethAmount.isZero();

  return isActive ? (
    <>
      <ProviderBanner onCloseClick={handleClose} onDetailsClick={onOpen} />

      <ProviderDialog open={isOpened} onClose={onClose}>
        <Box mt={4}>
          <Rewards amount={ethAmount} usdAmount={usdAmount} />
        </Box>
      </ProviderDialog>
    </>
  ) : null;
};
