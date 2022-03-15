import { Box, Grid, Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';

import { t } from 'modules/i18n/utils/intl';
import { NavLink } from 'uiKit/NavLink';

import { useFeatureLegacyItemStyles } from './useFeatureLegacyItemStyles';

interface IFeatureItemProps {
  title: string;
  mainHref: string;
  iconSlot: JSX.Element;
}

export const FeatureLegacyItem = ({
  title,
  mainHref,
  iconSlot,
}: IFeatureItemProps): JSX.Element => {
  const classes = useFeatureLegacyItemStyles();

  return (
    <Paper className={classNames(classes.root)}>
      {React.cloneElement(iconSlot, {
        className: classes.icon,
      })}

      <Box mb={2}>
        <Typography className={classes.title}>{title}</Typography>
      </Box>

      <Box className={classNames(classes.statsButtonsWrapper)}>
        <Grid container className={classNames(classes.buttons)} spacing={2}>
          <Grid item xs>
            <NavLink
              className={classes.button}
              href={mainHref}
              variant="outlined"
            >
              {t('features.stake-old')}
            </NavLink>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
