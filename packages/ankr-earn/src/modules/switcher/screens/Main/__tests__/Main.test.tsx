import { EEthereumNetworkId } from '@ankr.com/provider-core';
import { render, screen } from '@testing-library/react';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { store } from 'store';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useDialog } from 'modules/dialogs';

import { Main } from '..';
import {
  ISwitcherFormHookData,
  ISwitcherHookData,
  IUseSwitcherUrlParamsData,
  useSendAnalytics,
  useSwitcherData,
  useSwitcherForm,
  useSwitcherUrlParams,
} from '../hooks';
import { ISendAnalyticsHookData } from '../hooks/useSendAnalytics';

interface IAppWrapperProps {
  children: ReactNode;
}

const AppWrapper = ({ children }: IAppWrapperProps): JSX.Element => (
  <MemoryRouter>
    <Provider store={store}>{children}</Provider>
  </MemoryRouter>
);

jest.mock('../hooks', () => ({
  useSwitcherData: jest.fn(),
  useSwitcherForm: jest.fn(),
  useSendAnalytics: jest.fn(),
  useSwitcherUrlParams: jest.fn(),
}));

jest.mock('modules/dialogs/hooks/useDialog', () => ({
  useDialog: jest.fn(),
}));

describe('modules/switcher/screens/Main', () => {
  const defaultHookData: ISwitcherHookData = {
    chainId: EEthereumNetworkId.goerli,
    allowance: ZERO,
    ratio: ZERO,
    acBalance: ZERO,
    abBalance: ZERO,
    balance: ZERO,
    isDataLoading: false,
    isConnected: true,
    checkAllowance: () => false,
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
    handleSwitchNetwork: jest.fn(),
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

  const defaultUseDialogData = {
    handleOpen: jest.fn(),
  };

  beforeEach(() => {
    (useSwitcherData as jest.Mock).mockReturnValue(defaultHookData);

    (useSwitcherForm as jest.Mock).mockReturnValue(defaultFormData);

    (useSendAnalytics as jest.Mock).mockReturnValue(defaultSendAnalyticsData);

    (useSwitcherUrlParams as jest.Mock).mockReturnValue(defaultUrlParamsData);

    (useDialog as jest.Mock).mockReturnValue(defaultUseDialogData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(
      <AppWrapper>
        <Main />
      </AppWrapper>,
    );

    const title = await screen.findByText('ANKR Switch');
    const fee = await screen.findByText('Service fee (0.3%)');

    expect(title).toBeInTheDocument();
    expect(fee).toBeInTheDocument();
  });

  test('should render properly with switch network button', async () => {
    (useSwitcherUrlParams as jest.Mock).mockReturnValue({
      ...defaultUrlParamsData,
      from: Token.aBNBb,
      to: Token.aBNBc,
    });

    render(
      <AppWrapper>
        <Main />
      </AppWrapper>,
    );

    const button = await screen.findByText('Switch network');
    const fee = await screen.findByText('Service fee (0.1%)');
    expect(button).toBeInTheDocument();
    expect(fee).toBeInTheDocument();
  });

  test('should render spinner properly', async () => {
    (useSwitcherData as jest.Mock).mockReturnValue({
      ...defaultHookData,
      balance: ZERO,
      isDataLoading: true,
      acBalance: undefined,
      abBalance: undefined,
    });

    render(
      <AppWrapper>
        <Main />
      </AppWrapper>,
    );

    const spinner = await screen.findByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  test('should handle max input button', async () => {
    (useSwitcherData as jest.Mock).mockReturnValue({
      ...defaultHookData,
      ratio: new BigNumber(1),
      balance: new BigNumber(10),
    });

    render(
      <AppWrapper>
        <Main />
      </AppWrapper>,
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
      <AppWrapper>
        <Main />
      </AppWrapper>,
    );

    const txInfo = await screen.findByText('Transaction failed.');
    expect(txInfo).toBeInTheDocument();
  });

  test('should render success transaction info', async () => {
    (useSwitcherData as jest.Mock).mockReturnValue({
      ...defaultHookData,
      isDataLoading: true,
      txError: '',
      txHash: 'hash',
    });

    render(
      <AppWrapper>
        <Main />
      </AppWrapper>,
    );

    const txInfo = await screen.findByText('Transaction successful.');
    expect(txInfo).toBeInTheDocument();
  });

  test('should handle swap properly', async () => {
    (useSwitcherData as jest.Mock).mockReturnValue({
      ...defaultHookData,
      ratio: new BigNumber(1),
      balance: new BigNumber(10),
    });

    (useSwitcherUrlParams as jest.Mock).mockReturnValue({
      ...defaultUrlParamsData,
      from: Token.aETHb,
      to: Token.aETHc,
    });

    render(
      <AppWrapper>
        <Main />
      </AppWrapper>,
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
      allowance: ZERO,
      ratio: new BigNumber(1),
      balance: new BigNumber(10),
      checkAllowance: () => true,
    });

    (useSwitcherUrlParams as jest.Mock).mockReturnValue({
      ...defaultUrlParamsData,
      from: Token.aETHc,
      to: Token.aETHb,
    });

    render(
      <AppWrapper>
        <Main />
      </AppWrapper>,
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
