import { Card } from './components/Card';
import { ChainsItemBaseProps } from './ChainsItemBaseTypes';
import { DialogCard } from './components/DialogCard';
import { useChainsItemBaseStyles } from './ChainsItemBaseStyles';
import { useContent } from './hooks/useContent';

export const ChainsItemBase = ({
  chain: { id: chainId, isArchive, isComingSoon },
  chainsItemButton,
  chainsItemLink,
  description,
  hasPremiumDialog,
  isHighlighted = false,
  isLoading,
  name,
  period,
  timeframe,
  totalRequests,
}: ChainsItemBaseProps) => {
  const { classes } = useChainsItemBaseStyles(isHighlighted);

  const content = useContent({
    chainId,
    chainsItemButton,
    chainsItemLink,
    description,
    hasPremiumDialog,
    isArchive,
    isHighlighted,
    isLoading,
    name,
    period,
    timeframe,
    totalRequests,
    isComingSoon,
  });

  return hasPremiumDialog ? (
    <DialogCard className={classes.root}>{content}</DialogCard>
  ) : (
    <Card chainId={chainId} className={classes.root}>
      {content}
    </Card>
  );
};
