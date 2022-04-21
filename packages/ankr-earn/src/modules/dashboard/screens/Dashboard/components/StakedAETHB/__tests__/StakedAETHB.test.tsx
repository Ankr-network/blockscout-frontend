import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { BlockchainNetworkId } from 'provider';

import { ONE_ETH, ZERO } from 'modules/common/const';

import { StakedAETHB } from '..';
import {
  IStakedAETHBData,
  useStakedAETHBData,
} from '../../StakedTokens/hooks/ETH/useStakedAETHBData';
import { useStakedTxHistoryETH } from '../../StakedTokens/hooks/ETH/useStakedTxHistoryETH';

jest.mock('modules/common/const', () => ({
  ...jest.requireActual('modules/common/const'),
  featuresConfig: {
    stakeETH: true,
  },
}));

jest.mock('../../StakedTokens/hooks/ETH/useStakedAETHBData', () => ({
  useStakedAETHBData: jest.fn(),
}));

jest.mock('../../StakedTokens/hooks/ETH/useStakedTxHistoryETH', () => ({
  useStakedTxHistoryETH: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAETHB', () => {
  const defaultStakedAETHBHookData: IStakedAETHBData = {
    amount: ONE_ETH.dividedBy(10 ** 18),
    chainId: BlockchainNetworkId.goerli,
    pendingValue: ZERO,
    network: 'Ethereum Mainnet',
    tradeLink: '/trade',
    isShowed: true,
    isBalancesLoading: false,
    isStakeLoading: false,
    handleAddTokenToWallet: jest.fn(),
  };

  const defaultStakedTxHistoryData = {
    stakedAETB: [],
    stakedAETC: [],
    pendingUnstakeHistory: [],
    hasHistory: false,
    isHistoryLoading: false,
    pendingValue: ONE_ETH.dividedBy(10 ** 17),
    handleLoadTxHistory: jest.fn(),
  };

  beforeEach(() => {
    (useStakedAETHBData as jest.Mock).mockReturnValue(
      defaultStakedAETHBHookData,
    );

    (useStakedTxHistoryETH as jest.Mock).mockReturnValue(
      defaultStakedTxHistoryData,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(
      <MemoryRouter>
        <StakedAETHB />
      </MemoryRouter>,
    );

    const symbol = await screen.findByText('aETHb');
    const network = await screen.findByText('Ethereum Mainnet');

    expect(symbol).toBeInTheDocument();
    expect(network).toBeInTheDocument();
  });

  test('should open history dialog properly', async () => {
    render(
      <MemoryRouter>
        <StakedAETHB />
      </MemoryRouter>,
    );

    const menuButton = await screen.findByTestId('menu-button');
    menuButton.click();

    const historyButton = await screen.findByText('Staking history');
    historyButton.click();

    const historyDialog = await screen.findByTestId('history-dialog');
    expect(historyDialog).toBeInTheDocument();
  });

  test('unstake should be with custom tooltip', async () => {
    render(
      <MemoryRouter>
        <StakedAETHB />
      </MemoryRouter>,
    );

    const unstakeTitleBox = await screen.findByTitle(/during phase/);

    expect(unstakeTitleBox).toBeInTheDocument();
  });
});
