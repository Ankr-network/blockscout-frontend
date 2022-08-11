import { render, screen, fireEvent } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import BigNumber from 'bignumber.js';

import { Token } from 'modules/common/types/token';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';

import { PortfolioChart, IPortfolioChartProps } from '..';

describe('modules/dashboard/components/PortfolioChart', () => {
  const defaultProps: IPortfolioChartProps = {
    data: [
      {
        name: Token.aETHb,
        percent: 50,
        usdAmount: new BigNumber(5_000),
        amount: new BigNumber(1),
        icon: <AETHBIcon />,
      },
      {
        name: Token.aETHc,
        percent: 20,
        usdAmount: new BigNumber(2_000),
        amount: new BigNumber(1),
        icon: <AETHCIcon />,
      },
      {
        name: Token.ETH,
        percent: 30,
        usdAmount: new BigNumber(3_000),
        amount: new BigNumber(1),
        icon: <EthIcon />,
      },
    ],
    isLoading: false,
    height: 350,
    width: 350,
  };

  test('should render properly', async () => {
    render(<PortfolioChart {...defaultProps} />);

    const title = await screen.findByText('My portfolio');
    const chart = await screen.findByTestId('portfolio-chart');

    expect(title).toBeInTheDocument();
    expect(chart).toBeInTheDocument();
  });

  test('should render loading state properly', async () => {
    render(<PortfolioChart {...defaultProps} isLoading />);

    const loading = await screen.findByTestId('portfolio-chart-loading-state');

    expect(loading).toBeInTheDocument();
  });

  test('should render tooltips on hover properly', async () => {
    render(<PortfolioChart {...defaultProps} />);

    const aETHb = await screen.findByTestId(Token.aETHb);
    const aETHc = await screen.findByTestId(Token.aETHc);
    const eth = await screen.findByTestId(Token.ETH);

    expect(aETHb).toBeInTheDocument();
    expect(aETHc).toBeInTheDocument();
    expect(eth).toBeInTheDocument();

    fireEvent.mouseOver(aETHb);
    const [aETHbPercent] = await screen.findAllByText(/50%/);
    expect(aETHbPercent).toBeInTheDocument();
    fireEvent.mouseOut(aETHb);

    fireEvent.mouseOver(aETHc);
    const [aETHcPercent] = await screen.findAllByText(/20%/);
    expect(aETHcPercent).toBeInTheDocument();
    fireEvent.mouseOut(aETHc);

    fireEvent.mouseOver(eth);
    const [ethPercent] = await screen.findAllByText(/30%/);
    expect(ethPercent).toBeInTheDocument();
    fireEvent.mouseOut(eth);
  });

  test('should hover legend item', async () => {
    render(<PortfolioChart {...defaultProps} />);

    const item = await screen.findByTestId('legend-aETHb');

    act(() => {
      userEvent.hover(item);
    });

    act(() => {
      userEvent.unhover(item);
    });

    expect(item).toBeInTheDocument();
  });
});
