import { render, screen, fireEvent } from '@testing-library/react';

import { Token } from 'modules/common/types/token';

import { PortfolioChart, IPortfolioChartProps } from '..';

describe('modules/dashboard/components/PortfolioChart', () => {
  const defaultProps: IPortfolioChartProps = {
    data: [
      { name: Token.aETHb, percent: 50 },
      { name: Token.aETHc, percent: 20 },
      { name: Token.ETH, percent: 30 },
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
    const aETHbPercent = await screen.findByText(/50%/);
    expect(aETHbPercent).toBeInTheDocument();
    fireEvent.mouseOut(aETHb);

    fireEvent.mouseOver(aETHc);
    const aETHcPercent = await screen.findByText(/20%/);
    expect(aETHcPercent).toBeInTheDocument();
    fireEvent.mouseOut(aETHc);

    fireEvent.mouseOver(eth);
    const ethPercent = await screen.findByText(/30%/);
    expect(ethPercent).toBeInTheDocument();
    fireEvent.mouseOut(eth);
  });
});
