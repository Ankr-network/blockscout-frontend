import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ONE_ETH, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { EBinancePoolEventsMap } from 'modules/stake-bnb/api/BinanceSDK';
import { StakedBNB } from '..';
import { useStakedBNBData, IStakedBNBData } from '../useStakedBNBData';
import {
  useStakedBNBTxHistory,
  ITxHistoryData,
} from '../useStakedBNBTxHistory';

jest.mock('../useStakedBNBData', () => ({
  useStakedBNBData: jest.fn(),
}));

jest.mock('../useStakedBNBTxHistory', () => ({
  useStakedBNBTxHistory: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedBNB', () => {
  const defaultStakedBNBHookData: IStakedBNBData = {
    amount: ONE_ETH.dividedBy(10 ** 18),
    pendingValue: ONE_ETH.dividedBy(10 ** 17),
    network: 'Ethereum Mainnet',
    tradeLink: 'trade',
    unstakeLink: 'unstake',
    stakeLink: 'stake',
    stakeType: EBinancePoolEventsMap.StakePending,
    unstakeType: EBinancePoolEventsMap.ClaimPending,
    isBalancesLoading: false,
    isStakeLoading: false,
    isUnstakeLoading: false,
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
    (useStakedBNBData as jest.Mock).mockReturnValue(defaultStakedBNBHookData);

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
        <StakedBNB />
      </MemoryRouter>,
    );

    const symbol = await screen.findByText('aBNBb');
    const network = await screen.findByText('Ethereum Mainnet');

    expect(symbol).toBeInTheDocument();
    expect(network).toBeInTheDocument();
  });

  test('should not render if there is no data to show', () => {
    (useStakedBNBData as jest.Mock).mockReturnValue({
      ...defaultStakedBNBHookData,
      amount: ZERO,
      pendingValue: ZERO,
    });

    (useStakedBNBTxHistory as jest.Mock).mockReturnValue({
      ...defaultTxHistoryHookData,
      hasHistory: false,
    });

    render(
      <MemoryRouter>
        <StakedBNB />
      </MemoryRouter>,
    );

    const networkTitle = screen.queryByText('Ethereum Mainnet');
    expect(networkTitle).not.toBeInTheDocument();
  });
});
