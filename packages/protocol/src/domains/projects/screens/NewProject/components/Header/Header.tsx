import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { ExternalLink } from '@ankr.com/ui';

import { NavLink } from 'uiKit/NavLink';
import { newProjectIntlRoot } from 'domains/projects/const';
import { NewProjectStep } from 'domains/projects/types';

import { useHeaderStyles } from './useHeaderStyles';
import { Stepper } from '../Stepper';
import { LINK_PROJECT_GETTING_STARTED } from '../../const';

interface HeaderProps {
  step: NewProjectStep;
}

export const Header = ({ step }: HeaderProps) => {
  const { classes } = useHeaderStyles();

  return (
    <div className={classes.root}>
      <div className={classes.internalRoot}>
        <div className={classes.firstRow}>
          <Typography className={classes.title} variant="h5">
            {t(`${newProjectIntlRoot}.title`)}
          </Typography>
          <NavLink className={classes.link} href={LINK_PROJECT_GETTING_STARTED}>
            {t(`${newProjectIntlRoot}.how-to-get-started`)}
            <ExternalLink color="primary" />
          </NavLink>
        </div>
        <Stepper step={step} />
      </div>
    </div>
  );
};
