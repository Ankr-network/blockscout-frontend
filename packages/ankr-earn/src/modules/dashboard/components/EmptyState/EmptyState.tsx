import { Box, Paper, Typography } from '@material-ui/core';
import { ReactNode } from 'react';

import { t } from 'common';

import { RoutesConfig } from 'modules/stake/Routes';
import { NavLink } from 'uiKit/NavLink';

import { CalcSpoiler } from '../CalcSpoiler';

import coinsMobileImg from './assets/coins-mobile.png';
import coinsMobileImg2x from './assets/coins-mobile@2x.png';
import coinsImg from './assets/coins.png';
import coinsImg2x from './assets/coins@2x.png';
import { useEmptyStateStyles } from './useEmptyStateStyles';

const STAKE_PATH = RoutesConfig.main.generatePath();

const imgSources = {
  tablet: coinsImg,
  tablet2x: coinsImg2x,
  mobile: coinsMobileImg,
  mobile2x: coinsMobileImg2x,
};

interface IEmptyStateProps {
  calcSlot?: ReactNode;
}

export const EmptyState = ({ calcSlot }: IEmptyStateProps): JSX.Element => {
  const classes = useEmptyStateStyles();

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant="h2">
        {t('dashboard.empty.title')}
      </Typography>

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

      <NavLink
        fullWidth
        className={classes.button}
        href={STAKE_PATH}
        size="large"
        variant="contained"
      >
        {t('dashboard.empty.btn')}
      </NavLink>

      {calcSlot && (
        <Box mt={3}>
          <CalcSpoiler>{calcSlot}</CalcSpoiler>
        </Box>
      )}
    </Paper>
  );
};
