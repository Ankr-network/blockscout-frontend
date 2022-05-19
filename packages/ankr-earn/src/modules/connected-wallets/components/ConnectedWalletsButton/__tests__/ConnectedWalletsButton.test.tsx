import { IAddress } from '../../../types';
import { getAddressData } from '../ConnectedWalletsButton';

interface ITestAddressesData {
  data: IAddress[];
  result: IAddress;
}

describe('modules/connected-wallets/components/ConnectedWalletsButton/ConnectedWalletsButton', () => {
  const TEST_ADDRESS_DATA: ITestAddressesData[] = [
    {
      data: [
        {
          address: '1',
          isActive: false,
          tokenIconSrc: '1',
        },
        {
          address: '2',
          isActive: false,
          tokenIconSrc: '2',
        },
        {
          address: '3',
          isActive: false,
          tokenIconSrc: '3',
        },
      ],
      result: {
        address: '1',
        isActive: false,
        tokenIconSrc: '1',
      },
    },
    {
      data: [
        {
          address: '1',
          isActive: false,
          tokenIconSrc: '1',
        },
        {
          address: '2',
          isActive: false,
          tokenIconSrc: '2',
        },
        {
          address: '3',
          isActive: true,
          tokenIconSrc: '3',
        },
      ],
      result: {
        address: '3',
        isActive: true,
        tokenIconSrc: '3',
      },
    },
    {
      data: [
        {
          address: '1',
          isActive: false,
          tokenIconSrc: '1',
        },
        {
          address: '2',
          isActive: true,
          tokenIconSrc: '2',
        },
        {
          address: '3',
          isActive: true,
          tokenIconSrc: '3',
        },
      ],
      result: {
        address: '2',
        isActive: true,
        tokenIconSrc: '2',
      },
    },
  ];

  describe('Test: getAddressData', () => {
    const [CASE_1, CASE_2, CASE_3] = TEST_ADDRESS_DATA;

    it('Case 1: All addresses are inactive', () => {
      const { data, result } = CASE_1;

      expect(getAddressData(data)).toStrictEqual(result);
    });

    it('Case 2: One address is active', () => {
      const { data, result } = CASE_2;

      expect(getAddressData(data)).toStrictEqual(result);
    });

    it('Case 3: Two addresses are active', () => {
      const { data, result } = CASE_3;

      expect(getAddressData(data)).toStrictEqual(result);
    });
  });
});
