import { Section } from './components/Section';
import { Yield } from './components/Yield';

const DEMO = {
  totalUSD: 350_000,
  apy: 9.3,
};

export const Main = (): JSX.Element => {
  return (
    <Section>
      <Yield apy={DEMO.apy} totalUsd={DEMO.totalUSD} />
    </Section>
  );
};
