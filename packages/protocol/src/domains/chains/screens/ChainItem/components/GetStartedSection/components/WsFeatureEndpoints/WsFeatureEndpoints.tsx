import { EndpointGroup } from 'modules/endpoints/types';
import { EndpointsHeader } from '../EndpointsHeader';
import { WSEndpoints } from '../WSEndpoints';
import { EndpointPlaceholder } from '../EndpointPlaceholder';
import { useWsFeatureEndpoints } from './useWsFeatureEndpoints';
import { useDialog } from 'modules/common/hooks/useDialog';
import { PremiumChainDialog } from 'domains/chains/components/PremiumChainDialog';
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
  const { hasWsFeature, wss } = useWsFeatureEndpoints(group);
  const { isOpened, onOpen, onClose } = useDialog();

  const hasAccessToGroupWs = useGuardUserGroup({
    blockName: BlockWithPermission.UpgradePlan,
  });

  if (!hasWsFeature || (!hasPremium && !hasAccessToGroupWs)) return null;

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
          <PremiumChainDialog open={isOpened} onClose={onClose} />
        </>
      )}
    </>
  );
};
