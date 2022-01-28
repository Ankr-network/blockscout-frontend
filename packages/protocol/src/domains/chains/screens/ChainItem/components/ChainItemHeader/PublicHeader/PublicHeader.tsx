import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import { ArrowRightIcon } from 'uiKit/Icons/ArrowRightIcon';
import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { PlanRoutesConfig } from 'domains/plan/Routes';

import { useStyles } from './PublicHeaderStyles';

export const PublicHeader = ({ isPlural }: { isPlural: boolean }) => {
  const classes = useStyles();

  return (
    <div className={classes.bottom}>
      <TooltipWrapper
        className={classes.tooltip}
        tooltipText={tHTML('chain-item.header.tooltipText')}
      >
        <Typography variant="body2" className={classes.text}>
          {t('chain-item.header.private-endpoints', {
            plural: isPlural ? t('chain-item.header.plural') : '',
          })}
        </Typography>
      </TooltipWrapper>

      <Button
        className={classes.btnUnlock}
        component={RouterLink}
        to={PlanRoutesConfig.plan.generatePath()}
        endIcon={<ArrowRightIcon className={classes.icon} />}
      >
        {t('chain-item.header.button')}
      </Button>
    </div>
  );
};
