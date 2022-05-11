import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { EEthereumNetworkId } from 'provider';

import { ONE_ETH } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { EPolygonPoolEventsMap } from 'modules/stake-polygon/api/PolygonSDK';

import { StakedAMATICB } from '..';
import {
  IStakedAMATICBData,
  useStakedAMATICBData,
} from '../../StakedTokens/hooks/MATIC/useStakedAMATICBData';
import {
  ITxHistoryData,
  useStakedMaticTxHistory,
} from '../../StakedTokens/hooks/MATIC/useStakedMaticTxHistory';

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('../../StakedTokens/hooks/MATIC/useStakedAMATICBData', () => ({
  useStakedAMATICBData: jest.fn(),
}));

jest.mock('../../StakedTokens/hooks/MATIC/useStakedMaticTxHistory', () => ({
  useStakedMaticTxHistory: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAMATICB', () => {
  const defaultStakedMaticHookData: IStakedAMATICBData = {
    amount: ONE_ETH.dividedBy(10 ** 18),
    chainId: EEthereumNetworkId.goerli,
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
    handleAddTokenToWallet: jest.fn(),
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
    handleLoadTxHistory: jest.fn(),
  };

  beforeEach(() => {
    (useStakedAMATICBData as jest.Mock).mockReturnValue(
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
        <StakedAMATICB />
      </MemoryRouter>,
    );

    const symbol = await screen.findByText('aMATICb');
    const network = await screen.findByText('Ethereum Mainnet');

    expect(symbol).toBeInTheDocument();
    expect(network).toBeInTheDocument();
  });

  test('should open history dialog properly', async () => {
    render(
      <MemoryRouter>
        <StakedAMATICB />
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
