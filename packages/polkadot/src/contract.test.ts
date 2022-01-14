import { ContractManager } from './contract';

class TestContractManager extends ContractManager {
  static extractAddressIntoHex(address: string): string {
    return ContractManager.extractAddressIntoHex(address);
  }
}

describe('Test: ContractManager', (): void => {
  it('Ethereum and ss58 addresses extracted properly', (): void => {
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
});
