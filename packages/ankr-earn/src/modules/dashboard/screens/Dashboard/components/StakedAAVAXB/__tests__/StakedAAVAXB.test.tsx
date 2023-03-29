import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { EEthereumNetworkId } from '@ankr.com/provider';
import { EAvalanchePoolEventsMap } from '@ankr.com/staking-sdk';

import { ONE_ETH as ONE, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useDialog } from 'modules/dialogs';

import { StakedAAVAXB } from '..';
import {
  IStakedAVAXTxHistory,
  useStakedAVAXTxHistory,
} from '../../../hooks/liquid-tokens/AVAX/useStakedAVAXTxHistory';
import { IStakedAAVAXBData, useStakedAAVAXBData } from '../useStakedAAVAXBData';

jest.mock('../useStakedAAVAXBData', () => ({
  useStakedAAVAXBData: jest.fn(),
}));

jest.mock('modules/stake/hooks/useUnstakePendingTimestamp', () => ({
  useUnstakePendingTimestamp: () => ({ AVAX: { label: '' } }),
}));

jest.mock('../../../hooks/liquid-tokens/AVAX/useStakedAVAXTxHistory', () => ({
  useStakedAVAXTxHistory: jest.fn(),
}));

jest.mock('modules/dialogs', () => ({
  useDialog: jest.fn(),
  EKnownDialogs: { history: 'history' },
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAAVAXB', () => {
  const networkName = 'Avalanche';

  const defaultStakedAAVAXBHookData: IStakedAAVAXBData = {
    amount: ONE.dividedBy(10 ** 18),
    chainId: EEthereumNetworkId.avalancheTestnet,
    network: networkName,
    switchLink: 'trade',
    unstakeLink: 'unstake',
    stakeLink: 'stake',
    stakeType: EAvalanchePoolEventsMap.StakePending,
    unstakeType: EAvalanchePoolEventsMap.AvaxClaimPending,
    isBalancesLoading: false,
    isStakeLoading: false,
    isUnstakeLoading: false,
    handleAddTokenToWallet: jest.fn(),
  };

  const defaultTxHistoryHookData: IStakedAVAXTxHistory = {
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
    (useStakedAAVAXBData as jest.Mock).mockReturnValue(
      defaultStakedAAVAXBHookData,
    );

    (useStakedAVAXTxHistory as jest.Mock).mockReturnValue(
      defaultTxHistoryHookData,
    );

    (useDialog as jest.Mock).mockReturnValue(defaultUseDialogHookData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(
      <MemoryRouter>
        <StakedAAVAXB />
      </MemoryRouter>,
    );

    const symbol = await screen.findByText(Token.aAVAXb);
    const network = await screen.findByText(networkName);

    expect(symbol).toBeInTheDocument();
    expect(network).toBeInTheDocument();
  });
});
