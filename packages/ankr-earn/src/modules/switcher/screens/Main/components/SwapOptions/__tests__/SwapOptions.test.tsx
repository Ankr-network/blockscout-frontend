import { render, screen } from '@testing-library/react';

import { Token } from 'modules/common/types/token';

import { SwapOptions } from '..';

describe('modules/switcher/screens/Main/components/SwapOptions', () => {
  const defaultProps = {
    swapOption: Token.aETHc as const,
    onChooseAEthB: jest.fn(),
    onChooseAEthC: jest.fn(),
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

  test('should choose chips properly', () => {
    render(<SwapOptions {...defaultProps} />);

    const aethbChip = screen.getByTestId('aETHb-chip');
    aethbChip.click();

    const aethcChip = screen.getByTestId('aETHc-chip');
    aethcChip.click();

    expect(defaultProps.onChooseAEthB).toBeCalledTimes(1);
    expect(defaultProps.onChooseAEthC).toBeCalledTimes(1);
  });

  test('should choose aETHc chip when clicking on arrow', () => {
    render(<SwapOptions {...defaultProps} swapOption={Token.aETHb} />);

    const arrow = screen.getByTestId('arrow-chip');
    arrow.click();

    expect(defaultProps.onChooseAEthC).toBeCalledTimes(1);
  });

  test('should choose aETHb chip when clicking on arrow', () => {
    render(<SwapOptions {...defaultProps} swapOption={Token.aETHc} />);

    const arrow = screen.getByTestId('arrow-chip');
    arrow.click();

    expect(defaultProps.onChooseAEthB).toBeCalledTimes(1);
  });
});
