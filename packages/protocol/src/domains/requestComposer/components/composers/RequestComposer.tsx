import { ChainID } from 'modules/chains/types';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';

import { AvalancheRequestComposer } from './AvalancheRequestComposer';
import { EVMRequestComposer } from './EVMRequestComposer';
import { HarmonyRequestComposer } from './HarmonyRequestComposer';
import { SolanaRequestComposer } from './SolanaRequestComposer';
import { TronRequestComposer } from './TronRequestComposer';
import { NearRequestComposer } from './NearRequestComposer';
import { IRequestComposerProps } from './RequestComposerTypes';

export const RequestComposer = ({
  group,
  publicUrl,
  chainId,
  className,
}: IRequestComposerProps) => {
  if (isGroupEvmBased(group)) {
    if (chainId === ChainID.HARMONY) {
      return (
        <HarmonyRequestComposer
          group={group}
          publicUrl={publicUrl}
          className={className}
        />
      );
    }

    return (
      <EVMRequestComposer
        group={group}
        publicUrl={publicUrl}
        className={className}
      />
    );
  }

  if (chainId === ChainID.AVALANCHE) {
    return <AvalancheRequestComposer group={group} className={className} />;
  }

  if (chainId === ChainID.NEAR) {
    return (
      <NearRequestComposer
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

  if (chainId === ChainID.SOLANA) {
    return (
      <SolanaRequestComposer
        className={className}
        group={group}
        publicUrl={publicUrl}
      />
    );
  }

  return null;
};
