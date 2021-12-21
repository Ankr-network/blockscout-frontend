import { Box, Grid, Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { t } from 'modules/i18n/utils/intl';
import React from 'react';
import { NavLink } from 'uiKit/NavLink';
import { useFeatureItemStyles } from './useFeatureItemStyles';

interface IFeatureItemProps {
  title: string;
  mainHref: string;
  moreHref?: string;
}

export const FeatureItem = ({
  title,
  mainHref,
  moreHref,
}: IFeatureItemProps) => {
  // todo: update styles according to the design
  const classes = useFeatureItemStyles();

  return (
    <Paper className={classNames(classes.root)}>
      <Box mb={2}>
        {/* todo: use relevant icon */}
        <b style={{ fontSize: 32 }}>💲</b>
      </Box>

      <Box mb={3}>
        <Typography>{title}</Typography>
      </Box>

      <Grid spacing={2} container>
        <Grid item xs={12} sm>
          <NavLink href={mainHref} variant="contained" fullWidth>
            {/* todo: translations */}
            {t('Stake')}
          </NavLink>
        </Grid>

        {moreHref && (
          <Grid item xs={12} sm>
            <NavLink href={moreHref} variant="outlined" fullWidth>
              {/* todo: translations */}
              {t('Learn more')}
            </NavLink>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
