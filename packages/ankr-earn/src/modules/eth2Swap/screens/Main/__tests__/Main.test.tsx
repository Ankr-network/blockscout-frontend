import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ZERO, ONE_ETH } from 'modules/common/const';
import { IEth2SwapHookData, useEth2SwapHook } from '../useEth2SwapHook';
import { Main } from '..';

jest.mock('../useEth2SwapHook', () => ({
  useEth2SwapHook: jest.fn(),
}));

describe('modules/eth2Swap/screens/Main', () => {
  const defaultHookData: IEth2SwapHookData = {
    swapOption: 'aETHb',
    chainId: 1,
    txHash: 'hash',
    txError: '',
    allowance: ZERO,
    ratio: ZERO,
    aethBalance: ZERO,
    fethBalance: ZERO,
    balance: ZERO,
    hasApprove: false,
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
    handleClearTx: jest.fn(),
  };

  beforeEach(() => {
    (useEth2SwapHook as jest.Mock).mockReturnValue(defaultHookData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>,
    );

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

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>,
    );

    const spinner = await screen.findByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  test('should handle max input button', async () => {
    (useEth2SwapHook as jest.Mock).mockReturnValue({
      ...defaultHookData,
      ratio: ONE_ETH,
      balance: ONE_ETH.multipliedBy(10),
    });

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>,
    );

    const maxButton = await screen.findByText('Max');
    maxButton.click();

    const input = await screen.findByDisplayValue('10');
    expect(input).toBeInTheDocument();
  });

  test('should render error transaction info', async () => {
    (useEth2SwapHook as jest.Mock).mockReturnValue({
      ...defaultHookData,
      txError: 'error',
    });

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>,
    );

    const txInfo = await screen.findByText('Transaction failed.');
    expect(txInfo).toBeInTheDocument();
  });

  test('should render success transaction info', async () => {
    (useEth2SwapHook as jest.Mock).mockReturnValue({
      ...defaultHookData,
      txError: '',
      txHash: 'hash',
    });

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>,
    );

    const txInfo = await screen.findByText('Transaction successful.');
    expect(txInfo).toBeInTheDocument();
  });

  test('should handle swap properly', async () => {
    (useEth2SwapHook as jest.Mock).mockReturnValue({
      ...defaultHookData,
      swapOption: 'aETHb',
      ratio: ONE_ETH,
      balance: ONE_ETH.multipliedBy(10),
    });

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>,
    );

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
      hasApprove: true,
      allowance: ZERO,
      ratio: ONE_ETH,
      balance: ONE_ETH.multipliedBy(10),
    });

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>,
    );

    const maxButton = await screen.findByText('Max');
    maxButton.click();

    const input = await screen.findByDisplayValue('10');
    expect(input).toBeInTheDocument();

    const button = await screen.findByText('Approve');
    button.click();

    expect(defaultHookData.handleApprove).toBeCalledTimes(1);
  });
});
