import { PolkadotProvider } from './polkadot';

const VALID_ADDRESSES: string[] = [
  '5Ei1Lrqyt9mkDnSsW2zD6jU3HKiLbdaooKjv8av4KGFseH97',
];

const INVALID_ADDRESSES: string[] = [
  '527e4403255053669cE5f5C1124480fe46138de2',
  '0x527e4403255053669cE5f5C1124480fe46138de2',
  '5Ei1Lrqyt9mkDnSsW2zD6jU3HKiLbdaooKjv8av4KGFseH970',
  '1Ei1Lrqyt9mkDnSsW2zD6jU3HKiLbdaooKjv8av4KGFseH97',
];

describe('Test: PolkadotProvider', (): void => {
  describe('Method: isValidAddress', (): void => {
    it('Case 1: Is valid address', (): void => {
      VALID_ADDRESSES.forEach((address: string): void => {
        expect(PolkadotProvider.isValidAddress(address)).toBeTruthy();
      });
    });

    it('Case 2: Is invalid address', (): void => {
      INVALID_ADDRESSES.forEach((address: string): void => {
        expect(PolkadotProvider.isValidAddress(address)).toBeFalsy();
      });
    });
  });
});
