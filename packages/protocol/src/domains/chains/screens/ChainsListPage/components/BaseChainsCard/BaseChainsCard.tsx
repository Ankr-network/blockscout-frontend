import { Box, Skeleton, Typography } from '@mui/material';
import { Timeframe, Chain } from '@ankr.com/chains-list';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { Placeholder } from 'modules/common/components/Placeholder';
import { ChainDescription } from 'modules/chains/components/ChainDescription';
import { isMultichain } from 'modules/chains/utils/isMultichain';
import { GuardResolution } from 'modules/common/components/GuardResolution';
import { useIsXSDown } from 'uiKit/Theme/useTheme';

import { ChainCardShadow } from '../ChainCardShadow';
import { EChainView } from '../ChainViewSelector';
import { Information } from './components/Information';
import { useChainCardStyles } from './useChainCardStyles';

export interface IBaseChainCardProps {
  chain: Chain;
  className?: string;
  hasShadow?: boolean;
  hasTotalRequestsLabel?: boolean;
  loading?: boolean;
  onClick?: () => void;
  timeframe: Timeframe;
  totalRequests: string;
  isRequestsDisabled?: boolean;
  actions?: React.ReactNode;
  shouldShowDashInsteadOfRequestsString?: boolean;
  view?: EChainView;
  isPublicLayout?: boolean;
}

export const BaseChainsCard = ({
  actions,
  chain,
  className,
  hasShadow = true,
  hasTotalRequestsLabel = true,
  isPublicLayout = false,
  isRequestsDisabled,
  loading = false,
  onClick,
  shouldShowDashInsteadOfRequestsString,
  timeframe,
  totalRequests,
  view = EChainView.Cards,
}: IBaseChainCardProps) => {
  const { classes, cx } = useChainCardStyles(isPublicLayout);

  const { id } = chain;

  const { push } = useHistory();

  const handleOpenChainPage = useCallback(() => {
    push(ChainsRoutesConfig.chainDetails.generatePath(id));
  }, [id, push]);

  const isSimpleLinkCard = !onClick;

  const props = isSimpleLinkCard
    ? {
        component: Box,
        onClick: handleOpenChainPage,
      }
    : {
        onClick,
      };

  const isXsDown = useIsXSDown();

  const Component = hasShadow ? ChainCardShadow : Box;

  const isListView = view === EChainView.List;

  const desktopLogoSize = isListView ? 40 : 48;

  return (
    <Component
      className={cx(
        classes.baseChainCardRoot,
        {
          [classes.multichainCard]: isMultichain(id),
          [classes.baseChainCardListView]: isListView,
        },
        className,
      )}
      {...props}
    >
      <ChainDescription
        chain={chain}
        logoSize={isXsDown ? 24 : desktopLogoSize}
        isCompactView
        className={cx(classes.baseChainCardDescription, {
          [classes.baseChainCardDescriptionListView]: isListView,
        })}
        classNameChainName={classes.baseChainCardChainName}
      />
      <div
        className={cx(classes.secondInfo, {
          [classes.secondInfoListView]: isListView,
        })}
      >
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
                isTitleHidden={isListView}
              />
            </Placeholder>
          </Typography>
        )}
      </div>
      <GuardResolution protectedResolution="smDown">
        <div
          className={cx(classes.chainCardActions, {
            [classes.chainCardActionsListView]: isListView,
          })}
        >
          {actions}
        </div>
      </GuardResolution>
    </Component>
  );
};
