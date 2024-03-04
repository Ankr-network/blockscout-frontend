import { Typography, TypographyOwnProps } from '@mui/material';
import { ReactNode } from 'react';

import { useTxAttributeStyles } from './useTxAttributeStyles';

export interface ITxAttributeProps {
  children: ReactNode;
  className?: string;
  classes?: Partial<ReturnType<typeof useTxAttributeStyles>['classes']>;
  extraContent?: ReactNode;
  label: ReactNode;
  labelVariant?: TypographyOwnProps['variant'];
}

export const TxAttribute = ({
  children,
  className,
  classes: classesOverrides,
  extraContent,
  label,
  labelVariant = 'body2',
}: ITxAttributeProps) => {
  const { classes, cx } = useTxAttributeStyles(undefined, {
    props: { classes: classesOverrides },
  });

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.content}>
        <Typography className={classes.label} variant={labelVariant}>
          {label}
        </Typography>
        {children}
      </div>
      {extraContent && (
        <div className={classes.extraContent}>{extraContent}</div>
      )}
    </div>
  );
};
