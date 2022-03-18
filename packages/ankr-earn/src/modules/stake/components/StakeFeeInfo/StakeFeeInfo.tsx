import { Box, BoxProps } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';

import { t } from 'modules/i18n/utils/intl';

import { useStakeFeeInfoStyles } from './useStakeFeeInfoStyles';

interface IStakeFeeInfoProps extends BoxProps {
  value: string;
  isLoading?: boolean;
}

export const StakeFeeInfo = ({
  className,
  value,
  isLoading,
  ...restProps
}: IStakeFeeInfoProps): JSX.Element => {
  const classes = useStakeFeeInfoStyles();

  return (
    <Box {...restProps} className={classNames(classes.root, className)}>
      {isLoading ? (
        <>
          {t('stake.stats.fee', { value: '' })}

          <Box component={Skeleton} ml={1} width={20} />
        </>
      ) : (
        t('stake.stats.fee', { value })
      )}
    </Box>
  );
};
