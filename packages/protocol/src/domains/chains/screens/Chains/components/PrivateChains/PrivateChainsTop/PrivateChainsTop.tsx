import { useAuth } from 'domains/auth/hooks/useAuth';
import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { Timeframe } from 'domains/chains/types';
import { RequestsBannerContainer } from 'domains/chains/components/RequestsBannerContainer/RequestsBannerContainer';
import { JwtTokenManager } from 'domains/jwtToken/components/JwtTokenManager';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import {
  UpgradePlanDialog,
  useURLBasedUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';

interface IPrivateChainsProps {
  timeframe: Timeframe;
}

export const PrivateChainsTop = ({ timeframe }: IPrivateChainsProps) => {
  const { hasUserEndpointToken, hasPremium } = useAuth();
  const { isOpened, onClose, type } = useURLBasedUpgradePlanDialog();

  return (
    <>
      <ExpiredTokenBanner />
      {hasPremium && hasUserEndpointToken && (
        <GuardUserGroup blockName={BlockWithPermission.UsageData}>
          <RequestsBannerContainer timeframe={timeframe} />
        </GuardUserGroup>
      )}
      <JwtTokenManager />
      <UpgradePlanDialog onClose={onClose} open={isOpened} type={type} />
    </>
  );
};
