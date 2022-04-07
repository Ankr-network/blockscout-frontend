import { render, screen } from '@testing-library/react';
import BigNumber from 'bignumber.js';
import { MemoryRouter } from 'react-router';

import { featuresConfig } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import {
  IStakedABNBCData,
  useStakedABNBCData,
} from '../../StakedTokens/hooks/BNB/useStakedABNBCData';
import {
  ITxHistoryData,
  useStakedBNBTxHistory,
} from '../../StakedTokens/hooks/BNB/useStakedBNBTxHistory';
import { StakedABNBC } from '../StakedABNBC';
import {
  IUseStakedABNBCAnalytics,
  useStakedABNBCAnalytics,
} from '../useStakedABNBCAnalytics';

jest.mock('../../StakedTokens/hooks/BNB/useStakedABNBCData', () => ({
  useStakedABNBCData: jest.fn(),
}));

jest.mock('../useStakedABNBCAnalytics.ts', () => ({
  useStakedABNBCAnalytics: jest.fn(),
}));

jest.mock('../../StakedTokens/hooks/BNB/useStakedBNBTxHistory', () => ({
  useStakedBNBTxHistory: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedABNBC', () => {
  const defaultStakedBNBHookData: IStakedABNBCData = {
    amount: new BigNumber(1),
    network: 'BSC',
    stakeLink: 'stake',
    isLoading: false,
    isStakeLoading: false,
    isShowed: false,
    tokenAddress: '0x22',
    token: Token.aBNBc,
    unstakeLink: 'unstake',
    isUnstakeLoading: false,
    pendingValue: new BigNumber(0.1),
    onAddTokenToWallet: jest.fn(),
  };

  const defaultStakedABNBCAnalyticsData: IUseStakedABNBCAnalytics = {
    onAddStakingClick: jest.fn(),
  };

  const defaultTxHistoryHookData: ITxHistoryData = {
    txHistory: null,
    pendingUnstakeHistory: [],
    transactionHistory: {
      token: Token.aBNBb,
      staked: [],
      unstaked: [],
    },
    hasHistory: false,
    isHistoryDataLoading: false,
    handleLoadTxHistory: jest.fn(),
  };

  beforeEach(() => {
    (useStakedABNBCData as jest.Mock).mockReturnValue(defaultStakedBNBHookData);

    (useStakedABNBCAnalytics as jest.Mock).mockReturnValue(
      defaultStakedABNBCAnalyticsData,
    );

    (useStakedBNBTxHistory as jest.Mock).mockReturnValue(
      defaultTxHistoryHookData,
    );
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
    if (!featuresConfig.bnbHistory) {
      return;
    }

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
