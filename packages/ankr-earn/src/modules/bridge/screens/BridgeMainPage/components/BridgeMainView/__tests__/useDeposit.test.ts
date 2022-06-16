import { useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import { useTxReceipt } from 'modules/bridge/hooks/useTxReceipt';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import { SupportedChainIDS } from 'modules/common/const';

import { IUseDepositArgs, useDeposit } from '../useDeposit';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
  useDispatchRequest: jest.fn(),
}));

jest.mock('react-router', () => ({
  useHistory: jest.fn(),
}));

jest.mock('modules/bridge/hooks/useTxReceipt', () => ({
  useTxReceipt: jest.fn(),
}));

describe('modules/bridge/screens/BridgeMainPage/components/BridgeMainView/useDeposit', () => {
  const defaultDepositData = {
    loading: false,
    data: undefined,
    error: undefined,
  };

  const defaultHookArgs: IUseDepositArgs = {
    token: AvailableBridgeTokens.aETHb,
    amount: new BigNumber(1),
    toChainId: SupportedChainIDS.BSC_TESTNET,
    fromChainId: SupportedChainIDS.GOERLI,
  };

  const defaulTxReceiptData = {
    isSuccessful: false,
    isLoading: false,
    actionName: 'someName',
  };

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue(defaultDepositData);
    (useTxReceipt as jest.Mock).mockReturnValue(defaulTxReceiptData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return actual initial data', () => {
    const { result } = renderHook(() => useDeposit(defaultHookArgs));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.onClick).toBeDefined();
  });
});
