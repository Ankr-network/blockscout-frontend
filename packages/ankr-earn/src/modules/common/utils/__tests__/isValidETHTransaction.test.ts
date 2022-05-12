import { isValidETHTransaction } from '../isValidETHTransaction';

const VALID_TRANSACTIONS: string[] = [
  '0x5d62f317e49ddd41a29a9c52efd763b396f66a7874afcca44338deaa5f7118e6',
  '0xcacda64cc882c4da56a2249e8955a9e7727c8a36408be3f7df1db6d5014d5597',
];

const INVALID_TRANSACTIONS: string[] = [
  'cacda64cc882c4da56a2249e8955a9e7727c8a36408be3f7df1db6d5014d5597',
  '',
  '0xcacda64cc882c4da56a2249e8955a9e7727c8a36408be3f7df1db6d5014d5597987',
  'cacda64cc882c4da56a2249e8955a9e7727c8a36408be3f7df1db6d5014d5597',
];

describe('modules/common/utils/isValidETHTransaction', () => {
  it('Case 1: Valid transactions', () => {
    VALID_TRANSACTIONS.forEach((address: string): void => {
      expect(isValidETHTransaction(address)).toBeTruthy();
    });
  });

  it('Case 2: Invalid transactions', () => {
    INVALID_TRANSACTIONS.forEach((address: string): void => {
      expect(isValidETHTransaction(address)).toBeFalsy();
    });
  });
});
