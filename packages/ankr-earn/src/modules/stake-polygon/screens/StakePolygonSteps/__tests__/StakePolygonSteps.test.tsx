import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ZERO } from 'modules/common/const';

import { StakePolygonSteps } from '../StakePolygonSteps';
import { useStakePolygonStepsHook } from '../useStakePolygonStepsHook';

jest.mock('modules/auth/hooks/useAuth', () => ({
  useAuth: () => ({ chainId: 1 }),
}));

jest.mock('../useStakePolygonStepsHook', () => ({
  useStakePolygonStepsHook: jest.fn(),
}));

describe('modules/stake-polygon/screens/StakePolygonSteps', () => {
  const defaultData = {
    txHash: 'hash',
    symol: 'aMATICb',
    amount: ZERO,
    destinationAddress: 'address',
    isLoading: false,
    isPending: false,
    handleAddTokenToWallet: jest.fn(),
  };

  beforeEach(() => {
    (useStakePolygonStepsHook as jest.Mock).mockReturnValue(defaultData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(
      <MemoryRouter>
        <StakePolygonSteps />
      </MemoryRouter>,
    );

    const title = await screen.findByText('Stake successful!');
    expect(title).toBeInTheDocument();
  });
});
