import { render, screen } from '@testing-library/react';

import { Token } from 'modules/common/types/token';

import { SwapOptions } from '..';

describe('modules/switcher/screens/Main/components/SwapOptions', () => {
  const defaultProps = {
    from: Token.aETHc,
    to: Token.aETHb,
    onChooseFrom: jest.fn(),
    onChooseTo: jest.fn(),
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', () => {
    render(<SwapOptions {...defaultProps} />);

    const aethbChip = screen.getByTestId('aETHb-chip');
    const aethcChip = screen.getByTestId('aETHc-chip');

    expect(aethbChip).toBeInTheDocument();
    expect(aethcChip).toBeInTheDocument();
  });
});
