import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ONE_ETH } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { EBinancePoolEventsMap } from 'modules/stake-bnb/api/BinanceSDK';

import { StakedABNBB } from '..';
import {
  IStakedABNBBData,
  useStakedABNBBData,
} from '../../StakedTokens/hooks/useStakedABNBBData';
import {
  ITxHistoryData,
  useStakedBNBTxHistory,
} from '../../StakedTokens/hooks/useStakedBNBTxHistory';

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('../../StakedTokens/hooks/useStakedABNBBData', () => ({
  useStakedABNBBData: jest.fn(),
}));

jest.mock('../../StakedTokens/hooks/useStakedBNBTxHistory', () => ({
  useStakedBNBTxHistory: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedABNBB', () => {
  const defaultStakedBNBHookData: IStakedABNBBData = {
    amount: ONE_ETH.dividedBy(10 ** 18),
    pendingValue: ONE_ETH.dividedBy(10 ** 17),
    network: 'Ethereum Mainnet',
    tradeLink: 'trade',
    unstakeLink: 'unstake',
    stakeLink: 'stake',
    stakeType: EBinancePoolEventsMap.Staked,
    unstakeType: EBinancePoolEventsMap.UnstakePending,
    isBalancesLoading: false,
    isStakeLoading: false,
    isUnstakeLoading: false,
    isShowed: false,
    handleAddTokenToWallet: jest.fn(),
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
  };

  beforeEach(() => {
    (useStakedABNBBData as jest.Mock).mockReturnValue(defaultStakedBNBHookData);

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
        <StakedABNBB />
      </MemoryRouter>,
    );

    const symbol = await screen.findByText('aBNBb');
    const network = await screen.findByText('Ethereum Mainnet');

    expect(symbol).toBeInTheDocument();
    expect(network).toBeInTheDocument();
  });

  test('should open history dialog properly', async () => {
    render(
      <MemoryRouter>
        <StakedABNBB />
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
