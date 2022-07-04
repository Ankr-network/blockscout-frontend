import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { ONE_ETH, ZERO } from 'modules/common/const';

import { StakedAETHC } from '..';
import {
  IStakedAETHCData,
  useStakedAETHCData,
} from '../../StakedTokens/hooks/ETH/useStakedAETHCData';
import { useStakedTxHistoryETH } from '../../StakedTokens/hooks/ETH/useStakedTxHistoryETH';

jest.mock('modules/stake/hooks/useUnstakePendingTimestamp', () => ({
  useUnstakePendingTimestamp: () => ({ ETH: { label: '' } }),
}));

jest.mock('modules/common/const', () => ({
  ...jest.requireActual('modules/common/const'),
  featuresConfig: {
    stakeETH: true,
  },
}));

jest.mock('../../StakedTokens/hooks/ETH/useStakedAETHCData', () => ({
  useStakedAETHCData: jest.fn(),
}));

jest.mock('../../StakedTokens/hooks/ETH/useStakedTxHistoryETH', () => ({
  useStakedTxHistoryETH: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAETHC', () => {
  const defaultStakedAETHCHookData: IStakedAETHCData = {
    amount: ONE_ETH.dividedBy(10 ** 18),
    chainId: EEthereumNetworkId.goerli,
    pendingValue: ZERO,
    network: 'Ethereum Mainnet',
    tradeLink: '/trade',
    isShowed: true,
    isBalancesLoading: false,
    isStakeLoading: false,
    ratio: ZERO,
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
    (useStakedAETHCData as jest.Mock).mockReturnValue(
      defaultStakedAETHCHookData,
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
        <StakedAETHC />
      </MemoryRouter>,
    );

    const symbol = await screen.findByText('aETHc');
    const network = await screen.findByText('Ethereum Mainnet');

    expect(symbol).toBeInTheDocument();
    expect(network).toBeInTheDocument();
  });

  test('should open history dialog properly', async () => {
    render(
      <MemoryRouter>
        <StakedAETHC />
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
        <StakedAETHC />
      </MemoryRouter>,
    );

    const unstakeTitleBox = await screen.findByTitle(/after The Merge/);

    expect(unstakeTitleBox).toBeInTheDocument();
  });
});
