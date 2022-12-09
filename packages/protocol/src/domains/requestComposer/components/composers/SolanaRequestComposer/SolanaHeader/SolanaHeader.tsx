import { BlockNumber } from '../../../Header/BlockNumber';
import { ChainID } from 'modules/chains/types';
import { Header } from '../../../Header';
import { useLastBlockNumber } from './hooks/useLastBlockNumber';

export interface SolanaHeaderProps {
  publicUrl?: string;
}

export const SolanaHeader = ({ publicUrl }: SolanaHeaderProps) => {
  const [lastBlockNumber, loading] = useLastBlockNumber(publicUrl);

  return (
    <Header chainName={ChainID.SOLANA}>
      <BlockNumber<number> data={lastBlockNumber} loading={loading} />
    </Header>
  );
};
