import { stringify } from './stringify';

describe('stringify', () => {
  it('Object to query', () => {
    expect(
      stringify({
        amount: '0.1',
        chainIdFrom: 5,
        chainIdTo: 97,
        token: 'aMATICb',
        tx: '0x1ebc057edf0f54cdc552756314e1bf1df3053521ed913b3a9964afd24bd3e855',
      }),
    ).toBe(
      'amount=0.1&chainIdFrom=5&chainIdTo=97&token=aMATICb&tx=0x1ebc057edf0f54cdc552756314e1bf1df3053521ed913b3a9964afd24bd3e855',
    );
  });

  it('stringify of undefined, null and {} is empty string', () => {
    expect(stringify(undefined)).toBe('');
    expect(stringify(null)).toBe('');
    expect(stringify({})).toBe('');
  });
});
