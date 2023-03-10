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
import { useLazyGetMaticOnEthTotalHistoryQuery } from 'modules/stake-matic/eth/actions/getMaticOnEthTotalHistory';

import {
  ITxHistoryData,
  useStakedMATICTxHistory,
} from '../../../hooks/liquid-tokens/MATIC/useStakedMaticTxHistory';
import { StakedAMATICB } from '../StakedAMATICB';
import {
  IStakedAMATICBData,
  useStakedAMATICBData,
} from '../useStakedAMATICBData';

jest.mock('modules/stake-matic/eth/actions/getMaticOnEthTotalHistory', () => ({
  useLazyGetMaticOnEthTotalHistoryQuery: jest.fn(),
}));

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('modules/stake/hooks/useUnstakePendingTimestamp', () => ({
  useUnstakePendingTimestamp: () => ({ MATIC: { label: '' } }),
}));

jest.mock('modules/common/const', () => ({
  ...jest.requireActual('modules/common/const'),
  featuresConfig: {
    maticHistory: true,
  },
}));

jest.mock('../useStakedAMATICBData', () => ({
  useStakedAMATICBData: jest.fn(),
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

describe('modules/dashboard/screens/Dashboard/components/StakedAMATICB', () => {
  const defaultStakedMaticHookData: IStakedAMATICBData = {
    amount: ONE_ETH.dividedBy(10 ** 18),
    chainId: EEthereumNetworkId.goerli,
    pendingValue: ONE_ETH.dividedBy(10 ** 17),
    network: 'Ethereum Mainnet',
    switchLink: 'switch',
    unstakeLink: 'unstake',
    stakeLink: 'stake',
    isBalancesLoading: false,
    isStakeLoading: false,
    isUnstakeLoading: false,
    handleAddTokenToWallet: jest.fn(),
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
    (useStakedAMATICBData as jest.Mock).mockReturnValue(
      defaultStakedMaticHookData,
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
        <StakedAMATICB />
      </MemoryRouter>,
    );

    const symbol = await screen.findByText('aMATICb');
    const network = await screen.findByText('Ethereum Mainnet');

    expect(symbol).toBeInTheDocument();
    expect(network).toBeInTheDocument();
  });
});
