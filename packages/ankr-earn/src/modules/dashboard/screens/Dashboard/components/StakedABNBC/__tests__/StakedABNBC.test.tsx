import { render, screen } from '@testing-library/react';
import BigNumber from 'bignumber.js';
import { MemoryRouter } from 'react-router';

import { EEthereumNetworkId } from '@ankr.com/provider';

import {
  IUseHistoryData,
  useHistory,
} from 'modules/common/components/HistoryDialog/hooks/useHistory';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import {
  ITxHistoryData,
  useStakedBNBTxHistory,
} from '../../../hooks/liquid-tokens/BNB/useStakedBNBTxHistory';
import { StakedABNBC } from '../StakedABNBC';
import {
  IUseStakedABNBCAnalytics,
  useStakedABNBCAnalytics,
} from '../useStakedABNBCAnalytics';
import { IStakedABNBCData, useStakedABNBCData } from '../useStakedABNBCData';

jest.mock('modules/stake/hooks/useUnstakePendingTimestamp', () => ({
  useUnstakePendingTimestamp: () => ({ BNB: { label: '' } }),
}));

jest.mock('../useStakedABNBCData', () => ({
  useStakedABNBCData: jest.fn(),
}));

jest.mock('../useStakedABNBCAnalytics.ts', () => ({
  useStakedABNBCAnalytics: jest.fn(),
}));

jest.mock('../../../hooks/liquid-tokens/BNB/useStakedBNBTxHistory', () => ({
  useStakedBNBTxHistory: jest.fn(),
}));

jest.mock('modules/common/components/HistoryDialog/hooks/useHistory', () => ({
  useHistory: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedABNBC', () => {
  const defaultStakedBNBHookData: IStakedABNBCData = {
    amount: new BigNumber(1),
    chainId: EEthereumNetworkId.smartchainTestnet,
    network: 'BSC',
    stakeLink: 'stake',
    isLoading: false,
    isStakeLoading: false,
    tokenAddress: '0x22',
    token: Token.aBNBc,
    unstakeLink: 'unstake',
    isUnstakeLoading: false,
    ratio: ZERO,
    pendingValue: new BigNumber(0.1),
    onAddTokenToWallet: jest.fn(),
    isPendingUnstakeLoading: false,
  };

  const defaultStakedABNBCAnalyticsData: IUseStakedABNBCAnalytics = {
    onAddStakingClick: jest.fn(),
  };

  const defaultTxHistoryHookData: ITxHistoryData = {
    pendingUnstakeHistoryABNBB: [],
    pendingUnstakeHistoryABNBC: [],
    transactionHistoryABNBB: {
      staked: [],
      stakedToken: Token.aBNBb,
      unstaked: [],
      unstakedToken: Token.aBNBb,
    },
    transactionHistoryABNBC: {
      staked: [],
      stakedToken: Token.aBNBc,
      unstaked: [],
      unstakedToken: Token.aBNBc,
    },
    hasHistory: false,
    isHistoryDataLoading: false,
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
    (useStakedABNBCData as jest.Mock).mockReturnValue(defaultStakedBNBHookData);

    (useStakedABNBCAnalytics as jest.Mock).mockReturnValue(
      defaultStakedABNBCAnalyticsData,
    );

    (useStakedBNBTxHistory as jest.Mock).mockReturnValue(
      defaultTxHistoryHookData,
    );

    (useHistory as jest.Mock).mockReturnValue(defaultUseHistoryHookData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(
      <MemoryRouter>
        <StakedABNBC />
      </MemoryRouter>,
    );

    const symbol = await screen.findByText('aBNBc');
    const network = await screen.findByText('BSC');

    expect(symbol).toBeInTheDocument();
    expect(network).toBeInTheDocument();
  });

  test('should open history dialog properly', async () => {
    render(
      <MemoryRouter>
        <StakedABNBC />
      </MemoryRouter>,
    );

    const menuButton = await screen.findByTestId('menu-button');
    menuButton.click();

    const historyButton = await screen.findByText('Staking history');
    historyButton.click();

    const historyDialog = await screen.findByTestId('history-dialog');
    expect(historyDialog).toBeInTheDocument();
  });
});
