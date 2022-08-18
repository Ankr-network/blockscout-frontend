import { ProviderStats } from 'modules/delegate-stake/components/ProviderStats';
import { Section } from 'modules/delegate-stake/components/Section';
import { Header } from 'modules/stake-ankr/components/Header';

import { Table } from './components/Table';
import { useStatsData } from './hooks/useStatsData';

export const Providers = (): JSX.Element => {
  const {
    apyLoading,
    highestAPY,
    tvl,
    lockingPeriod,
    rewards24h,
    rewards30d,
    statsLoading,
  } = useStatsData();

  return (
    <Section>
      <Header />

      <ProviderStats
        apyLoading={apyLoading}
        highestAPY={highestAPY}
        lockingPeriod={lockingPeriod}
        rewards24h={rewards24h}
        rewards30d={rewards30d}
        statsLoading={statsLoading}
        tvl={tvl}
      />

      <Table />
    </Section>
  );
};
