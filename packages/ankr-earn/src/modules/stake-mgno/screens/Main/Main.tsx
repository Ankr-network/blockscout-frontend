import { Section } from 'modules/delegate-stake/components/Section';
import { Header } from 'modules/stake-mgno/components/Header';
import { TotalInfo } from 'modules/stake-mgno/components/TotalInfo';

import { StakingInfo } from './components/StakingInfo';

export const Main = (): JSX.Element => {
  return (
    <Section>
      <Header />

      <TotalInfo />

      <StakingInfo />
    </Section>
  );
};
