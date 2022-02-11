import { render, screen } from '@testing-library/react';
import { ONE_ETH } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { EPolygonPoolEventsMap } from 'modules/stake-polygon/api/PolygonSDK';
import { MemoryRouter } from 'react-router';
import { StakedMatic } from '..';
import {
  IStakedMaticData,
  useStakedMaticData,
} from '../../StakedTokens/hooks/useStakedMaticData';
import {
  ITxHistoryData,
  useStakedMaticTxHistory,
} from '../../StakedTokens/hooks/useStakedMaticTxHistory';

jest.mock('../../StakedTokens/hooks/useStakedMaticData', () => ({
  useStakedMaticData: jest.fn(),
}));

jest.mock('../../StakedTokens/hooks/useStakedMaticTxHistory', () => ({
  useStakedMaticTxHistory: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedMatic', () => {
  const defaultStakedMaticHookData: IStakedMaticData = {
    amount: ONE_ETH.dividedBy(10 ** 18),
    pendingValue: ONE_ETH.dividedBy(10 ** 17),
    network: 'Ethereum Mainnet',
    tradeLink: 'trade',
    unstakeLink: 'unstake',
    stakeLink: 'stake',
    stakeType: EPolygonPoolEventsMap.StakePending,
    unstakeType: EPolygonPoolEventsMap.MaticClaimPending,
    isBalancesLoading: false,
    isStakeLoading: false,
    isUnstakeLoading: false,
    isShowed: true,
  };

  const defaultTxHistoryHookData: ITxHistoryData = {
    txHistory: null,
    pendingUnstakeHistory: [],
    transactionHistory: {
      token: Token.aMATICb,
      staked: [],
      unstaked: [],
    },
    hasHistory: false,
    isHistoryDataLoading: false,
  };

  beforeEach(() => {
    (useStakedMaticData as jest.Mock).mockReturnValue(
      defaultStakedMaticHookData,
    );

    (useStakedMaticTxHistory as jest.Mock).mockReturnValue(
      defaultTxHistoryHookData,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(
      <MemoryRouter>
        <StakedMatic />
      </MemoryRouter>,
    );

    const symbol = await screen.findByText('aMATICb');
    const network = await screen.findByText('Ethereum Mainnet');

    expect(symbol).toBeInTheDocument();
    expect(network).toBeInTheDocument();
  });
});
