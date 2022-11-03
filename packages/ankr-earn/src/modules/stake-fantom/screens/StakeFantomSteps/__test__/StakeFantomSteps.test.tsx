import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ZERO } from 'modules/common/const';

import { StakeFantomSteps } from '../StakeFantomSteps';
import { useStakeFantomStepsHook } from '../useStakeFantomStepsHook';

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: () => ({ chainId: 1 }),
}));

jest.mock('../useStakeFantomStepsHook', () => ({
  useStakeFantomStepsHook: jest.fn(),
}));

describe('modules/stake-fantom/screens/StakeFantomSteps', () => {
  const defaultData = {
    txHash: 'hash',
    symol: 'aFTMb',
    amount: ZERO,
    destinationAddress: 'address',
    isLoading: false,
    isPending: false,
    handleAddTokenToWallet: jest.fn(),
  };

  beforeEach(() => {
    (useStakeFantomStepsHook as jest.Mock).mockReturnValue(defaultData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(
      <MemoryRouter>
        <StakeFantomSteps />
      </MemoryRouter>,
    );

    const title = await screen.findByText('Stake successful!');
    expect(title).toBeInTheDocument();
  });
});
