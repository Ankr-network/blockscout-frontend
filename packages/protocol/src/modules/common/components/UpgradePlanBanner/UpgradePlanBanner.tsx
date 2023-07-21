import { useMemo } from 'react';
import { Box } from '@mui/material';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { BannerSkeleton } from '../BannerSkeleton';
import {
  ContentType,
  UpgradePlanDialog,
  useURLBasedUpgradePlanDialog,
} from '../UpgradePlanDialog';
import { UpgradePlanBannerContent } from './UpgradePlanBannerContent';

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

  const { isDefault, isOpened, onClose, onOpen, type } =
    useURLBasedUpgradePlanDialog();

  const defaultState = useMemo(() => {
    if (!isPublicUser || !isDefault) {
      return undefined;
    }

    if (!hasWeb3Connection) {
      return ContentType.SIGN_UP;
    }

    if (!hasPrivateAccess) {
      return ContentType.TOP_UP;
    }

    return undefined;
  }, [isPublicUser, isDefault, hasWeb3Connection, hasPrivateAccess]);

  // Upgrade plan banner should be hidden for premium users on chains page
  // as we are now showing them the request banner with the same call to action
  if (hasPremium && !isAdvancedApi) return null;

  if (loading) return <BannerSkeleton />;

  return (
    <GuardUserGroup blockName={BlockWithPermission.UpgradePlan}>
      <Box sx={{ mb: 10 }}>
        <UpgradePlanBannerContent
          hasPremium={hasPremium}
          handleOpen={onOpen}
          isAdvancedApi={isAdvancedApi}
          isPublicUser={isPublicUser}
        />
        <UpgradePlanDialog
          defaultState={defaultState}
          onClose={onClose}
          open={isOpened}
          type={type}
        />
      </Box>
    </GuardUserGroup>
  );
};
