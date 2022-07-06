import { useState } from 'react';

import { Header } from 'modules/stake-ankr/components/Header';
import { Section } from 'modules/stake-ankr/components/Section';
import { EProviderStatus } from 'modules/stake-ankr/const';

import { ProviderInfo } from '../ProviderInfo';

import { EmptyState } from './components/EmptyState';
import { StakingInfo } from './components/StakingInfo';
import { TotalInfo } from './components/TotalInfo';

export const Main = (): JSX.Element => {
  const [isEmpty] = useState<boolean>(false);

  return (
    <Section>
      <ProviderInfo
        addressLink="addressLink"
        discordLink="discordLink"
        providerAddress="0x0a9sa9ad0adskkl214km1asdkalsda0s9d80"
        providerName="Provider Name"
        stakeLink="stakeLink"
        status={EProviderStatus.active}
        telegramLink="telegramLink"
      />

      <Header />

      <TotalInfo />

      {!isEmpty && <StakingInfo />}

      {isEmpty && <EmptyState />}
    </Section>
  );
};
