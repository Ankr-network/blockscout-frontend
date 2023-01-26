import { render, screen } from '@testing-library/react';

import { StakeDescriptionAmount } from '..';

describe('modules/stake/components/StakeDescriptionAmount', () => {
  test('should render properly', async () => {
    render(<StakeDescriptionAmount symbol="ETH" value="1,000" />);

    const title = await screen.findByText('1,000');
    expect(title).toBeInTheDocument();
  });
});
