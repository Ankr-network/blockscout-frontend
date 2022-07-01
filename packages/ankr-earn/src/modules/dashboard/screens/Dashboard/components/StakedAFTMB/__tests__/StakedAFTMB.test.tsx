import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { ONE_ETH } from 'modules/common/const';

import { StakedAFTMB } from '..';
import {
  IStakedAFTMBData,
  useStakedAFTMBData,
} from '../../StakedTokens/hooks/FTM/useStakedAFTMBData';
import {
  IUseStakedFTMTxHistory,
  useStakedFTMTxHistory,
} from '../../StakedTokens/hooks/FTM/useStakedFTMTxHistory';

jest.mock('modules/stake/hooks/useUnstakePendingTimestamp', () => ({
  useUnstakePendingTimestamp: () => ({ FTM: { label: '' } }),
}));

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('../../StakedTokens/hooks/FTM/useStakedAFTMBData', () => ({
  useStakedAFTMBData: jest.fn(),
}));

jest.mock('../../StakedTokens/hooks/FTM/useStakedFTMTxHistory', () => ({
  useStakedFTMTxHistory: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAFTMB', () => {
  const defaultStakedAFTMBHookData: IStakedAFTMBData = {
    amount: ONE_ETH.dividedBy(10 ** 18),
    chainId: EEthereumNetworkId.fantomTestnet,
    pendingUnstakes: ONE_ETH.dividedBy(10 ** 17),
    isShowed: true,
    network: 'Fantom Opera',
    isBalancesLoading: false,
    stakeLink: '/stake',
    isStakeLoading: false,
    isUnstakeLoading: false,
    tradeLink: '/trade',
    handleAddTokenToWallet: jest.fn(),
  };

  const defaultStakedFTMTxHistory: IUseStakedFTMTxHistory = {
    stakedAFTMB: [],
    stakedAFTMC: [],
    unstakedAFTMB: [],
    unstakedAFTMC: [],
    pendingUnstakeHistoryAFTMB: [],
    pendingUnstakeHistoryAFTMC: [],
    hasHistory: false,
    isHistoryLoading: false,
    pendingValue: ONE_ETH.dividedBy(10 ** 17),
    handleLoadTxHistory: jest.fn(),
  };

  beforeEach(() => {
    (useStakedAFTMBData as jest.Mock).mockReturnValue(
      defaultStakedAFTMBHookData,
    );

    (useStakedFTMTxHistory as jest.Mock).mockReturnValue(
      defaultStakedFTMTxHistory,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(
      <MemoryRouter>
        <StakedAFTMB />
      </MemoryRouter>,
    );

    const symbol = await screen.findByText('aFTMb');
    const network = await screen.findByText('Fantom Opera');

    expect(symbol).toBeInTheDocument();
    expect(network).toBeInTheDocument();
  });

  test('should open history dialog properly', async () => {
    render(
      <MemoryRouter>
        <StakedAFTMB />
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
