import { render, screen } from '@testing-library/react';
import BigNumber from 'bignumber.js';
import { MemoryRouter } from 'react-router';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useDialog } from 'modules/dialogs';

import {
  IStakedMaticTxHistory,
  useStakedMaticTxHistory,
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
  useStakedMaticTxHistory: jest.fn(),
}));

jest.mock('modules/dialogs', () => ({
  useDialog: jest.fn(),
  EKnownDialogs: { history: 'history' },
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
    ratio: ZERO,
    onAddTokenToWallet: jest.fn(),
  };

  const defaultStakedAMATICCAnalyticsData: IUseStakedAMATICCAnalytics = {
    onAddStakingClick: jest.fn(),
  };

  const defaultStakedTxHistory: IStakedMaticTxHistory = {
    pendingCertUnstakeHistory: [],
    pendingBondUnstakeHistory: [],
    isHistoryDataLoading: false,
    pendingBondAmount: ZERO,
    pendingCertAmount: ZERO,
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

    (useStakedMaticTxHistory as jest.Mock).mockReturnValue(
      defaultStakedTxHistory,
    );

    (useDialog as jest.Mock).mockReturnValue(defaultUseDialogHookData);
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
