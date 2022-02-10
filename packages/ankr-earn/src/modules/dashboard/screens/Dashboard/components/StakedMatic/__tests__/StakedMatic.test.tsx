import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ONE_ETH, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { EPolygonPoolEventsMap } from 'modules/stake-polygon/api/PolygonSDK';
import { StakedMatic } from '..';
import { useStakedMaticData, IStakedMaticData } from '../useStakedMaticData';
import {
  useStakedMaticTxHistory,
  ITxHistoryData,
} from '../useStakedMaticTxHistory';

jest.mock('../useStakedMaticData', () => ({
  useStakedMaticData: jest.fn(),
}));

jest.mock('../useStakedMaticTxHistory', () => ({
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

  test('should not render if there is no data to show', () => {
    (useStakedMaticData as jest.Mock).mockReturnValue({
      ...defaultStakedMaticHookData,
      amount: ZERO,
      pendingValue: ZERO,
    });

    (useStakedMaticTxHistory as jest.Mock).mockReturnValue({
      ...defaultTxHistoryHookData,
      hasHistory: false,
    });

    render(
      <MemoryRouter>
        <StakedMatic />
      </MemoryRouter>,
    );

    const networkTitle = screen.queryByText('Ethereum Mainnet');
    expect(networkTitle).not.toBeInTheDocument();
  });
});
