import { useState } from 'react';

import { Header } from 'modules/stake-ankr/components/Header';
import { Section } from 'modules/stake-ankr/components/Section';

import { EmptyState } from './components/EmptyState';
import { StakingInfo } from './components/StakingInfo';
import { TotalInfo } from './components/TotalInfo';

export const Main = (): JSX.Element => {
  const [isEmpty] = useState<boolean>(false);

  return (
    <Section>
      <Header />

      <TotalInfo />

      {!isEmpty && <StakingInfo />}

      {isEmpty && <EmptyState />}
    </Section>
  );
};
