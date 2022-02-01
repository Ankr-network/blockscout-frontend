import { render, screen } from '@testing-library/react';

import { Main } from '..';

describe('modules/eth2Swap/screens/Main', () => {
  test('should render properly', () => {
    render(<Main />);

    const title = screen.getByText('ETH2 Swap');
    expect(title).toBeInTheDocument();
  });
});
