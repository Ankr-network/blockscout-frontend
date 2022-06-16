import { ApiPromise, WsProvider } from '@polkadot/api';
import { u8aToHex } from '@polkadot/util';
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

    it('Encodes system.remark call', async () => {
      const provider = new WsProvider('wss://rpc.polkadot.io');
      const api = await ApiPromise.create({ provider });
      const data = new Uint8Array([
        83, 116, 97, 107, 101, 102, 105, 32, 83, 105, 103, 110, 101, 100, 32,
        77, 101, 115, 115, 97, 103, 101, 58, 10, 67, 114, 101, 97, 116, 101, 67,
        108, 97, 105, 109, 10, 16, 13, 214, 194, 116, 84, 203, 29, 173, 209, 57,
        18, 20, 163, 68, 198, 32, 138, 140, 128, 10, 0, 0, 7, 215, 10, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 23, 72, 118, 232, 0,
      ]);
      const call = api.tx.system.remark(u8aToHex(data));
      expect(call.toHex()).toStrictEqual(
        '0x4d0104000139015374616b656669205369676e6564204d6573736167653a0a437265617465436c61696d0a100dd6c27454cb1dadd1391214a344c6208a8c800a000007d70a0000000000000000000000174876e800',
      );
    });
  });
});
