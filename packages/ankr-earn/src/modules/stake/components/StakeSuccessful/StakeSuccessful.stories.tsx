import { StakeSuccessful } from '.';
import { AvailableTokens } from 'modules/trading-cockpit/types';

export const StakeSuccessfulExample = () => {
  return (
    <StakeSuccessful
      stakeHref={'/'}
      token={AvailableTokens.aMATICb}
    ></StakeSuccessful>
  );
};

export default {
  title: 'modules/stake/components/StakeSuccessful',
};
