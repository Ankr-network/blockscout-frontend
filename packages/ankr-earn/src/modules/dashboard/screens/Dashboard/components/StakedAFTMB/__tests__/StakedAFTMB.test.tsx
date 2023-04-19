import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { ONE_ETH } from 'modules/common/const';
import { useDialog } from 'modules/dialogs';

import { useStakedFTMTxHistory } from '../../../hooks/liquid-tokens/FTM/useStakedFTMTxHistory';
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

jest.mock('modules/dialogs', () => ({
  useDialog: jest.fn(),
  EKnownDialogs: { history: 'history' },
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

  const defaultUseDialogHookData = {
    handleOpen: jest.fn(),
  };

  beforeEach(() => {
    (useStakedAFTMBData as jest.Mock).mockReturnValue(
      defaultStakedAFTMBHookData,
    );

    (useStakedFTMTxHistory as jest.Mock).mockReturnValue({});

    (useDialog as jest.Mock).mockReturnValue(defaultUseDialogHookData);
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
});