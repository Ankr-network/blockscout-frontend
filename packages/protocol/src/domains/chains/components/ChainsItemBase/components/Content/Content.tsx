import { Buttons } from '../Buttons';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { ChainRequestsLabel } from 'domains/chains/components/ChainRequestsLabel';
import { ContentProps } from './types';
import { Label } from '../Label';
import { Links } from '../Links';
import { useContentStyles } from './ContentStyles';

export const Content = ({
  chainsItemButton,
  chainsItemLink,
  description,
  hasPremiumDialog,
  isArchive,
  isHighlighted,
  isLoading,
  isSui,
  logoSrc,
  name,
  period,
  timeframe,
  totalRequests,
}: ContentProps) => {
  const hasLabel = isArchive || isSui;

  const { classes } = useContentStyles();

  return (
    <>
      <ChainMainInfo
        className={classes.mainInfo}
        description={
          description && (
            <ChainRequestsLabel description={description} label={period} />
          )
        }
        isHighlighted={isHighlighted}
        isLoading={isLoading}
        label={hasLabel && <Label isSui={isSui} />}
        logoSrc={logoSrc}
        name={name}
        timeframe={timeframe}
        totalRequests={totalRequests}
      />
      <Links hasPremiumDialog={hasPremiumDialog}>{chainsItemLink}</Links>
      <Buttons>{chainsItemButton}</Buttons>
    </>
  );
};
