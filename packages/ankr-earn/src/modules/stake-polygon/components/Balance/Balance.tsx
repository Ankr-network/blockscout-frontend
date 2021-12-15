import { IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { DEFAULT_FIXED } from 'modules/common/const';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { PlusMinusBtn } from 'components/PlusMinusBtn';
import { AMATICBIcon } from 'uiKit/StakefiUiKit/Icons/AMATICBIcon';
import { QuestionIcon } from 'uiKit/StakefiUiKit/Icons/QuestionIcon';
import { RoutesConfig } from '../../Routes';
import { useBalanceStyles } from './BalanceStyles';

export enum EBalancePropsVariants {
  aMATICb = 'aMATICb',
}

const TOKEN_ICONS = {
  [EBalancePropsVariants.aMATICb]: <AMATICBIcon />,
};

export interface IBalanceProps {
  isLoading?: boolean;
  price?: BigNumber;
  value: BigNumber;
  variant: EBalancePropsVariants;
  actions?: ReactNode;
}

// TODO merge with ETH Balance
export const Balance = ({
  isLoading,
  price,
  value,
  variant,
  actions,
}: IBalanceProps) => {
  const classes = useBalanceStyles();

  return (
    <Paper
      variant="outlined"
      square={false}
      className={classNames(classes.root)}
    >
      <div className={classes.top}>
        <div className={classes.titleContainerArea}>
          <div className={classes.titleContainer}>
            <div className={classes.title}>
              <div className={classes.icon}>{TOKEN_ICONS[variant]}</div>

              {t(`balance.token-name.${variant}`)}
            </div>

            <Tooltip
              className={classes.tooltip}
              title={tHTML(`balance.tip.${variant}`)}
            >
              <IconButton>
                <QuestionIcon size="xs" />
              </IconButton>
            </Tooltip>
          </div>

          {price instanceof BigNumber && (
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.price}
            >
              {t(`balance.price.${variant}`, {
                value: price.decimalPlaces(DEFAULT_FIXED).toNumber(),
              })}
            </Typography>
          )}
        </div>
      </div>

      <div className={classes.bottom}>
        <div className={classes.amount}>
          {tHTML(`balance.amount.${variant}`, {
            value: value.decimalPlaces(DEFAULT_FIXED).toNumber(),
          })}
        </div>

        <div className={classes.actions}>
          <RouterLink to={RoutesConfig.stake.generatePath()}>
            <PlusMinusBtn
              className={classes.btnContainer}
              icon="plus"
              isLoading={isLoading}
              tooltip={t('staker-dashboard.stake')}
            />
          </RouterLink>
          {actions}
        </div>
      </div>
    </Paper>
  );
};
