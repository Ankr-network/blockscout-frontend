import { PremiumLabel } from '../PremiumLabel';
import { useEndpointsHeaderStyles } from './EndpointsHeaderStyles';

export interface EndpointsHeaderProps {
  hasPremium?: boolean;
  isPremiumLabelHidden?: boolean;
  title: string;
}

export const EndpointsHeader = ({
  hasPremium,
  isPremiumLabelHidden,
  title,
}: EndpointsHeaderProps) => {
  const { classes } = useEndpointsHeaderStyles();

  return (
    <div className={classes.endpointsHeader}>
      {title}
      {hasPremium && !isPremiumLabelHidden && <PremiumLabel />}
    </div>
  );
};
