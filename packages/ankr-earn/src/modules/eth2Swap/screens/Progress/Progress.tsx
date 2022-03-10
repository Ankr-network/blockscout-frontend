import BigNumber from 'bignumber.js';

import { ProgressStep } from 'modules/common/components/ProgressStep';

// TODO: add route after component is ready
export const Progress = (): JSX.Element => {
  return (
    <ProgressStep
      amount={new BigNumber(20)}
      buttonTitle="Add aMATICb to wallet"
      destinationAddress="0x9e32b13ce7f2e80a01932b42553652e053d6ed8e"
      hint="This may take a moment; you can close this window. Once completed you can check out your new aETHb exposure on the Ankr Earn Dashboard."
      isPending={false}
      symbol="aETHb"
      title="Switch"
      txHash="0x9202e6ea97a082435438a43de85df3f5dce7a399d82bc81f5ac667833c71243f"
      onAddTokenToWallet={() => null}
    />
  );
};
