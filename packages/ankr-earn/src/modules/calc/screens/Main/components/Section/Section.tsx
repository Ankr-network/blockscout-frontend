import { Box, Hidden, Paper, Typography } from '@material-ui/core';
import { ReactNode } from 'react';

import { t } from 'common';

import { RoutesConfig } from 'modules/dashboard/Routes';
import { CloseButton } from 'uiKit/CloseButton';
import { Container } from 'uiKit/Container';

import { useSectionStyles } from './useSectionStyles';

interface ISectionProps {
  children?: ReactNode;
}

export const Section = ({ children }: ISectionProps): JSX.Element => {
  const classes = useSectionStyles();

  const renderedContent = (
    <>
      <Typography className={classes.title} component="h1" variant="h3">
        {t('calc.title')}
      </Typography>

      {children}
    </>
  );

  return (
    <Box component="section" py={{ xs: 6, md: 10 }}>
      <Container>
        <Hidden mdUp>{renderedContent}</Hidden>

        <Hidden smDown>
          <Paper className={classes.box}>
            <CloseButton href={RoutesConfig.dashboard.generatePath()} />

            <Container className={classes.wrapper}>{renderedContent}</Container>
          </Paper>
        </Hidden>
      </Container>
    </Box>
  );
};
