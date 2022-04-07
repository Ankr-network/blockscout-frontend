import { render, screen } from '@testing-library/react';
import BigNumber from 'bignumber.js';

import { Stepper } from '..';

describe('modules/switcher/screens/Main/components/Stepper', () => {
  test('should render properly', () => {
    const { rerender } = render(<Stepper allowance={new BigNumber(0)} />);

    {
      const steps = screen.getAllByTestId('step');
      expect(steps).toHaveLength(2);
    }

    rerender(<Stepper allowance={new BigNumber(1)} />);

    {
      const steps = screen.getAllByTestId('step');
      expect(steps).toHaveLength(2);
    }
  });
});
