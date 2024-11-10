import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { PlansDialog } from 'modules/common/components/PlansDialog';
import { UpgradePlanBanner } from 'modules/common/components/UpgradePlanBanner';
import { selectHasPremium } from 'domains/auth/store';
import { useAppSelector } from 'store/useAppSelector';
import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';

export const PrivateChainsTop = () => {
  const hasPremium = useAppSelector(selectHasPremium);

  const { isOpened, onClose } = useUpgradePlanDialog();

  return (
    <>
      {!hasPremium && <UpgradePlanBanner isPublicUser />}
      <ExpiredTokenBanner />
      <PlansDialog onClose={onClose} open={isOpened} />
    </>
  );
};
