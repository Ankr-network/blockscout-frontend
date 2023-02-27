import { EndpointGroup } from 'modules/endpoints/types';
import { EndpointsHeader } from '../EndpointsHeader';
import { WSEndpoints } from '../WSEndpoints';
import { WSPlaceHolder } from '../WSPlaceHolder';
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
  const { hasWsFeature, wss } = useWsFeatureEndpoints(group);

  if (!hasWsFeature) return null;

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
        <WSPlaceHolder title={<EndpointsHeader title={title} />} />
      )}
    </>
  );
};
