import { AvailableTokens } from 'modules/trading-cockpit/types';
import { StakeSuccessDialog } from '.';

export const StakeSuccessfulExample = () => {
  return <StakeSuccessDialog isOpened token={AvailableTokens.aMATICb} />;
};

export default {
  title: 'modules/stake/components/StakeSuccessful',
};
