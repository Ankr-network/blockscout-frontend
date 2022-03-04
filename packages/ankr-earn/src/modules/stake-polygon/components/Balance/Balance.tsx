import { IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { PlusMinusBtn } from 'modules/common/components/PlusMinusBtn';
import { DEFAULT_FIXED } from 'modules/common/const';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { AMATICBIcon } from 'uiKit/Icons/AMATICBIcon';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';

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
}: IBalanceProps): JSX.Element => {
  const classes = useBalanceStyles();

  return (
    <Paper
      className={classNames(classes.root)}
      square={false}
      variant="outlined"
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
              className={classes.price}
              color="textSecondary"
              variant="subtitle1"
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
