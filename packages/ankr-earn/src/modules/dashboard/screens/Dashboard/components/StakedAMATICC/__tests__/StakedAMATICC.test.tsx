import { render, screen } from '@testing-library/react';
import BigNumber from 'bignumber.js';
import { MemoryRouter } from 'react-router';

import { EEthereumNetworkId } from 'provider';

import { featuresConfig } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import {
  IStakedAMATICCData,
  useStakedAMATICCData,
} from '../../StakedTokens/hooks/MATIC/useStakedAMATICCData';
import {
  ITxHistoryData,
  useStakedMaticTxHistory,
} from '../../StakedTokens/hooks/MATIC/useStakedMaticTxHistory';
import { StakedAMATICC } from '../StakedAMATICC';
import {
  IUseStakedAMATICCAnalytics,
  useStakedAMATICCAnalytics,
} from '../useStakedAMATICCAnalytics';

jest.mock('../../StakedTokens/hooks/MATIC/useStakedAMATICCData', () => ({
  useStakedAMATICCData: jest.fn(),
}));

jest.mock('../useStakedAMATICCAnalytics', () => ({
  useStakedAMATICCAnalytics: jest.fn(),
}));

jest.mock('../../StakedTokens/hooks/MATIC/useStakedMaticTxHistory', () => ({
  useStakedMaticTxHistory: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAMATICC', () => {
  const defaultStakedMATICHookData: IStakedAMATICCData = {
    isShowed: true,
    amount: new BigNumber(1),
    isLoading: false,
    isStakeLoading: false,
    network: 'ETH',
    chainId: EEthereumNetworkId.goerli,
    stakeLink: 'stake',
    token: Token.aMATICc,
    tokenAddress: '0x00',
    unstakeLink: 'unstake',
    isUnstakeLoading: false,
    pendingValue: new BigNumber(0.1),
    onAddTokenToWallet: jest.fn(),
  };

  const defaultStakedAMATICCAnalyticsData: IUseStakedAMATICCAnalytics = {
    onAddStakingClick: jest.fn(),
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
    (useStakedAMATICCData as jest.Mock).mockReturnValue(
      defaultStakedMATICHookData,
    );

    (useStakedAMATICCAnalytics as jest.Mock).mockReturnValue(
      defaultStakedAMATICCAnalyticsData,
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
        <StakedAMATICC />
      </MemoryRouter>,
    );

    const symbol = await screen.findByText('aMATICc');
    const network = await screen.findByText('ETH');

    expect(symbol).toBeInTheDocument();
    expect(network).toBeInTheDocument();
  });

  test('should open history dialog properly', async () => {
    if (!featuresConfig.maticHistory) {
      return;
    }

    render(
      <MemoryRouter>
        <StakedAMATICC />
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
