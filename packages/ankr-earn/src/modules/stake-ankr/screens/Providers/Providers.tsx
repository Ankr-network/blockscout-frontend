import { Header } from 'modules/stake-ankr/components/Header';
import { Section } from 'modules/stake-ankr/components/Section';

import { Stats } from './components/Stats';
import { Table } from './components/Table';

export const Providers = (): JSX.Element => {
  return (
    <Section>
      <Header />

      <Stats />

      <Table />
    </Section>
  );
};
