import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ZERO } from 'modules/common/const';

import { StakeEthereumSteps } from '../StakeEthereumSteps';
import { useStakeEthereumStepsHook } from '../useStakeEthereumStepsHook';

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: () => ({ chainId: 1 }),
}));

jest.mock('../useStakeEthereumStepsHook', () => ({
  useStakeEthereumStepsHook: jest.fn(),
}));

describe('modules/stake-eth/screens/StakeEthereumSteps', () => {
  const defaultData = {
    txHash: 'hash',
    symbol: 'aETHb',
    amount: ZERO,
    destinationAddress: 'address',
    isLoading: false,
    isPending: false,
    handleAddTokenToWallet: jest.fn(),
  };

  beforeEach(() => {
    (useStakeEthereumStepsHook as jest.Mock).mockReturnValue(defaultData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(
      <MemoryRouter>
        <StakeEthereumSteps />
      </MemoryRouter>,
    );

    const title = await screen.findByText('Stake successful!');
    expect(title).toBeInTheDocument();
  });
});
