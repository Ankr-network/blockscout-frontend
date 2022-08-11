import { PremiumLabel } from '../PremiumLabel';
import { useEndpointsHeaderStyles } from './EndpointsHeaderStyles';

export interface EndpointsHeaderProps {
  isPremium?: boolean;
  title: string;
}

export const EndpointsHeader = ({ isPremium, title }: EndpointsHeaderProps) => {
  const classes = useEndpointsHeaderStyles();

  return (
    <div className={classes.endpointsHeader}>
      {title}
      {isPremium && <PremiumLabel />}
    </div>
  );
};
