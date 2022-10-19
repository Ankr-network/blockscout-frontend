import { BlockNumber } from '../../components/Header/BlockNumber';
import { ChainID } from 'modules/chains/types';
import { Header } from '../../components/Header';
import { useLastBlockNumber } from './hooks/useLastBlockNumber';

export interface SolanaHeaderProps {
  url: string;
}

export const SolanaHeader = ({ url }: SolanaHeaderProps) => {
  const [lastBlockNumber, loading] = useLastBlockNumber(url);

  return (
    <Header chainName={ChainID.SOLANA}>
      <BlockNumber<number> data={lastBlockNumber} loading={loading} />
    </Header>
  );
};
