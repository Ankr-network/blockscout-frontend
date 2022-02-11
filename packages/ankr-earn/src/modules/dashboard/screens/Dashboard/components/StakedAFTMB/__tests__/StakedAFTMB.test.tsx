import { render, screen } from '@testing-library/react';
import { ONE_ETH, ZERO } from 'modules/common/const';
import { MemoryRouter } from 'react-router';
import { StakedAFTMB } from '..';
import {
  IStakedAFTMBData,
  useStakedAFTMBData,
} from '../../StakedTokens/hooks/useStakedAFTMBData';

jest.mock('../../StakedTokens/hooks/useStakedAFTMBData', () => ({
  useStakedAFTMBData: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAFTMB', () => {
  const defaultStakedAFTMBHookData: IStakedAFTMBData = {
    amount: ONE_ETH.dividedBy(10 ** 18),
    pendingValue: ZERO,
    network: 'Fantom Opera',
    isShowed: true,
    isBalancesLoading: false,
    stakeLink: '/stake',
    isStakeLoading: false,
  };

  beforeEach(() => {
    (useStakedAFTMBData as jest.Mock).mockReturnValue(
      defaultStakedAFTMBHookData,
    );
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
