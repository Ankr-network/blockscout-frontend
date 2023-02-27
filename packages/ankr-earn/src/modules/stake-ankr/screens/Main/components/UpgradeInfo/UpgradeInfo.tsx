import { t } from '@ankr.com/common';
import { Paper, Typography } from '@material-ui/core';

import { Button } from 'uiKit/Button';

import { ReactComponent as InfoIcon } from './assets/info-icon.svg';
import transferImg from './assets/transfer.png';
import transferImg2x from './assets/transfer@2x.png';
import { useUpgradeInfoStyles } from './useUpgradeInfoStyles';

export interface IUpgradeInfoProps {
  isLoading?: boolean;
  onClick?: VoidFunction;
}

export const UpgradeInfo = ({
  isLoading = false,
  onClick,
}: IUpgradeInfoProps): JSX.Element => {
  const classes = useUpgradeInfoStyles();

  return (
    <Paper className={classes.paper}>
      <div className={classes.imgWrap}>
        <img
          alt={t('stake-ankr.upgrade.img-alt')}
          className={classes.img}
          src={transferImg2x}
          srcSet={`${transferImg}, ${transferImg2x} 2x`}
        />
      </div>

      <Typography className={classes.title} variant="h3">
        {t('stake-ankr.upgrade.title')}
      </Typography>

      <Typography className={classes.description} variant="body2">
        {t('stake-ankr.upgrade.description')}
      </Typography>

      <Typography className={classes.info} variant="body2">
        <InfoIcon className={classes.infoIcon} />

        {t('stake-ankr.upgrade.info')}
      </Typography>

      <Button
        fullWidth
        disabled={isLoading}
        isLoading={isLoading}
        size="large"
        onClick={onClick}
      >
        {t('stake-ankr.upgrade.btn')}
      </Button>
    </Paper>
  );
};
