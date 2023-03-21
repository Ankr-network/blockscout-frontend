import { CircleArrow } from '@ankr.com/ui';
import { CircularProgress } from '@mui/material';

export interface RefreshButtonIconProps {
  isCountdownEnded: boolean;
  isRefreshing: boolean;
}

export const RefreshButtonIcon = ({
  isCountdownEnded,
  isRefreshing,
}: RefreshButtonIconProps) => (
  <>
    {isRefreshing && <CircularProgress size={18} color="inherit" />}
    {isCountdownEnded && <CircleArrow color="inherit" />}
  </>
);
