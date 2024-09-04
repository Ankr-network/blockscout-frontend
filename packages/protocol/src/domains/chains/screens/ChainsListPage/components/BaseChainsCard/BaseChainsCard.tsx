import { Box, Skeleton, Typography } from '@mui/material';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { NavLink } from 'uiKit/NavLink';
import { Timeframe, Chain } from 'modules/chains/types';
import { Placeholder } from 'modules/common/components/Placeholder';
import { ChainDescription } from 'modules/chains/components/ChainDescription';
import { isMultichain } from 'modules/chains/utils/isMultichain';

import { ChainCardShadow } from '../ChainCardShadow';
import { Information } from './components/Information';
import { useChainCardStyles } from './useChainCardStyles';

export interface IBaseChainCardProps {
  chain: Chain;
  className?: string;
  hasShadow?: boolean;
  hasTotalRequestsLabel?: boolean;
  loading: boolean;
  onClick?: () => void;
  timeframe: Timeframe;
  totalRequests: string;
  isRequestsDisabled?: boolean;
  actions?: React.ReactNode;
  shouldShowDashInsteadOfRequestsString?: boolean;
}

export const BaseChainsCard = ({
  actions,
  chain,
  className,
  hasShadow = true,
  hasTotalRequestsLabel = true,
  isRequestsDisabled,
  loading,
  onClick,
  shouldShowDashInsteadOfRequestsString,
  timeframe,
  totalRequests,
}: IBaseChainCardProps) => {
  const { classes, cx } = useChainCardStyles();

  const { id } = chain;

  const isSimpleLinkCard = !onClick;

  const props = isSimpleLinkCard
    ? {
        component: NavLink,
        href: ChainsRoutesConfig.chainDetails.generatePath(id),
      }
    : {
        onClick,
      };

  const Component = hasShadow ? ChainCardShadow : Box;

  return (
    <Component
      className={cx(
        classes.baseChainCardRoot,
        {
          [classes.multichainCard]: isMultichain(id),
        },
        className,
      )}
      {...props}
    >
      <ChainDescription
        chain={chain}
        logoSize={48}
        isCompactView
        className={classes.baseChainCardDescription}
      />
      <div className={classes.secondInfo}>
        {hasTotalRequestsLabel && (
          <Typography className={classes.information}>
            <Placeholder
              hasPlaceholder={loading}
              placeholder={<Skeleton className={classes.skeleton} />}
            >
              <Information
                shouldShowDashInsteadOfRequestsString={
                  shouldShowDashInsteadOfRequestsString
                }
                timeframe={timeframe}
                totalRequests={totalRequests}
                isRequestsDisabled={isRequestsDisabled}
              />
            </Placeholder>
          </Typography>
        )}
      </div>
      {actions}
    </Component>
  );
};
