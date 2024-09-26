import { ReactNode } from 'react';
import { Typography } from '@mui/material';

import { useSectionStyles } from './useSectionStyles';

export type TSectionClasses = Partial<
  ReturnType<typeof useSectionStyles>['classes']
>;

export interface ISectionProps {
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  classes?: TSectionClasses;
  title: string;
}

export const Section = ({
  actions,
  children,
  className,
  classes: classesOverrides,
  title,
}: ISectionProps) => {
  const hasActions = Boolean(actions);

  const { classes, cx } = useSectionStyles(
    { hasActions },
    {
      props: { classes: classesOverrides },
    },
  );

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.header}>
        <Typography className={classes.title} variant="h6">
          {title}
        </Typography>
        {actions && <div className={classes.actions}>{actions}</div>}
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};
