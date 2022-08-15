import { t } from 'common';

import { DEFAULT_ROUNDING, ETH_NETWORK_BY_ENV } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { Amount } from 'modules/dashboard/components/Amount';
import {
  DashboardCard,
  DashboardCardSkeleton,
} from 'modules/dashboard/components/DashboardCard';
import { NetworkIconText } from 'modules/dashboard/components/NetworkIconText';
import { NavLink } from 'uiKit/NavLink';

import { useStakedANKRData } from '../StakedTokens/hooks/ANKR/useStakedANKRData';

import { useStakedANKRStyles } from './useStakedANKRStyles';

export const StakedANKR = (): JSX.Element => {
  const classes = useStakedANKRStyles();

  const { stakedAmount, stakedUsdEquivalent, network, manageLink, loading } =
    useStakedANKRData();

  if (loading) {
    return <DashboardCardSkeleton />;
  }

  const usdValue = t('unit.usd-value', {
    value: stakedUsdEquivalent.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
  });

  return (
    <DashboardCard
      amountSlot={
        <Amount infoSlot={usdValue} value={stakedAmount.integerValue()} />
      }
      buttonsSlot={
        <NavLink
          className={classes.manageButton}
          href={manageLink}
          variant="outlined"
        >
          {t('dashboard.card.manage')}
        </NavLink>
      }
      networkAndIconSlot={
        <NetworkIconText
          chainId={ETH_NETWORK_BY_ENV}
          network={network}
          token={Token.ANKR}
        />
      }
    />
  );
};
