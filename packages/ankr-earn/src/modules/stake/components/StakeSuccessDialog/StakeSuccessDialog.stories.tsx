import { Token } from 'modules/common/types/token';
import { StakeSuccessDialog } from '.';

export const StakeSuccessfulExample = () => {
  return <StakeSuccessDialog tokenName={Token.aMATICb} />;
};

export default {
  title: 'modules/stake/components/StakeSuccessful',
};
