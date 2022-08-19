import { useDispatchRequest } from '@redux-requests/react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { getStats } from 'modules/stake-matic/polygon/actions/getStats';
import { StakeContainer } from 'modules/stake/components/StakeContainer';

import { useStakeForm } from './hooks/useStakeForm';
import { useStakeStyles } from './useStakeStyles';

export const Stake = (): JSX.Element => {
  const classes = useStakeStyles();
  const dispatchRequest = useDispatchRequest();

  const { getStatsData } = useStakeForm();

  useProviderEffect(() => {
    dispatchRequest(getStats());
  }, [dispatchRequest]);

  return (
    <section className={classes.root}>
      <StakeContainer>
        <div>Stake</div>

        <div>{getStatsData !== null && JSON.stringify(getStatsData)}</div>
      </StakeContainer>
    </section>
  );
};
