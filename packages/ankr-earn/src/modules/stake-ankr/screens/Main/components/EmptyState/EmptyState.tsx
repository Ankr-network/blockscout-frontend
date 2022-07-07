import { Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { t } from 'common';

import { useDialog } from 'modules/common/hooks/useDialog';
import { Button } from 'uiKit/Button';

import { HowItWorksDialog } from '../HowItWorksDialog';

import ankrBigLogo from './assets/ankr-logo-big.png';
import { Description } from './Description';
import { useEmptyStateStyles } from './useEmptyStateStyles';

export const EmptyState = (): JSX.Element => {
  const classes = useEmptyStateStyles();

  const {
    isOpened: isOpenedHowItWorks,
    onClose: onCloseHowItWorks,
    onOpen: onOpenHowItWorks,
  } = useDialog();

  return (
    <>
      <Paper className={classes.paper}>
        {/* todo: add 2x img support */}

        <img alt="" className={classes.bigLogo} src={ankrBigLogo} />

        <Typography className={classes.wrapper} variant="h3">
          {t('stake-ankr.empty-state.start')}
        </Typography>

        <Typography className={classes.wrapper}>
          {t('stake-ankr.empty-state.start-description')}
        </Typography>

        <Button
          className={classNames(classes.button, classes.wrapper)}
          variant="outlined"
          onClick={onOpenHowItWorks}
        >
          {t('stake-ankr.empty-state.how-it-works')}
        </Button>

        <Description />
      </Paper>

      <HowItWorksDialog
        docsLink="docsLink"
        nodeProviderLink="nodeProviderLink"
        open={isOpenedHowItWorks}
        onClose={onCloseHowItWorks}
      />
    </>
  );
};
