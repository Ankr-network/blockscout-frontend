import { useChainItemHeaderStyles } from './ChainItemHeaderStyles';

interface ChainItemHeaderProps {
  headerContent: JSX.Element;
  className?: string;
}

export const ChainItemHeader = ({
  className,
  headerContent,
}: ChainItemHeaderProps) => {
  const { classes, cx } = useChainItemHeaderStyles();

  return (
    <div className={cx(classes.chainItemHeader, className)}>
      {headerContent}
    </div>
  );
};
