import { EndpointGroup } from 'modules/endpoints/types';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';
import { EVMRequestComposer } from './EVMRequestComposer';

interface IRequestComposerContainerProps {
  group: EndpointGroup;
  unfilteredGroup: EndpointGroup;
  chainId: string;
  className?: string;
}

export const RequestComposerContainer = ({
  group,
  unfilteredGroup,
  // eslint-disable-next-line
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

  // use chainId here

  return null;
};
