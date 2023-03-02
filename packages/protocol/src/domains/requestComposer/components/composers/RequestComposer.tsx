import { AvalancheRequestComposer } from './AvalancheRequestComposer';
import { ChainID } from 'modules/chains/types';
import { EVMRequestComposer } from './EVMRequestComposer';
import { HarmonyRequestComposer } from './HarmonyRequestComposer';
import { IRequestComposerProps } from './RequestComposerTypes';
import { NearRequestComposer } from './NearRequestComposer';
import { SolanaRequestComposer } from './SolanaRequestComposer';
import { TronRequestComposer } from './TronRequestComposer';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';

export const RequestComposer = ({
  chainId,
  className,
  group,
  hasBlockNumber = true,
  hasRequestHistory,
  hasTitle = true,
  publicUrl,
}: IRequestComposerProps) => {
  if (isGroupEvmBased(group)) {
    if (chainId === ChainID.HARMONY) {
      return (
        <HarmonyRequestComposer
          className={className}
          group={group}
          hasBlockNumber={hasBlockNumber}
          hasRequestHistory={hasRequestHistory}
          hasTitle={hasTitle}
          publicUrl={publicUrl}
        />
      );
    }

    return (
      <EVMRequestComposer
        chainId={chainId}
        className={className}
        group={group}
        hasBlockNumber={hasBlockNumber}
        hasRequestHistory={hasRequestHistory}
        hasTitle={hasTitle}
        publicUrl={publicUrl}
      />
    );
  }

  if (chainId === ChainID.AVALANCHE) {
    return (
      <AvalancheRequestComposer
        className={className}
        group={group}
        hasBlockNumber={hasBlockNumber}
        hasRequestHistory={hasRequestHistory}
        hasTitle={hasTitle}
      />
    );
  }

  if (chainId === ChainID.NEAR) {
    return (
      <NearRequestComposer
        className={className}
        group={group}
        hasBlockNumber={hasBlockNumber}
        hasRequestHistory={hasRequestHistory}
        hasTitle={hasTitle}
        publicUrl={publicUrl}
      />
    );
  }

  if (chainId === ChainID.TRON) {
    return (
      <TronRequestComposer
        className={className}
        group={group}
        hasBlockNumber={hasBlockNumber}
        hasRequestHistory={hasRequestHistory}
        hasTitle={hasTitle}
        publicUrl={publicUrl}
      />
    );
  }

  if (chainId === ChainID.SOLANA) {
    return (
      <SolanaRequestComposer
        className={className}
        group={group}
        hasBlockNumber={hasBlockNumber}
        hasRequestHistory={hasRequestHistory}
        hasTitle={hasTitle}
        publicUrl={publicUrl}
      />
    );
  }

  return null;
};
