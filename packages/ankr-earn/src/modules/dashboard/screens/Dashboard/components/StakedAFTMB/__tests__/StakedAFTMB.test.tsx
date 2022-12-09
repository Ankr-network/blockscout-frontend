import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { EEthereumNetworkId } from '@ankr.com/provider';

import {
  IUseHistoryData,
  useHistory,
} from 'modules/common/components/HistoryDialog/hooks/useHistory';
import { ONE_ETH } from 'modules/common/const';

import {
  IUseStakedFTMTxHistory,
  useStakedFTMTxHistory,
} from '../../../hooks/liquid-tokens/FTM/useStakedFTMTxHistory';
import { StakedAFTMB } from '../StakedAFTMB';
import { IStakedAFTMBData, useStakedAFTMBData } from '../useStakedAFTMBData';

jest.mock('modules/stake/hooks/useUnstakePendingTimestamp', () => ({
  useUnstakePendingTimestamp: () => ({ FTM: { label: '' } }),
}));

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('../useStakedAFTMBData', () => ({
  useStakedAFTMBData: jest.fn(),
}));

jest.mock('../../../hooks/liquid-tokens/FTM/useStakedFTMTxHistory', () => ({
  useStakedFTMTxHistory: jest.fn(),
}));

jest.mock('modules/common/components/HistoryDialog/hooks/useHistory', () => ({
  useHistory: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAFTMB', () => {
  const defaultStakedAFTMBHookData: IStakedAFTMBData = {
    amount: ONE_ETH.dividedBy(10 ** 18),
    chainId: EEthereumNetworkId.fantomTestnet,
    pendingUnstakes: ONE_ETH.dividedBy(10 ** 17),
    network: 'Fantom Opera',
    isBalancesLoading: false,
    stakeLink: '/stake',
    isStakeLoading: false,
    isUnstakeLoading: false,
    switchLink: '/switch',
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

  const defaultUseHistoryHookData: IUseHistoryData = {
    loading: false,
    weeksAmount: 1,
    handleShowMore: jest.fn(),
    stakeEvents: [],
    unstakeEvents: [],
  };

  beforeEach(() => {
    (useStakedAFTMBData as jest.Mock).mockReturnValue(
      defaultStakedAFTMBHookData,
    );

    (useStakedFTMTxHistory as jest.Mock).mockReturnValue(
      defaultStakedFTMTxHistory,
    );

    (useHistory as jest.Mock).mockReturnValue(defaultUseHistoryHookData);
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
