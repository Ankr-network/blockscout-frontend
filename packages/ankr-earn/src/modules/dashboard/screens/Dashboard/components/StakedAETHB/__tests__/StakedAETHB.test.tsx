import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { EEthereumNetworkId } from '@ankr.com/provider';

import {
  IUseHistoryData,
  useHistory,
} from 'modules/common/components/HistoryDialog/hooks/useHistory';
import { ONE_ETH, ZERO } from 'modules/common/const';

import { StakedAETHB } from '..';
import { useStakedTxHistoryETH } from '../../../hooks/liquid-tokens/ETH/useStakedTxHistoryETH';
import { IStakedAETHBData, useStakedAETHBData } from '../useStakedAETHBData';

jest.mock('modules/stake/hooks/useUnstakePendingTimestamp', () => ({
  useUnstakePendingTimestamp: () => ({ ETH: { label: '' } }),
}));

jest.mock('modules/common/const', () => ({
  ...jest.requireActual('modules/common/const'),
  featuresConfig: {
    stakeETH: true,
  },
}));

jest.mock('../useStakedAETHBData', () => ({
  useStakedAETHBData: jest.fn(),
}));

jest.mock('../../../hooks/liquid-tokens/ETH/useStakedTxHistoryETH', () => ({
  useStakedTxHistoryETH: jest.fn(),
}));

jest.mock('modules/common/components/HistoryDialog/hooks/useHistory', () => ({
  useHistory: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAETHB', () => {
  const defaultStakedAETHBHookData: IStakedAETHBData = {
    amount: ONE_ETH.dividedBy(10 ** 18),
    chainId: EEthereumNetworkId.goerli,
    pendingValue: ZERO,
    network: 'Ethereum Mainnet',
    tradeLink: '/defi',
    isBalancesLoading: false,
    isStakeLoading: false,
    handleAddTokenToWallet: jest.fn(),
  };

  const defaultStakedTxHistoryData = {
    stakedAETB: [],
    stakedAETC: [],
    pendingUnstakeHistory: [],
    hasHistory: false,
    isHistoryLoading: false,
    pendingValue: ONE_ETH.dividedBy(10 ** 17),
    handleLoadTxHistory: jest.fn(),
  };

  const defaultUseHistoryHookData: IUseHistoryData = {
    loading: false,
    weeksAmount: 1,
    handleShowMore: jest.fn(),
    stakeEvents: [],
    unstakeEvents: [],
  };

  beforeEach(() => {
    (useStakedAETHBData as jest.Mock).mockReturnValue(
      defaultStakedAETHBHookData,
    );

    (useStakedTxHistoryETH as jest.Mock).mockReturnValue(
      defaultStakedTxHistoryData,
    );

    (useHistory as jest.Mock).mockReturnValue(defaultUseHistoryHookData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(
      <MemoryRouter>
        <StakedAETHB />
      </MemoryRouter>,
    );

    const symbol = await screen.findByText('aETHb');
    const network = await screen.findByText('Ethereum Mainnet');

    expect(symbol).toBeInTheDocument();
    expect(network).toBeInTheDocument();
  });

  test('should open history dialog properly', async () => {
    render(
      <MemoryRouter>
        <StakedAETHB />
      </MemoryRouter>,
    );

    const menuButton = await screen.findByTestId('menu-button');
    menuButton.click();

    const historyButton = await screen.findByText('Staking history');
    historyButton.click();

    const historyDialog = await screen.findByTestId('history-dialog');
    expect(historyDialog).toBeInTheDocument();
  });

  test('unstake should be with custom tooltip', async () => {
    render(
      <MemoryRouter>
        <StakedAETHB />
      </MemoryRouter>,
    );

    const unstakeTitleBox = await screen.findByTitle(/after The Merge/);

    expect(unstakeTitleBox).toBeInTheDocument();
  });
});
