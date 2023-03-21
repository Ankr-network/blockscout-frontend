import { useGradientedTextStyles } from './GradientedTextStyles';

export interface GradientedTextProps {
  children: string;
  className?: string;
  gradient?: string;
}

export const GradientedText = ({
  children,
  className,
  gradient,
}: GradientedTextProps) => {
  const { classes, cx } = useGradientedTextStyles(gradient);

  return <span className={cx(classes.root, className)}>{children}</span>;
};
