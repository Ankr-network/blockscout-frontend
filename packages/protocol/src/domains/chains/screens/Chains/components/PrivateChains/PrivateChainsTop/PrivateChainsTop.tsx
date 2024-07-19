import { useAuth } from 'domains/auth/hooks/useAuth';
import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { Timeframe } from 'modules/chains/types';
import { RequestsBannerContainer } from 'domains/chains/components/RequestsBannerContainer/RequestsBannerContainer';
import { JwtTokenManager } from 'domains/jwtToken/components/JwtTokenManager';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';
import { PlansDialog } from 'modules/common/components/PlansDialog';

interface IPrivateChainsProps {
  timeframe: Timeframe;
}

export const PrivateChainsTop = ({ timeframe }: IPrivateChainsProps) => {
  const { hasPremium, hasUserEndpointToken } = useAuth();
  const { isOpened, onClose } = useUpgradePlanDialog();

  return (
    <>
      <ExpiredTokenBanner />
      {hasPremium && hasUserEndpointToken && (
        <GuardUserGroup blockName={BlockWithPermission.UsageData}>
          <RequestsBannerContainer timeframe={timeframe} />
        </GuardUserGroup>
      )}
      <JwtTokenManager />
      <PlansDialog onClose={onClose} open={isOpened} />
    </>
  );
};
