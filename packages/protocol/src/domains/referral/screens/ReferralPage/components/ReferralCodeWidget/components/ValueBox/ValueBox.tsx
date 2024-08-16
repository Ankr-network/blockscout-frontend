import { Box, Typography } from '@mui/material';

import { useIsSMDown } from 'uiKit/Theme/useTheme';

import { CopyButton } from '../CopyButton';
import { useValieBoxStyles } from './useValueBoxStyles';

export interface IValueBoxProps {
  copyValue?: string;
  title: string;
  value: string;
}

export const ValueBox = ({
  title,
  value,
  copyValue = value,
}: IValueBoxProps) => {
  const isMobile = useIsSMDown();
  const [titleVariant, valueVariant, copyButtonSize] = isMobile
    ? (['subtitle3', 'body3', 'extraSmall'] as const)
    : (['subtitle2', 'body2', 'small'] as const);

  const { classes } = useValieBoxStyles();

  return (
    <div className={classes.root}>
      <Typography variant={titleVariant}>{title}</Typography>
      <Typography
        className={classes.box}
        component={Box}
        variant={valueVariant}
      >
        {value}
        <CopyButton size={copyButtonSize} text={copyValue} />
      </Typography>
    </div>
  );
};
