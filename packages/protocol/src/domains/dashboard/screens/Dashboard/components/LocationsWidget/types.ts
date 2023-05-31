import { Location } from 'domains/dashboard/store/types';

export interface LocationsWidgetProps {
  className?: string;
  isLoading?: boolean;
  locations: Location[];
}
