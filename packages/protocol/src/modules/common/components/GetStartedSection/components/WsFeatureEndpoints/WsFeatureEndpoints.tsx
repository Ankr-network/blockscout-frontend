import { t } from '@ankr.com/common';

import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { useDialog } from 'modules/common/hooks/useDialog';
import { UpgradeToPremiumPlanDialog } from 'modules/common/components/UpgradeToPremiumPlanDialog';

import { EndpointsHeader } from '../EndpointsHeader';
import { WSEndpoints } from '../WSEndpoints';
import { EndpointPlaceholder } from '../EndpointPlaceholder';

interface IWsFeatureEndpointsProps {
  title: string;
  hasWSFeature: boolean;
  wss: string[];
  hasPremium: boolean;
  hasConnectWalletMessage: boolean;
  onCopyEndpoint: (endpointUrl: string) => void;
}

export const WsFeatureEndpoints = ({
  hasConnectWalletMessage,
  hasPremium,
  hasWSFeature,
  onCopyEndpoint,
  title,
  wss,
}: IWsFeatureEndpointsProps) => {
  const hasAccessToGroupWs = useGuardUserGroup({
    blockName: BlockWithPermission.UpgradePlan,
  });

  const {
    isOpened: isPromoDialogOpened,
    onClose: onPromoDialogClose,
    onOpen: onPromoDialogOpen,
  } = useDialog();

  if (!hasWSFeature || (!hasPremium && !hasAccessToGroupWs)) return null;

  return (
    <>
      {hasPremium ? (
        <WSEndpoints
          title={<EndpointsHeader title={title} />}
          wss={wss}
          hasConnectWalletMessage={hasConnectWalletMessage}
          onCopyEndpoint={onCopyEndpoint}
        />
      ) : (
        <>
          <EndpointPlaceholder
            lockedLabel={t('chain-item.get-started.endpoints.lockedLabelWss')}
            title={<EndpointsHeader title={title} />}
            onClick={onPromoDialogOpen}
          />
          <UpgradeToPremiumPlanDialog
            isPromoDialogOpened={isPromoDialogOpened}
            onPromoDialogClose={onPromoDialogClose}
          />
        </>
      )}
    </>
  );
};
