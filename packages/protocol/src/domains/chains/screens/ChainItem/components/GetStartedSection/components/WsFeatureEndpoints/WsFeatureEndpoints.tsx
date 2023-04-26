import { EndpointGroup } from 'modules/endpoints/types';
import { EndpointsHeader } from '../EndpointsHeader';
import { WSEndpoints } from '../WSEndpoints';
import { EndpointPlaceholder } from '../EndpointPlaceholder';
import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { useWsFeatureEndpoints } from './useWsFeatureEndpoints';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';

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
  const { hasWSFeature, wss } = useWsFeatureEndpoints(group);
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
