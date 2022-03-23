import { Box, BoxProps } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';

import { t } from 'modules/i18n/utils/intl';

import { useStakeFeeInfoStyles } from './useStakeFeeInfoStyles';

const DECIMAL_PLACES = 6;

interface IStakeFeeInfoProps extends BoxProps {
  token: string;
  value: BigNumber;
  isLoading?: boolean;
}

export const StakeFeeInfo = ({
  className,
  value,
  isLoading,
  token,
  ...restProps
}: IStakeFeeInfoProps): JSX.Element => {
  const classes = useStakeFeeInfoStyles();
  const formattedValue = value.decimalPlaces(DECIMAL_PLACES).toFormat();
  const tokenValue = t('unit.token-value', { token, value: formattedValue });

  return (
    <Box {...restProps} className={classNames(classes.root, className)}>
      {isLoading ? (
        <>
          {t('stake.stats.fee', { value: '' })}

          <Box component={Skeleton} ml={1} width={40} />
        </>
      ) : (
        t('stake.stats.fee', { value: tokenValue })
      )}
    </Box>
  );
};
