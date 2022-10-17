import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ONE, ZERO_ADDR } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { StakedASETHC } from '../StakedASETHC';
import { IUseStakedASETHCData, useStakedASETHC } from '../useStakedASETHC';
import {
  IUseStakedASETHCAnalyticsData,
  useStakedASETHCAnalytics,
} from '../useStakedASETHCAnalytics';
import {
  IUseTokenInfoDialogData,
  useTokenInfoDialog,
} from '../useTokenInfoDialog';

jest.mock('../useStakedASETHC', () => ({
  useStakedASETHC: jest.fn(),
}));

jest.mock('../useStakedASETHCAnalytics', () => ({
  useStakedASETHCAnalytics: jest.fn(),
}));

jest.mock('../useTokenInfoDialog', () => ({
  useTokenInfoDialog: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedASETHC', () => {
  const defaultStakedMainData: IUseStakedASETHCData = {
    amount: ONE,
    isLoading: false,
    isStakeLoading: false,
    network: Token.ETH,
    stakeLink: 'stake',
    token: Token.asETHc,
    unstakeLink: 'unstake',
  };

  const defaultStakedAnalyticsData: IUseStakedASETHCAnalyticsData = {
    onAddStakingClick: jest.fn(),
  };

  const defaultTokenInfoDialogData: IUseTokenInfoDialogData = {
    description: 'description',
    isOpenedInfo: false,
    moreHref: undefined,
    tokenAddress: ZERO_ADDR,
    onAddToken: jest.fn(),
    onCloseInfo: jest.fn(),
    onOpenInfo: jest.fn(),
  };

  beforeEach(() => {
    (useStakedASETHC as jest.Mock).mockReturnValue(defaultStakedMainData);

    (useStakedASETHCAnalytics as jest.Mock).mockReturnValue(
      defaultStakedAnalyticsData,
    );

    (useTokenInfoDialog as jest.Mock).mockReturnValue(
      defaultTokenInfoDialogData,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should be rendered', async () => {
    render(
      <MemoryRouter>
        <StakedASETHC />
      </MemoryRouter>,
    );

    const network = await screen.findByText(Token.ETH);
    const token = await screen.findByText(Token.asETHc);

    expect(network).toBeInTheDocument();
    expect(token).toBeInTheDocument();
  });
});
