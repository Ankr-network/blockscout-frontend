/* eslint-disable no-console */
import BigNumber from 'bignumber.js';
import { SlotAuctionSdk } from './slot-auction';
import { ContractManager } from './contract';

class TestSlotAuctionSdk extends SlotAuctionSdk {
  static createRemarkPayload(
    ethereumAddress: string,
    amount: BigNumber,
  ): Uint8Array {
    return SlotAuctionSdk.createRemarkPayload(ethereumAddress, amount);
  }
}

class TestContractManager extends ContractManager {
  static extractAddressIntoHex(address: string): string {
    return ContractManager.extractAddressIntoHex(address);
  }
}

describe('Test: SlotAuctionSdk', (): void => {
  describe('Case: onchain claim', (): void => {
    it('Ethereum and ss58 addresses extracted properly', () => {
      expect(
        TestContractManager.extractAddressIntoHex(
          '0x2aD7e656c24A96BFA02AfAFadc87c428df78f603',
        ),
      ).toStrictEqual('2ad7e656c24a96bfa02afafadc87c428df78f603');
      expect(
        TestContractManager.extractAddressIntoHex(
          '2aD7e656c24A96BFA02AfAFadc87c428df78f603',
        ),
      ).toStrictEqual('2ad7e656c24a96bfa02afafadc87c428df78f603');
      expect(
        TestContractManager.extractAddressIntoHex(
          '5Ei1Lrqyt9mkDnSsW2zD6jU3HKiLbdaooKjv8av4KGFseH97',
        ),
      ).toStrictEqual(
        '74eb6902449cf185aaaef799c0dba20ddf3be3a6e2f4592d5bb6cea33d0e3833',
      );
    });

    it('Remark payload composed correctly', () => {
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
