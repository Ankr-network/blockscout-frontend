import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';

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
  const { isOpened, onClose, onOpen } = useUpgradePlanDialog();

  const hasAccessToGroupWs = useGuardUserGroup({
    blockName: BlockWithPermission.UpgradePlan,
  });

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
            title={<EndpointsHeader title={title} />}
            onClick={onOpen}
          />
          <UpgradePlanDialog open={isOpened} onClose={onClose} />
        </>
      )}
    </>
  );
};
