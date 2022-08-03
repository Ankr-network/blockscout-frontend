import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { Section } from 'modules/delegate-stake/components/Section';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getAPY } from 'modules/stake-ankr/actions/getAPY';
import { Header } from 'modules/stake-ankr/components/Header';
import { useAppDispatch } from 'store/useAppDispatch';

import { EmptyState } from './components/EmptyState';
import { StakingInfo } from './components/StakingInfo';
import { TotalInfo } from './components/TotalInfo';
import { useHistoryData } from './hooks/useHistoryData';

export const Main = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { data } = useHistoryData();

  useProviderEffect(() => {
    dispatch(getAPY());
    dispatch(getANKRPrice());
  }, [dispatch]);

  const isEmpty = !data || !data.length;

  return (
    <Section>
      <Header />

      <TotalInfo />

      {!isEmpty && <StakingInfo />}

      {isEmpty && <EmptyState />}
    </Section>
  );
};
