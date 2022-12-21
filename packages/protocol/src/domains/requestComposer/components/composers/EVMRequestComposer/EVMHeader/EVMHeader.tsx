import { useEffect } from 'react';

import { BlockNumber } from '../../../Header/BlockNumber';
import { Header } from '../../../Header';
import { chainsFetchLastBlockNumber } from 'domains/requestComposer/actions/fetchLastBlockNumber';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export interface HeaderProps {
  publicUrl?: string;
}

export const EVMHeader = ({ publicUrl }: HeaderProps) => {
  const [fetchLastBlockNumber, { data, isLoading }, reset] = useQueryEndpoint(
    chainsFetchLastBlockNumber,
  );

  useEffect(() => reset, [reset]);

  useEffect(() => {
    if (publicUrl) {
      fetchLastBlockNumber(publicUrl);
    }
  }, [fetchLastBlockNumber, publicUrl]);

  return (
    <Header>
      <BlockNumber data={data} loading={isLoading} />
    </Header>
  );
};
