import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { CChainRequestComposer } from './CChainRequestComposer';

export interface IRequestComposerProps {
  group: EndpointGroup;
  publicUrl: string;
  className?: string;
}

export const AvalancheRequestComposer = ({
  group,
  // eslint-disable-next-line
  publicUrl: _publicUrl,
  className,
}: IRequestComposerProps) => {
  switch (group.id) {
    case ChainGroupID.C_CHAIN:
      return <CChainRequestComposer group={group} className={className} />;

    default:
      return null;
  }
};
