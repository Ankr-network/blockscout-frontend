import { render, screen } from '@testing-library/react';
import { ONE_ETH } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { EBinancePoolEventsMap } from 'modules/stake-bnb/api/BinanceSDK';
import { MemoryRouter } from 'react-router';
import { StakedBNB } from '..';
import {
  IStakedBNBData,
  useStakedBNBData,
} from '../../StakedTokens/hooks/useStakedBNBData';
import {
  ITxHistoryData,
  useStakedBNBTxHistory,
} from '../../StakedTokens/hooks/useStakedBNBTxHistory';

jest.mock('../../StakedTokens/hooks/useStakedBNBData', () => ({
  useStakedBNBData: jest.fn(),
}));

jest.mock('../../StakedTokens/hooks/useStakedBNBTxHistory', () => ({
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
    stakeType: EBinancePoolEventsMap.Staked,
    unstakeType: EBinancePoolEventsMap.UnstakePending,
    isBalancesLoading: false,
    isStakeLoading: false,
    isUnstakeLoading: false,
    isShowed: false,
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
});
