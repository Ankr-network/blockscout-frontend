import { CChainRequestComposer } from './CChainRequestComposer';
import { ChainGroupID } from 'modules/endpoints/types';
import { IRequestComposerMainProps } from '../RequestComposerTypes';
import { PChainRequestComposer } from './PChainRequestComposer';
import { XChainRequestComposer } from './XChainRequestComposer';

export const AvalancheRequestComposer = ({
  className,
  group,
  hasRequestHistory,
  hasTitle,
}: IRequestComposerMainProps) => {
  switch (group.id) {
    case ChainGroupID.C_CHAIN:
      return (
        <CChainRequestComposer
          className={className}
          group={group}
          hasRequestHistory={hasRequestHistory}
          hasTitle={hasTitle}
        />
      );

    case ChainGroupID.P_CHAIN:
      return (
        <PChainRequestComposer
          className={className}
          group={group}
          hasRequestHistory={hasRequestHistory}
          hasTitle={hasTitle}
        />
      );

    case ChainGroupID.X_CHAIN:
      return (
        <XChainRequestComposer
          className={className}
          group={group}
          hasRequestHistory={hasRequestHistory}
          hasTitle={hasTitle}
        />
      );

    default:
      return null;
  }
};
