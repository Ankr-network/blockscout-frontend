import { Token } from 'modules/common/types/token';

import { StakeSuccessDialog } from '.';

export const StakeSuccessfulExample = (): JSX.Element => {
  return <StakeSuccessDialog tokenName={Token.aMATICb} />;
};

export default {
  title: 'modules/stake/components/StakeSuccessful',
};
