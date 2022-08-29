import { Paper, Typography } from '@material-ui/core';

import { t } from 'common';

import { RoutesConfig } from 'modules/stake/Routes';
import { NavLink } from 'uiKit/NavLink';

import portfolioImg from '../NoAssets/assets/portfolio-start-staking.png';

import coinsImg from './assets/coins.png';
import coinsImg2x from './assets/coins@2x.png';
import { useEmptyStateStyles } from './useEmptyStateStyles';

const STAKE_PATH = RoutesConfig.main.generatePath();

const imgSources = {
  tablet: coinsImg,
  tablet2x: coinsImg2x,
  // todo: use actual mobile img
  mobile: portfolioImg,
  // todo: use actual mobile img
  mobile2x: portfolioImg,
};

export const EmptyState = (): JSX.Element => {
  const classes = useEmptyStateStyles();

  return (
    <Paper className={classes.root}>
      <picture className={classes.imgWrap}>
        <source
          media="(min-width: 768px)"
          srcSet={`${imgSources.tablet}, ${imgSources.tablet2x} 2x`}
        />

        <source srcSet={`${imgSources.mobile}, ${imgSources.mobile2x} 2x`} />

        <img
          alt=""
          className={classes.img}
          loading="lazy"
          src={imgSources.tablet}
        />
      </picture>

      <Typography className={classes.title} variant="h2">
        {t('dashboard.empty.title')}
      </Typography>

      <NavLink
        className={classes.button}
        href={STAKE_PATH}
        size="large"
        variant="contained"
      >
        {t('dashboard.empty.btn')}
      </NavLink>
    </Paper>
  );
};
