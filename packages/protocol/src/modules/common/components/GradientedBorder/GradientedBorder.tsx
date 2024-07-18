import { ElementType, ReactNode } from 'react';

import {
  GradientedBorderStyles,
  useGradientedBorderStyles,
} from './GradientedBorderStyles';

export interface GradientedBorderProps {
  Component?: ElementType<{ className?: string }>;
  children: ReactNode;
  hasBorder?: boolean;
  styles?: GradientedBorderStyles;
}

export const GradientedBorder = ({
  Component = 'div',
  children,
  hasBorder = true,
  styles = {},
}: GradientedBorderProps) => {
  const { classes } = useGradientedBorderStyles(styles);

  if (!hasBorder) {
    return <>{children}</>;
  }

  return (
    <Component className={classes.root}>
      <div className={classes.content}>{children}</div>
    </Component>
  );
};
