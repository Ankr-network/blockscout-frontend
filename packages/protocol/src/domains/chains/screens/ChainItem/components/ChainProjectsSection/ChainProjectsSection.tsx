import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { OverlaySpinner } from '@ankr.com/ui';

import { TabSize } from 'modules/common/components/SecondaryTab';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { useIsMDDown } from 'uiKit/Theme/useTheme';

import { useChainProjectsSectionStyles } from './useChainProjectsSectionStyles';
import { TimeframeTabs } from '../TimeframeTabs';
import {
  IChainProjectsSectionProps,
  useChainProjects,
} from './useChainProjects';
import { ChainProjectItem } from './ChainProjectItem';
import { chainProjectsSectionTranslation } from './translation';

export const ChainProjectsSection = ({
  chain,
  isLoadingTokenManager,
  jwtTokens,
  onOpenAddToProjectsDialog,
  shouldShowTokenManager,
}: IChainProjectsSectionProps) => {
  const { isLoading, timeframe, timeframeTabs } = useChainProjects({
    isLoadingTokenManager,
    jwtTokens,
  });

  const { classes, cx } = useChainProjectsSectionStyles();

  const { keys, t } = useTranslation(chainProjectsSectionTranslation);

  const shouldHideWidget = useIsMDDown();

  if (!shouldShowTokenManager || shouldHideWidget) {
    return null;
  }

  return (
    <Paper className={classes.chainProjectsRoot}>
      <div className={classes.projectsSectionTitle}>
        <Typography variant="subtitle2" color="textSecondary">
          {t(keys.projects)}
        </Typography>
        <TimeframeTabs
          className={classes.chainProjectsTimeframe}
          tabClassName={classes.chainProjectsTimeframeTab}
          tabs={timeframeTabs}
          timeframe={timeframe}
          size={TabSize.Smallest}
        />
      </div>

      <Table className={classes.projectsTable}>
        <TableHead className={classes.projectsTableHeader}>
          <TableRow>
            <TableCell
              className={cx(
                classes.projectsTableCell,
                classes.projectTableHeadCell,
                classes.projectTableHeadCellNameCell,
              )}
            >
              {t(keys.name)}
            </TableCell>
            <TableCell
              className={cx(
                classes.projectsTableCell,
                classes.projectTableHeadCell,
                classes.projectTableHeadCellStatusCell,
              )}
            >
              {t(keys.status)}
            </TableCell>
            <TableCell
              className={cx(
                classes.projectsTableCell,
                classes.projectTableHeadCell,
                classes.projectsTableRequestsCell,
              )}
            >
              {t(keys.requests)}
            </TableCell>
            <TableCell
              className={cx(
                classes.projectsTableCell,
                classes.projectTableHeadCell,
                classes.projectsTableButtonsCell,
              )}
              align="right"
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {jwtTokens?.map(token => (
            <ChainProjectItem
              isLoading={isLoading}
              key={token.id}
              chain={chain}
              onOpenAddToProjectsDialog={onOpenAddToProjectsDialog}
              jwtTokens={jwtTokens}
              timeframe={timeframe}
              {...token}
            />
          ))}
        </TableBody>
      </Table>

      {isLoadingTokenManager && !jwtTokens.length && (
        <OverlaySpinner className={classes.projectsSpinner} />
      )}
    </Paper>
  );
};
