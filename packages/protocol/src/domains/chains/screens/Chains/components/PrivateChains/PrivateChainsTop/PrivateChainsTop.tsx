import { useAuth } from 'domains/auth/hooks/useAuth';
import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { Timeframe } from 'modules/chains/types';
import { RequestsBannerContainer } from 'domains/chains/components/RequestsBannerContainer/RequestsBannerContainer';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';
import { PlansDialog } from 'modules/common/components/PlansDialog';
import { UpgradePlanBanner } from 'modules/common/components/UpgradePlanBanner';

interface IPrivateChainsProps {
  timeframe: Timeframe;
}

export const PrivateChainsTop = ({ timeframe }: IPrivateChainsProps) => {
  const { hasPremium, hasUserEndpointToken } = useAuth();
  const { isOpened, onClose } = useUpgradePlanDialog();

  return (
    <>
      {!hasPremium && <UpgradePlanBanner isPublicUser />}
      <ExpiredTokenBanner />
      {hasPremium && hasUserEndpointToken && (
        <GuardUserGroup blockName={BlockWithPermission.UsageData}>
          <RequestsBannerContainer timeframe={timeframe} />
        </GuardUserGroup>
      )}
      <PlansDialog onClose={onClose} open={isOpened} />
    </>
  );
};
