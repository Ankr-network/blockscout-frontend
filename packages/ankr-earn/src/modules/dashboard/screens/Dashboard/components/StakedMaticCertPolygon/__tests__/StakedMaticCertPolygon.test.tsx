import { EEthereumNetworkId } from '@ankr.com/provider-core';
import { render, screen } from '@testing-library/react';
import BigNumber from 'bignumber.js';
import { MemoryRouter } from 'react-router';

import { Token } from 'modules/common/types/token';

import { StakedMaticCertPolygon } from '../StakedMaticCertPolygon';
import {
  IUseStakedMaticCertPolygon,
  useStakedMaticCertPolygon,
} from '../useStakedMaticCertPolygon';
import {
  IUseStakedMaticCertPolygonAnalytics,
  useStakedMaticCertPolygonAnalytics,
} from '../useStakedMaticCertPolygonAnalytics';
import { IUseTokenInfoDialog, useTokenInfoDialog } from '../useTokenInfoDialog';

jest.mock('../useStakedMaticCertPolygon', () => ({
  useStakedMaticCertPolygon: jest.fn(),
}));

jest.mock('../useStakedMaticCertPolygonAnalytics', () => ({
  useStakedMaticCertPolygonAnalytics: jest.fn(),
}));

jest.mock('../useTokenInfoDialog', () => ({
  useTokenInfoDialog: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAMATICC', () => {
  const defaultStakedMATICHookData: IUseStakedMaticCertPolygon = {
    amount: new BigNumber(1),
    isLoading: false,
    isStakeLoading: false,
    network: 'ETH',
    chainId: EEthereumNetworkId.goerli,
    stakeLink: 'stake',
    token: Token.aMATICc,
    unstakeLink: 'unstake',
    tradeLink: '/defi',
  };

  const defaultStakedAMATICCAnalyticsData: IUseStakedMaticCertPolygonAnalytics =
    {
      onAddStakingClick: jest.fn(),
    };

  const defaultTokenInfoDialogData: IUseTokenInfoDialog = {
    description: 'string',
    isOpenedInfo: false,
    moreHref: '',
    tokenAddress: '0x00',
    onOpenInfo: jest.fn(),
    onCloseInfo: jest.fn(),
    handleAddToken: jest.fn(),
  };

  beforeEach(() => {
    (useStakedMaticCertPolygon as jest.Mock).mockReturnValue(
      defaultStakedMATICHookData,
    );

    (useStakedMaticCertPolygonAnalytics as jest.Mock).mockReturnValue(
      defaultStakedAMATICCAnalyticsData,
    );

    (useTokenInfoDialog as jest.Mock).mockReturnValue(
      defaultTokenInfoDialogData,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(
      <MemoryRouter>
        <StakedMaticCertPolygon />
      </MemoryRouter>,
    );

    const symbol = await screen.findByText('aMATICc');
    const network = await screen.findByText('ETH');

    expect(symbol).toBeInTheDocument();
    expect(network).toBeInTheDocument();
  });
});
