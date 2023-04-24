import { BlockNumber } from '../../../Header/BlockNumber';
import { ChainID } from 'domains/chains/types';
import { Header } from '../../../Header';
import { useLastBlockNumber } from './hooks/useLastBlockNumber';

export interface SolanaHeaderProps {
  hasBlockNumber?: boolean;
  hasTitle?: boolean;
  publicUrl?: string;
}

export const SolanaHeader = ({
  hasBlockNumber,
  hasTitle,
  publicUrl,
}: SolanaHeaderProps) => {
  const [lastBlockNumber, loading] = useLastBlockNumber({
    hasBlockNumber,
    publicUrl,
  });

  return (
    <Header chainName={ChainID.SOLANA} hasTitle={hasTitle}>
      {hasBlockNumber && (
        <BlockNumber<number> data={lastBlockNumber} loading={loading} />
      )}
    </Header>
  );
};
