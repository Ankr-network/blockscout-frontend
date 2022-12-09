import { ChainGroupID } from 'modules/endpoints/types';
import { IRequestComposerMainProps } from '../RequestComposerTypes';
import { CChainRequestComposer } from './CChainRequestComposer';
import { PChainRequestComposer } from './PChainRequestComposer';
import { XChainRequestComposer } from './XChainRequestComposer';

export const AvalancheRequestComposer = ({
  group,
  className,
}: IRequestComposerMainProps) => {
  switch (group.id) {
    case ChainGroupID.C_CHAIN:
      return <CChainRequestComposer group={group} className={className} />;

    case ChainGroupID.P_CHAIN:
      return <PChainRequestComposer group={group} className={className} />;

    case ChainGroupID.X_CHAIN:
      return <XChainRequestComposer group={group} className={className} />;

    default:
      return null;
  }
};
