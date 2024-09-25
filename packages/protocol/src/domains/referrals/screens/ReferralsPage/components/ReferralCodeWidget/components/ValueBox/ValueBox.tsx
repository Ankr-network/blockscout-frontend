import { ReactNode } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';

import { Placeholder } from 'modules/common/components/Placeholder';
import { useIsSMDown } from 'uiKit/Theme/useTheme';

import { CopyButton } from '../CopyButton';
import { useValieBoxStyles } from './useValueBoxStyles';

export interface IValueBoxProps {
  copyValue?: string;
  isLoading?: boolean;
  title: string;
  value: ReactNode;
}

export const ValueBox = ({
  isLoading = false,
  title,
  value,
  copyValue = typeof value === 'string' ? value : '',
}: IValueBoxProps) => {
  const isMobile = useIsSMDown();
  const [titleVariant, valueVariant, copyButtonSize] = isMobile
    ? (['subtitle3', 'body3', 'extraSmall'] as const)
    : (['subtitle2', 'body2', 'small'] as const);

  const { classes } = useValieBoxStyles();

  return (
    <div className={classes.root}>
      <Typography variant={titleVariant}>{title}</Typography>
      <Placeholder
        hasPlaceholder={isLoading}
        placeholder={
          <Skeleton className={classes.skeleton} variant="rectangular" />
        }
      >
        <Typography
          className={classes.box}
          component={Box}
          variant={valueVariant}
        >
          {value}
          <CopyButton size={copyButtonSize} text={copyValue} />
        </Typography>
      </Placeholder>
    </div>
  );
};
