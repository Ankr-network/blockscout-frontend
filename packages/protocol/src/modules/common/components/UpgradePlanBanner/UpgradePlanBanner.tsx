import React from 'react';
import { Box } from '@mui/material';
import {
  PremiumChainDialog,
  PremiumChainDialogV2,
} from 'domains/chains/components/PremiumChainDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBanner } from './hooks/useBanner';
import { UpgradePlanBannerSkeleton } from './UpgradePlanBannerSkeleton';
import { UpgradePlanBannerContent } from './UpgradePlanBannerContent';

interface UpgradePlanBannerProps {
  isAdvancedApi?: boolean;
}

export const UpgradePlanBanner = ({
  isAdvancedApi = false,
}: UpgradePlanBannerProps) => {
  const { hasPremium, loading } = useAuth();
  const { isBannerV2, isOpened, handleOpen, handleClose, handleUpgrade } =
    useBanner();

  if (loading) return <UpgradePlanBannerSkeleton />;

  return (
    <Box sx={{ mb: 10 }}>
      <UpgradePlanBannerContent
        hasPremium={hasPremium}
        handleOpen={handleOpen}
        isAdvancedApi={isAdvancedApi}
      />

      {isBannerV2 ? (
        <PremiumChainDialogV2
          open={isOpened}
          onClose={handleClose}
          onTrack={handleUpgrade}
        />
      ) : (
        <PremiumChainDialog
          open={isOpened}
          onClose={handleClose}
          onTrack={handleUpgrade}
        />
      )}
    </Box>
  );
};
