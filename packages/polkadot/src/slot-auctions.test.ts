import BigNumber from 'bignumber.js';
import { PolkadotProvider } from './polkadot';

describe('Test: SlotAuctionSdk', (): void => {
  describe('Case: onchain claim', (): void => {
    it('Remark payload composed correctly', (): void => {
      const payload: Buffer = Buffer.from(
        PolkadotProvider.getClaimTransactionPayload(
          '0x527e4403255053669cE5f5C1124480fe46138de2',
          2000,
          new BigNumber('123'),
        ),
      );

      // eslint-disable-next-line no-buffer-constructor
      const prefix: Buffer = new Buffer(
        'Stakefi Signed Message:\nCreateClaim\n',
        'ascii',
      );

      expect(payload.slice(0, prefix.length)).toStrictEqual(prefix);
      expect(payload.length).toStrictEqual(prefix.length + 20 + 1 + 4 + 1 + 16);

      const amount: string = payload
        .slice(prefix.length + 20 + 1 + 4 + 1)
        .toString('hex');

      const loanId: string = payload
        .slice(prefix.length + 20 + 1, prefix.length + 20 + 1 + 4)
        .toString('hex');

      expect(new BigNumber(amount, 16)).toStrictEqual(new BigNumber('123'));
      expect(new BigNumber(loanId, 16)).toStrictEqual(new BigNumber('2000'));
    });
  });
});
