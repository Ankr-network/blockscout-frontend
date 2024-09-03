import { Box } from '@mui/material';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { useDialog } from 'modules/common/hooks/useDialog';

import { BannerSkeleton } from '../BannerSkeleton';
import { UpgradePlanBannerContent } from './UpgradePlanBannerContent';
import { PlansDialog } from '../PlansDialog';

interface UpgradePlanBannerProps {
  isAdvancedApi?: boolean;
  isPublicUser?: boolean;
}

export const UpgradePlanBanner = ({
  isAdvancedApi = false,
  isPublicUser = false,
}: UpgradePlanBannerProps) => {
  const { hasPremium, loading } = useAuth();

  const { isEnterpriseClient } = useEnterpriseClientStatus();

  const { isOpened, onClose, onOpen } = useDialog();

  // Upgrade plan banner should be hidden for premium and enterprise users on chains page
  // as we are now showing them the request banner with the same call to action
  if (hasPremium || isEnterpriseClient) return null;

  if (loading) return <BannerSkeleton />;

  return (
    <GuardUserGroup blockName={BlockWithPermission.UpgradePlan}>
      <Box sx={{ mb: 8 }}>
        <UpgradePlanBannerContent
          hasPremium={hasPremium}
          handleOpen={onOpen}
          isAdvancedApi={isAdvancedApi}
          isPublicUser={isPublicUser}
        />
        <PlansDialog onClose={onClose} open={isOpened} />
      </Box>
    </GuardUserGroup>
  );
};
