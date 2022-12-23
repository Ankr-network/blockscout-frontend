import { Box } from '@material-ui/core';
import { useSubscriptions } from './hooks/useSubscriptions';

export function Subscriptions() {
  const { subscriptions, isLoading } = useSubscriptions();

  return <Box>Subscriptions</Box>;
}
