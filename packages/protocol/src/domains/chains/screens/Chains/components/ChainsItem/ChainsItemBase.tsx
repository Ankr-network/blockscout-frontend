import { Button } from '@material-ui/core';
import { NavLink } from 'ui';

import { ChainLabel } from 'modules/common/components/ChainMainInfo/ChainLabel';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';
import { ChainsItemBaseProps } from './ChainsItemTypes';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { t } from 'modules/i18n/utils/intl';
import { useChainsItem } from '../../hooks/useChainsItem';
import { useStyles } from './ChainsItemStyles';

export const ChainsItemBase = ({
  chain,
  description,
  isHighlighted = false,
  isLoading,
  isPremium,
  logoSrc,
  name,
  period,
  timeframe,
  totalRequests,
  chainsItemLink,
  chainsItemButton,
  handleOriginUrlClick,
}: ChainsItemBaseProps) => {
  const classes = useStyles(isHighlighted);

  const { label, isSui, tooltip } = useChainsItem(chain, isPremium);

  return (
    <div role="button" tabIndex={0} onClick={handleOriginUrlClick}>
      <NavLink
        isRouterLink
        href={ChainsRoutesConfig.chainDetails.generatePath(chain.id)}
        tabIndex={0}
        className={classes.root}
      >
        <ChainMainInfo
          className={classes.mainInfo}
          description={
            description && (
              <ChainRequestsLabel description={description} label={period} />
            )
          }
          isHighlighted={isHighlighted}
          isLoading={isLoading}
          label={
            (chain.isArchive || isSui) && (
              <ChainLabel
                className={classes.archive}
                label={label}
                tooltip={tooltip}
              />
            )
          }
          logoSrc={logoSrc}
          name={name}
          timeframe={timeframe}
          totalRequests={totalRequests}
        />
        <div className={classes.bottom}>
          <div className={classes.links}>{chainsItemLink}</div>
          <div className={classes.buttonsWrapper}>
            {chainsItemButton && chainsItemButton}
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              {t('chains.more-details')}
            </Button>
          </div>
        </div>
      </NavLink>
    </div>
  );
};
