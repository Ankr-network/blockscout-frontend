import { useAuth } from 'domains/auth/hooks/useAuth';
import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';
import { PlansDialog } from 'modules/common/components/PlansDialog';
import { UpgradePlanBanner } from 'modules/common/components/UpgradePlanBanner';

export const PrivateChainsTop = () => {
  const { hasPremium } = useAuth();
  const { isOpened, onClose } = useUpgradePlanDialog();

  return (
    <>
      {!hasPremium && <UpgradePlanBanner isPublicUser />}
      <ExpiredTokenBanner />
      <PlansDialog onClose={onClose} open={isOpened} />
    </>
  );
};
