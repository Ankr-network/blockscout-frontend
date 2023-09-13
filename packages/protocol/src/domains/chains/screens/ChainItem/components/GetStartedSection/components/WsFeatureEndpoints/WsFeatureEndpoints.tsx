import { EndpointGroup } from 'modules/endpoints/types';
import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { useIsEnterpriseRoute } from 'modules/common/hooks/useIsEnterpriseRoute';

import { EndpointsHeader } from '../EndpointsHeader';
import { WSEndpoints } from '../WSEndpoints';
import { EndpointPlaceholder } from '../EndpointPlaceholder';
import { useWsFeatureEndpoints } from './useWsFeatureEndpoints';

interface IWsFeatureEndpointsProps {
  title: string;
  group: EndpointGroup;
  hasPremium: boolean;
  hasConnectWalletMessage: boolean;
  onCopyEndpoint: (endpointUrl: string) => void;
}

export const WsFeatureEndpoints = ({
  group,
  title,
  hasPremium,
  hasConnectWalletMessage,
  onCopyEndpoint,
}: IWsFeatureEndpointsProps) => {
  const { isEnterpriseRoute } = useIsEnterpriseRoute();
  const { hasWSFeature, wss, enterpriseWss } = useWsFeatureEndpoints(group);
  const { isOpened, onOpen, onClose } = useUpgradePlanDialog();

  const hasAccessToGroupWs = useGuardUserGroup({
    blockName: BlockWithPermission.UpgradePlan,
  });

  if (!hasWSFeature || (!hasPremium && !hasAccessToGroupWs)) return null;

  return (
    <>
      {hasPremium ? (
        <WSEndpoints
          title={<EndpointsHeader title={title} />}
          wss={isEnterpriseRoute ? enterpriseWss : wss}
          hasConnectWalletMessage={hasConnectWalletMessage}
          onCopyEndpoint={onCopyEndpoint}
        />
      ) : (
        <>
          <EndpointPlaceholder
            title={<EndpointsHeader title={title} />}
            onClick={onOpen}
          />
          <UpgradePlanDialog open={isOpened} onClose={onClose} />
        </>
      )}
    </>
  );
};
