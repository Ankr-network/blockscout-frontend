import { PremiumLabel } from '../PremiumLabel';
import { useEndpointsHeaderStyles } from './EndpointsHeaderStyles';

export interface EndpointsHeaderProps {
  hasPremium?: boolean;
  title: string;
}

export const EndpointsHeader = ({
  hasPremium,
  title,
}: EndpointsHeaderProps) => {
  const { classes } = useEndpointsHeaderStyles();

  return (
    <div className={classes.endpointsHeader}>
      {title}
      {hasPremium && <PremiumLabel />}
    </div>
  );
};
