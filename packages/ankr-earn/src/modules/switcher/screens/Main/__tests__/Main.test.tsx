import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ZERO, ONE_ETH } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { Main } from '..';
import {
  ISwitcherFormHookData,
  ISwitcherHookData,
  useSwitcherData,
  useSwitcherForm,
  useSendAnalytics,
  IUseSwitcherUrlParamsData,
  useSwitcherUrlParams,
} from '../hooks';
import { ISendAnalyticsHookData } from '../hooks/useSendAnalytics';

jest.mock('../hooks', () => ({
  useSwitcherData: jest.fn(),
  useSwitcherForm: jest.fn(),
  useSendAnalytics: jest.fn(),
  useSwitcherUrlParams: jest.fn(),
}));

describe('modules/switcher/screens/Main', () => {
  const defaultHookData: ISwitcherHookData = {
    chainId: 1,
    allowance: ZERO,
    ratio: ZERO,
    aethBalance: ZERO,
    fethBalance: ZERO,
    balance: ZERO,
    hasApprove: false,
    isDataLoading: false,
  };

  const defaultFormData: ISwitcherFormHookData = {
    txHash: 'hash',
    txError: '',
    isSwapLoading: false,
    isApproveLoading: false,
    validate: jest.fn(),
    calculateValueWithRatio: () => ZERO,
    calculateFeeAndTotal: () => ({
      fee: ZERO,
      total: ZERO,
    }),
    handleApprove: jest.fn(),
    handleSwap: jest.fn(),
    handleClearTx: jest.fn(),
  };

  const defaultUrlParamsData: IUseSwitcherUrlParamsData = {
    from: Token.aETHb,
    to: Token.aETHc,
    onChangeFrom: jest.fn(),
    onChangeTo: jest.fn(),
  };

  const defaultSendAnalyticsData: ISendAnalyticsHookData = {
    sendAnalytics: jest.fn(),
  };

  beforeEach(() => {
    (useSwitcherData as jest.Mock).mockReturnValue(defaultHookData);

    (useSwitcherForm as jest.Mock).mockReturnValue(defaultFormData);

    (useSendAnalytics as jest.Mock).mockReturnValue(defaultSendAnalyticsData);

    (useSwitcherUrlParams as jest.Mock).mockReturnValue(defaultUrlParamsData);
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

    const title = await screen.findByText('ANKR Switch');
    expect(title).toBeInTheDocument();
  });

  test('should render spinner properly', async () => {
    (useSwitcherData as jest.Mock).mockReturnValue({
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
    (useSwitcherData as jest.Mock).mockReturnValue({
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
    (useSwitcherForm as jest.Mock).mockReturnValue({
      ...defaultFormData,
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
    (useSwitcherData as jest.Mock).mockReturnValue({
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
    (useSwitcherData as jest.Mock).mockReturnValue({
      ...defaultHookData,
      ratio: ONE_ETH,
      balance: ONE_ETH.multipliedBy(10),
    });

    (useSwitcherUrlParams as jest.Mock).mockReturnValue({
      ...defaultUrlParamsData,
      from: Token.aETHb,
      to: Token.aETHc,
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

    const button = await screen.findByText('Switch');
    button.click();

    expect(defaultFormData.handleSwap).toBeCalledTimes(1);
    expect(defaultFormData.handleSwap).toBeCalledWith('10');
  });

  test('should handle approve properly', async () => {
    (useSwitcherData as jest.Mock).mockReturnValue({
      ...defaultHookData,
      hasApprove: true,
      allowance: ZERO,
      ratio: ONE_ETH,
      balance: ONE_ETH.multipliedBy(10),
    });

    (useSwitcherUrlParams as jest.Mock).mockReturnValue({
      ...defaultUrlParamsData,
      from: Token.aETHc,
      to: Token.aETHb,
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

    expect(defaultFormData.handleApprove).toBeCalledTimes(1);
  });
});
