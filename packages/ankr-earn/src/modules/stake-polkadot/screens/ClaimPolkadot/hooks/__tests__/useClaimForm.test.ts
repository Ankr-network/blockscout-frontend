import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { t } from 'common';

import { ONE, ZERO } from 'modules/common/const';
import {
  EPolkadotETHReverseMap,
  EPolkadotNetworks,
} from 'modules/stake-polkadot/types';

import { useClaimForm } from '../useClaimForm';

const POLKADOT_ADDR = 'testAddress';
const SUCCESS_TITLE = t('stake-polkadot.claim.success-title');

jest.mock('@redux-requests/react', () => ({
  useDispatchRequest: jest.fn(),
  useMutation: jest.fn(),
  useQuery: jest.fn(),
}));

jest.mock('react-router', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: () => ({
    address: POLKADOT_ADDR,
  }),
}));

jest.mock('modules/dashboard/Routes', () => ({
  RoutesConfig: {
    dashboard: {
      generatePath: jest.fn(),
    },
  },
}));

jest.mock('modules/stake-polkadot/actions/addETHTokenToWallet', () => ({
  addETHTokenToWallet: jest.fn(),
}));

describe('modules/stake-polkadot/screens/ClaimPolkadot/hooks/useClaimForm', () => {
  beforeEach(() => {
    (useDispatchRequest as jest.Mock).mockReturnValue(jest.fn());

    (useMutation as jest.Mock).mockReturnValue({
      loading: false,
    });

    (useQuery as jest.Mock).mockReturnValue({
      data: {
        claimable: ONE,
      },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Case 1: Checking on empty data', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
    });

    const { result } = renderHook(() => useClaimForm(EPolkadotNetworks.DOT));

    expect(result.current.amount).toBe(ZERO);
    expect(result.current.ethToken).toBe(EPolkadotETHReverseMap.DOT);
    expect(result.current.isLoadingClaim).toBe(false);
    expect(result.current.isSuccessOpened).toBe(false);
    expect(result.current.polkadotAddress).toBe(POLKADOT_ADDR);
    expect(result.current.successTitle).toBe(SUCCESS_TITLE);
    expect(result.current.onAddTokenClick).toEqual(expect.any(Function));
    expect(result.current.onFormSubmit).toEqual(expect.any(Function));
    expect(result.current.onSuccessClose).toEqual(expect.any(Function));
  });

  it('Case 2: Checking on available data', () => {
    const { result } = renderHook(() => useClaimForm(EPolkadotNetworks.DOT));

    expect(result.current.amount).toBe(ONE);
    expect(result.current.ethToken).toBe(EPolkadotETHReverseMap.DOT);
    expect(result.current.isLoadingClaim).toBe(false);
    expect(result.current.isSuccessOpened).toBe(false);
    expect(result.current.polkadotAddress).toBe(POLKADOT_ADDR);
    expect(result.current.successTitle).toBe(SUCCESS_TITLE);
    expect(result.current.onAddTokenClick).toEqual(expect.any(Function));
    expect(result.current.onFormSubmit).toEqual(expect.any(Function));
    expect(result.current.onSuccessClose).toEqual(expect.any(Function));
  });

  it('Case 3: Checking on "onAddTokenClick" and "onSuccessClose" calls', () => {
    const mockDispatch = jest.fn();

    (useDispatchRequest as jest.Mock).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useClaimForm(EPolkadotNetworks.DOT));

    act(() => {
      result.current.onAddTokenClick();
      result.current.onSuccessClose();
    });

    expect(mockDispatch).toBeCalledTimes(2);
  });
});
