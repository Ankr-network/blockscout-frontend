import { Section } from 'modules/delegate-stake/components/Section';
import { Header } from 'modules/stake-mgno/components/Header';
import { TotalInfo } from 'modules/stake-mgno/components/TotalInfo';

export const Main = (): JSX.Element => {
  return (
    <Section>
      <Header />

      <TotalInfo />
    </Section>
  );
};
