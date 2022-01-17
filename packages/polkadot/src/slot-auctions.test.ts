import BigNumber from 'bignumber.js';
import { SlotAuctionSdk } from './slot-auction';

class TestSlotAuctionSdk extends SlotAuctionSdk {
  static createRemarkPayload(
    ethereumAddress: string,
    amount: BigNumber,
  ): Uint8Array {
    return SlotAuctionSdk.createRemarkPayload(ethereumAddress, amount);
  }
}

describe('Test: SlotAuctionSdk', (): void => {
  describe('Case: onchain claim', (): void => {
    it('Remark payload composed correctly', (): void => {
      const payload: Buffer = Buffer.from(
        TestSlotAuctionSdk.createRemarkPayload(
          '0x527e4403255053669cE5f5C1124480fe46138de2',
          new BigNumber('123'),
        ),
      );

      // eslint-disable-next-line no-buffer-constructor
      const prefix: Buffer = new Buffer(
        'Stakefi Signed Message:\nCreateClaim\n',
        'ascii',
      );

      expect(payload.slice(0, prefix.length)).toStrictEqual(prefix);
      expect(payload.length).toStrictEqual(prefix.length + 20 + 1 + 16);

      const amount: string = payload
        .slice(prefix.length + 20 + 1)
        .toString('hex');

      expect(new BigNumber(amount, 16)).toStrictEqual(new BigNumber('123'));
    });
  });
});
