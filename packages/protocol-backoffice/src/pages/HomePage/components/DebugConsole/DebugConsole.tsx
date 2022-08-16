import { Button } from 'antd';
import BigNumber from 'bignumber.js';
import { observer } from 'mobx-react';
import { useCallback } from 'react';

import { useMultiRpcSdk } from 'stores';

export const DebugConsole = observer(() => {
  const sdk = useMultiRpcSdk();

  const onFaucetTokens = useCallback(async () => {
    const skd = useMultiRpcSdk();

    await skd.getPremiumPlanContractManager().faucetAnkrTokensForTest();
  }, []);

  const onDeposit = useCallback(async () => {
    const newSdk = useMultiRpcSdk();

    try {
      const { deposit } = await newSdk
        .getPremiumPlanContractManager()
        .depositAnkrToWallet(new BigNumber('10000'));
      // eslint-disable-next-line no-console
      console.log(await deposit.receiptPromise);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  }, []);

  const onIssueJwt = useCallback(async () => {
    // eslint-disable-next-line no-alert
    const transactionHash = prompt('Input transaction hash of your deposit: ');
    if (!transactionHash) return;

    const [thresholdKeys] = await sdk
      .getConsensusGateway()
      .getThresholdKeys(0, 1, {
        name: 'MultiRPC',
      });
    // eslint-disable-next-line no-console
    console.log(thresholdKeys);

    if (!thresholdKeys.length) {
      // eslint-disable-next-line no-alert
      alert(`There is no threshold keys available`);
    }

    const jwtToken = await sdk.issueJwtToken(
      transactionHash,
      thresholdKeys[0].id,
    );
    // eslint-disable-next-line no-console
    console.log(jwtToken);

    const rawHash = await crypto.subtle.digest(
      { name: 'SHA-256' },
      new TextEncoder().encode(jwtToken.signed_token),
    );
    const uniqueKey = Buffer.from(new Uint8Array(rawHash)).toString('hex');
    // eslint-disable-next-line no-console
    console.log(`https://beta2.multi-rpc.com/eth/${uniqueKey}`);
    // eslint-disable-next-line no-alert
    alert(`Your unique URL is: https://beta2.multi-rpc.com/eth/${uniqueKey}`);
  }, [sdk]);

  return (
    <div>
      <br />
      <Button onClick={onFaucetTokens}>Faucet</Button>
      <br />
      <Button onClick={onDeposit}>Deposit</Button>
      <br />
      <Button onClick={onIssueJwt}>Issue JWT</Button>
      <br />
    </div>
  );
});
