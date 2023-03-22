import { render, screen } from '@testing-library/react';
import BigNumber from 'bignumber.js';
import { MemoryRouter } from 'react-router';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import {
  IUseHistoryData,
  useHistory,
} from 'modules/dashboard/screens/Dashboard/hooks/useHistory';
import { useDialog } from 'modules/dialogs';
import { useLazyGetMaticOnEthTotalHistoryQuery } from 'modules/stake-matic/eth/actions/getMaticOnEthTotalHistory';

import {
  ITxHistoryData,
  useStakedMATICTxHistory,
} from '../../../hooks/liquid-tokens/MATIC/useStakedMaticTxHistory';
import { StakedAMATICC } from '../StakedAMATICC';
import {
  IUseStakedAMATICCAnalytics,
  useStakedAMATICCAnalytics,
} from '../useStakedAMATICCAnalytics';
import {
  IStakedAMATICCData,
  useStakedAMATICCData,
} from '../useStakedAMATICCData';

jest.mock('modules/stake/hooks/useUnstakePendingTimestamp', () => ({
  useUnstakePendingTimestamp: () => ({ MATIC: { label: '' } }),
}));

jest.mock('modules/common/const', () => ({
  ...jest.requireActual('modules/common/const'),
  featuresConfig: {
    maticHistory: true,
  },
}));

jest.mock('../useStakedAMATICCData', () => ({
  useStakedAMATICCData: jest.fn(),
}));

jest.mock('../useStakedAMATICCAnalytics', () => ({
  useStakedAMATICCAnalytics: jest.fn(),
}));

jest.mock('../../../hooks/liquid-tokens/MATIC/useStakedMaticTxHistory', () => ({
  useStakedMATICTxHistory: jest.fn(),
}));

jest.mock('modules/dashboard/screens/Dashboard/hooks/useHistory', () => ({
  useHistory: jest.fn(),
}));

jest.mock('modules/dialogs', () => ({
  useDialog: jest.fn(),
  EKnownDialogs: { history: 'history' },
}));

jest.mock('modules/stake-matic/eth/actions/getMaticOnEthTotalHistory', () => ({
  useLazyGetMaticOnEthTotalHistoryQuery: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAMATICC', () => {
  const defaultStakedMATICHookData: IStakedAMATICCData = {
    amount: new BigNumber(1),
    isLoading: false,
    isStakeLoading: false,
    network: 'ETH',
    chainId: EEthereumNetworkId.goerli,
    stakeLink: 'stake',
    token: Token.aMATICc,
    tokenAddress: '0x00',
    unstakeLink: 'unstake',
    tradeLink: 'defi',
    isUnstakeLoading: false,
    pendingValue: new BigNumber(0.1),
    ratio: ZERO,
    onAddTokenToWallet: jest.fn(),
  };

  const defaultStakedAMATICCAnalyticsData: IUseStakedAMATICCAnalytics = {
    onAddStakingClick: jest.fn(),
  };

  const defaultTxHistoryHookData: ITxHistoryData = {
    pendingUnstakeHistoryAMATICB: [],
    transactionHistoryAMATICB: {
      staked: [],
      stakedToken: Token.aMATICb,
      unstaked: [],
      unstakedToken: Token.aMATICb,
    },
    pendingUnstakeHistoryAMATICC: [],
    transactionHistoryAMATICC: {
      staked: [],
      stakedToken: Token.aMATICc,
      unstaked: [],
      unstakedToken: Token.aMATICc,
    },
    hasHistory: false,
    isHistoryDataLoading: false,
    handleLoadTxHistory: jest.fn(),
  };

  const defaultUseHistoryHookData: IUseHistoryData = {
    loading: false,
    weeksAmount: 1,
    handleShowMore: jest.fn(),
    stakeEvents: [],
    unstakeEvents: [],
  };

  const defaultUseDialogHookData = {
    handleOpen: jest.fn(),
  };

  beforeEach(() => {
    (useStakedAMATICCData as jest.Mock).mockReturnValue(
      defaultStakedMATICHookData,
    );

    (useStakedAMATICCAnalytics as jest.Mock).mockReturnValue(
      defaultStakedAMATICCAnalyticsData,
    );

    (useStakedMATICTxHistory as jest.Mock).mockReturnValue(
      defaultTxHistoryHookData,
    );

    (useHistory as jest.Mock).mockReturnValue(defaultUseHistoryHookData);

    (useDialog as jest.Mock).mockReturnValue(defaultUseDialogHookData);

    (useLazyGetMaticOnEthTotalHistoryQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        data: null,
        isLoading: false,
      },
    ]);
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

    const symbol = await screen.findByText('ankrMATIC');
    const network = await screen.findByText('ETH');

    expect(symbol).toBeInTheDocument();
    expect(network).toBeInTheDocument();
  });
});