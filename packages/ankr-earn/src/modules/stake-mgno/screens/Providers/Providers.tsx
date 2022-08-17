import { ProviderStats } from 'modules/delegate-stake/components/ProviderStats';
import { Section } from 'modules/delegate-stake/components/Section';
import { Header } from 'modules/stake-mgno/components/Header';

import { Table } from './components/Table';
import { useStatsData } from './hooks/useStatsData';

export const Providers = (): JSX.Element => {
  const { highestAPY, tvl, lockingPeriod, rewards24h, rewards30d } =
    useStatsData();

  return (
    <Section>
      <Header />

      <ProviderStats
        highestAPY={highestAPY}
        lockingPeriod={lockingPeriod}
        rewards24h={rewards24h}
        rewards30d={rewards30d}
        tvl={tvl}
      />

      <Table />
    </Section>
  );
};
