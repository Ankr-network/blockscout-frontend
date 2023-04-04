import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import {
  PremiumChainDialog,
  PremiumChainDialogV2,
} from 'domains/chains/components/PremiumChainDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBanner } from './hooks/useBanner';
import { UpgradePlanBannerContent } from './UpgradePlanBannerContent';
import { BannerSkeleton } from '../BannerSkeleton';
import { ContentType } from 'domains/chains/components/PremiumChainDialog/types';

interface UpgradePlanBannerProps {
  isAdvancedApi?: boolean;
  isPublicUser?: boolean;
}

export const UpgradePlanBanner = ({
  isAdvancedApi = false,
  isPublicUser = false,
}: UpgradePlanBannerProps) => {
  const { hasPremium, loading, hasWeb3Connection, hasPrivateAccess } =
    useAuth();
  const { isBannerV2, isOpened, handleOpen, handleClose, handleUpgrade } =
    useBanner();

  const defaultState = useMemo(() => {
    if (!isPublicUser || isBannerV2) {
      return undefined;
    }

    if (!hasWeb3Connection) {
      return ContentType.SIGN_UP;
    }

    if (!hasPrivateAccess) {
      return ContentType.TOP_UP;
    }

    return undefined;
  }, [isPublicUser, isBannerV2, hasWeb3Connection, hasPrivateAccess]);

  // Upgrade plan banner should be hidden for premium users on chains page
  // as we are now showing them the request banner with the same call to action
  if (hasPremium && !isAdvancedApi) return null;

  if (loading) return <BannerSkeleton />;

  return (
    <Box sx={{ mb: 10 }}>
      <UpgradePlanBannerContent
        hasPremium={hasPremium}
        handleOpen={handleOpen}
        isAdvancedApi={isAdvancedApi}
        isPublicUser={isPublicUser}
      />

      {isBannerV2 ? (
        <PremiumChainDialogV2
          open={isOpened}
          defaultState={defaultState}
          onClose={handleClose}
          onUpgrade={handleUpgrade}
        />
      ) : (
        <PremiumChainDialog
          open={isOpened}
          defaultState={defaultState}
          onClose={handleClose}
          onUpgrade={handleUpgrade}
        />
      )}
    </Box>
  );
};
