import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { QueryError } from 'uiKit/QueryError';

import { useStakeForm } from './hooks/useStakeForm';
import { useStakeStyles } from './useStakeStyles';

export const Stake = (): JSX.Element => {
  const classes = useStakeStyles();

  const { getStakeDataError, isStakeDataError } = useStakeForm();

  return (
    <section className={classes.root}>
      {isStakeDataError && (
        <StakeContainer>
          <QueryError error={getStakeDataError} />
        </StakeContainer>
      )}

      {!isStakeDataError && <StakeContainer>Stake</StakeContainer>}
    </section>
  );
};
