import { render, screen } from '@testing-library/react';

import { ZERO, ONE_ETH } from 'modules/common/const';
import { IEth2SwapHookData, useEth2SwapHook } from '../hook';
import { Main } from '..';

jest.mock('../hook', () => ({
  useEth2SwapHook: jest.fn(),
}));

describe('modules/eth2Swap/screens/Main', () => {
  const defaultHookData: IEth2SwapHookData = {
    swapOption: 'aETHb',
    allowance: ZERO,
    ratio: ZERO,
    aethBalance: ZERO,
    fethBalance: ZERO,
    balance: ZERO,
    isDataLoading: false,
    isSwapLoading: false,
    isApproveLoading: false,
    validate: jest.fn(),
    calculateValueWithRatio: () => ZERO,
    calculateFeeAndTotal: () => ({
      fee: ZERO,
      total: ZERO,
    }),
    handleChooseAEthC: jest.fn(),
    handleChooseAEthB: jest.fn(),
    handleApprove: jest.fn(),
    handleSwap: jest.fn(),
  };

  beforeEach(() => {
    (useEth2SwapHook as jest.Mock).mockReturnValue(defaultHookData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(<Main />);

    const title = await screen.findByText('ETH2 Swap');
    expect(title).toBeInTheDocument();
  });

  test('should render spinner properly', async () => {
    (useEth2SwapHook as jest.Mock).mockReturnValue({
      ...defaultHookData,
      balance: ZERO,
      isDataLoading: true,
      aethBalance: undefined,
      fethBalance: undefined,
    });

    render(<Main />);

    const spinner = await screen.findByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  test('should handle max input button', async () => {
    (useEth2SwapHook as jest.Mock).mockReturnValue({
      ...defaultHookData,
      ratio: ONE_ETH,
      balance: ONE_ETH.multipliedBy(10),
    });

    render(<Main />);

    const maxButton = await screen.findByText('Max');
    maxButton.click();

    const input = await screen.findByDisplayValue('10');
    expect(input).toBeInTheDocument();
  });

  test('should handle swap properly', async () => {
    (useEth2SwapHook as jest.Mock).mockReturnValue({
      ...defaultHookData,
      swapOption: 'aETHb',
      ratio: ONE_ETH,
      balance: ONE_ETH.multipliedBy(10),
    });

    render(<Main />);

    const maxButton = await screen.findByText('Max');
    maxButton.click();

    const input = await screen.findByDisplayValue('10');
    expect(input).toBeInTheDocument();

    const button = await screen.findByText('Swap');
    button.click();

    expect(defaultHookData.handleSwap).toBeCalledTimes(1);
    expect(defaultHookData.handleSwap).toBeCalledWith('10');
  });

  test('should handle approve properly', async () => {
    (useEth2SwapHook as jest.Mock).mockReturnValue({
      ...defaultHookData,
      swapOption: 'aETHc',
      allowance: ZERO,
      ratio: ONE_ETH,
      balance: ONE_ETH.multipliedBy(10),
    });

    render(<Main />);

    const maxButton = await screen.findByText('Max');
    maxButton.click();

    const input = await screen.findByDisplayValue('10');
    expect(input).toBeInTheDocument();

    const button = await screen.findByText('Approve');
    button.click();

    expect(defaultHookData.handleApprove).toBeCalledTimes(1);
  });
});
