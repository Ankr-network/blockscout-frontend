import { Box, BoxProps, Grid, Typography } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import React, { ReactNode } from 'react';
import { NavLink } from 'uiKit/NavLink';
import { useHeaderStyles } from './useHeaderStyles';

interface IHeaderProps extends BoxProps {
  formSlot?: ReactNode;
  fairValueSlot?: ReactNode;
  footnote?: string;
  footnoteLink?: string;
}

export const HeaderComponent = ({
  formSlot,
  fairValueSlot,
  footnote,
  footnoteLink,
  ...boxProps
}: IHeaderProps) => {
  const classes = useHeaderStyles();

  return (
    <Box {...boxProps}>
      <Typography variant="h4" component="h1" className={classes.title}>
        {t('trading-cockpit.header.title')}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm>
          {formSlot}

          {footnote && footnoteLink && (
            <div className={classes.footnote}>
              {footnote}{' '}
              <NavLink
                href={footnoteLink}
                className={classes.link}
                color="primary"
              >
                {t('trading-cockpit.header.link')}
              </NavLink>
            </div>
          )}
        </Grid>

        <Grid item xs={12} sm="auto">
          {fairValueSlot}
        </Grid>
      </Grid>
    </Box>
  );
};
