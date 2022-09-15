import { ProviderStats } from 'modules/delegate-stake/components/ProviderStats';
import { Section } from 'modules/delegate-stake/components/Section';
import { Header } from 'modules/stake-mgno/components/Header';

import { Table } from './components/Table';
import { useStatsData } from './hooks/useStatsData';

export const Providers = (): JSX.Element => {
  const { apyLoading, highestAPY, tvl, statsLoading } = useStatsData();

  return (
    <Section>
      <Header />

      <ProviderStats
        apyLoading={apyLoading}
        highestAPY={highestAPY}
        statsLoading={statsLoading}
        tvl={tvl}
      />

      <Table />
    </Section>
  );
};
