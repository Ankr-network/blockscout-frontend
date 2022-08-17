import { Box } from '@material-ui/core';

import { t, tHTML } from 'common';

import { configFromEnv } from 'modules/api/config';
import {
  DEFAULT_ROUNDING,
  DOCS_ANKR_TOKEN_STAKING_LINK,
  ETH_NETWORK_BY_ENV,
} from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { Amount } from 'modules/dashboard/components/Amount';
import {
  DashboardCard,
  DashboardCardSkeleton,
} from 'modules/dashboard/components/DashboardCard';
import { NetworkIconText } from 'modules/dashboard/components/NetworkIconText';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';
import { Menu } from 'uiKit/Menu';
import { NavLink } from 'uiKit/NavLink';

import { useStakedANKRData } from '../StakedTokens/hooks/ANKR/useStakedANKRData';

import { useStakedANKRStyles } from './useStakedANKRStyles';

export const StakedANKR = (): JSX.Element => {
  const { contractConfig } = configFromEnv();
  const classes = useStakedANKRStyles();

  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

  const { stakedAmount, stakedUsdEquivalent, network, manageLink, loading } =
    useStakedANKRData();

  if (loading) {
    return <DashboardCardSkeleton />;
  }

  const usdValue = t('unit.usd-value', {
    value: stakedUsdEquivalent.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
  });

  return (
    <>
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
        menuSlot={
          <Box component="span" display="flex">
            <Menu>
              {[
                <Menu.Item disabled={!onOpenInfo} onClick={onOpenInfo}>
                  {t('dashboard.card.tokenInfo')}
                </Menu.Item>,
              ]}
            </Menu>
          </Box>
        }
        networkAndIconSlot={
          <NetworkIconText
            chainId={ETH_NETWORK_BY_ENV}
            network={network}
            token={Token.ANKR}
          />
        }
      />

      <TokenInfoDialog
        description={tHTML('dashboard.token-info.ANKR')}
        moreHref={DOCS_ANKR_TOKEN_STAKING_LINK}
        open={isOpenedInfo}
        tokenAddress={contractConfig.ankrToken}
        tokenName={Token.ANKR}
        onClose={onCloseInfo}
      />
    </>
  );
};
