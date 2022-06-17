import { Header } from 'modules/stake-ankr/components/Header';
import { Section } from 'modules/stake-ankr/components/Section';

import { TotalInfo } from './components/TotalInfo';

export const Main = (): JSX.Element => {
  return (
    <Section>
      <Header />

      <TotalInfo />
    </Section>
  );
};
