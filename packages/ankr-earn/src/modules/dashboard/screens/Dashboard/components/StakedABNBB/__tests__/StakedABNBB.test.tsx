import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { ONE_ETH } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import {
  IUseHistoryData,
  useHistory,
} from 'modules/dashboard/screens/Dashboard/hooks/useHistory';
import { useDialog } from 'modules/dialogs';

import {
  ITxHistoryData,
  useStakedBNBTxHistory,
} from '../../../hooks/liquid-tokens/BNB/useStakedBNBTxHistory';
import { StakedABNBB } from '../StakedABNBB';
import { IStakedABNBBData, useStakedABNBBData } from '../useStakedABNBBData';

jest.mock('modules/stake/hooks/useUnstakePendingTimestamp', () => ({
  useUnstakePendingTimestamp: () => ({ BNB: { label: '' } }),
}));

jest.mock('../useStakedABNBBData', () => ({
  useStakedABNBBData: jest.fn(),
}));

jest.mock('../../../hooks/liquid-tokens/BNB/useStakedBNBTxHistory', () => ({
  useStakedBNBTxHistory: jest.fn(),
}));

jest.mock('modules/dashboard/screens/Dashboard/hooks/useHistory', () => ({
  useHistory: jest.fn(),
}));

jest.mock('modules/dialogs', () => ({
  useDialog: jest.fn(),
  EKnownDialogs: { history: 'history' },
}));

describe('modules/dashboard/screens/Dashboard/components/StakedABNBB', () => {
  const defaultStakedBNBHookData: IStakedABNBBData = {
    amount: ONE_ETH.dividedBy(10 ** 18),
    chainId: EEthereumNetworkId.smartchainTestnet,
    pendingValue: ONE_ETH.dividedBy(10 ** 17),
    network: 'Ethereum Mainnet',
    switchLink: 'trade',
    unstakeLink: 'unstake',
    stakeLink: 'stake',
    isBalancesLoading: false,
    isStakeLoading: false,
    isUnstakeLoading: false,
    isPendingUnstakeLoading: false,
    handleAddTokenToWallet: jest.fn(),
  };

  const defaultTxHistoryHookData: ITxHistoryData = {
    pendingUnstakeHistoryABNBB: [],
    pendingUnstakeHistoryABNBC: [],
    transactionHistoryABNBB: {
      staked: [],
      stakedToken: Token.aBNBb,
      unstaked: [],
      unstakedToken: Token.aBNBb,
    },
    transactionHistoryABNBC: {
      staked: [],
      stakedToken: Token.aBNBc,
      unstaked: [],
      unstakedToken: Token.aBNBc,
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
    (useStakedABNBBData as jest.Mock).mockReturnValue(defaultStakedBNBHookData);

    (useStakedBNBTxHistory as jest.Mock).mockReturnValue(
      defaultTxHistoryHookData,
    );

    (useHistory as jest.Mock).mockReturnValue(defaultUseHistoryHookData);

    (useDialog as jest.Mock).mockReturnValue(defaultUseDialogHookData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(
      <MemoryRouter>
        <StakedABNBB />
      </MemoryRouter>,
    );

    const symbol = await screen.findByText('aBNBb');
    const network = await screen.findByText('Ethereum Mainnet');

    expect(symbol).toBeInTheDocument();
    expect(network).toBeInTheDocument();
  });
});
