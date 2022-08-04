import { Section } from 'modules/delegate-stake/components/Section';
import { Header } from 'modules/stake-ankr/components/Header';

import { EmptyState } from './components/EmptyState';
import { StakingInfo } from './components/StakingInfo';
import { TotalInfo } from './components/TotalInfo';
import { useHistoryData } from './hooks/useHistoryData';

export const Main = (): JSX.Element => {
  const { data } = useHistoryData();

  const isEmpty = !data;

  return (
    <Section>
      <Header />

      <TotalInfo />

      {!isEmpty && <StakingInfo />}

      {isEmpty && <EmptyState />}
    </Section>
  );
};
