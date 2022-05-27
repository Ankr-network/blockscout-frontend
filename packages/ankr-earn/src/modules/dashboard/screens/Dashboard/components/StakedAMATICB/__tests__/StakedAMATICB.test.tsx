import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { EEthereumNetworkId } from 'provider';

import { ONE_ETH } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { StakedAMATICB } from '..';
import {
  IStakedAMATICBData,
  useStakedAMATICBData,
} from '../../StakedTokens/hooks/MATIC/useStakedAMATICBData';
import {
  ITxHistoryData,
  useStakedMATICTxHistory,
} from '../../StakedTokens/hooks/MATIC/useStakedMaticTxHistory';

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('modules/common/const', () => ({
  ...jest.requireActual('modules/common/const'),
  featuresConfig: {
    maticHistory: true,
  },
}));

jest.mock('../../StakedTokens/hooks/MATIC/useStakedAMATICBData', () => ({
  useStakedAMATICBData: jest.fn(),
}));

jest.mock('../../StakedTokens/hooks/MATIC/useStakedMATICTxHistory', () => ({
  useStakedMATICTxHistory: jest.fn(),
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
    isBalancesLoading: false,
    isStakeLoading: false,
    isUnstakeLoading: false,
    isShowed: true,
    handleAddTokenToWallet: jest.fn(),
  };

  const defaultTxHistoryHookData: ITxHistoryData = {
    pendingUnstakeHistoryAMATICB: [],
    transactionHistoryAMATICB: {
      token: Token.aMATICb,
      staked: [],
      unstaked: [],
    },
    pendingUnstakeHistoryAMATICC: [],
    transactionHistoryAMATICC: {
      token: Token.aMATICc,
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

    (useStakedMATICTxHistory as jest.Mock).mockReturnValue(
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
