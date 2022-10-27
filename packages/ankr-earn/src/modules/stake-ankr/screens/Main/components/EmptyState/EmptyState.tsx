import { Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { t } from 'common';

import { DOCS_ANKR_TOKEN_STAKING_LINK } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import ankrBigLogo from 'modules/stake-ankr/assets/ankr-logo-big.jpg';
import { Button } from 'uiKit/Button';

import { RoutesConfig } from '../../../../RoutesConfig';
import { HowItWorksDialog } from '../HowItWorksDialog';

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

        <Typography className={classNames(classes.wrapper, classes.desc)}>
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
        docsLink={DOCS_ANKR_TOKEN_STAKING_LINK}
        nodeProviderLink={RoutesConfig.providers.generatePath()}
        open={isOpenedHowItWorks}
        onClose={onCloseHowItWorks}
      />
    </>
  );
};
