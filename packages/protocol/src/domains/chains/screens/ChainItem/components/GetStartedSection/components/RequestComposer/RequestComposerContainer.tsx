import { ChainID } from 'modules/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';
import { AvalancheRequestComposer } from './AvalancheRequestComposer';
import { EVMRequestComposer } from './EVMRequestComposer';
import { TronRequestComposer } from './TronRequestComposer';

interface IRequestComposerContainerProps {
  group: EndpointGroup;
  unfilteredGroup: EndpointGroup;
  chainId: string;
  className?: string;
}

export const RequestComposerContainer = ({
  group,
  unfilteredGroup,
  chainId,
  className,
}: IRequestComposerContainerProps) => {
  const publicUrl = unfilteredGroup?.urls[0]?.rpc;

  if (isGroupEvmBased(group)) {
    return (
      <EVMRequestComposer
        group={group}
        publicUrl={publicUrl}
        className={className}
      />
    );
  }

  if (chainId === ChainID.AVALANCHE) {
    return (
      <AvalancheRequestComposer
        group={group}
        publicUrl={publicUrl}
        className={className}
      />
    );
  }

  if (chainId === ChainID.TRON) {
    return (
      <TronRequestComposer
        group={group}
        publicUrl={publicUrl}
        className={className}
      />
    );
  }

  return null;
};
