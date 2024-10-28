import { Chain } from '@ankr.com/chains-list';
import { OverlaySpinner } from '@ankr.com/ui';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { GuardResolution } from 'modules/common/components/GuardResolution';
import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { TabSize } from 'modules/common/components/SecondaryTab';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { ChainProjectItem } from './ChainProjectItem';
import { TimeframeTabs } from '../TimeframeTabs';
import { chainProjectsSectionTranslation } from './translation';
import { useChainProjects } from './useChainProjects';
import { useChainProjectsSectionStyles } from './useChainProjectsSectionStyles';

export interface IChainProjectsSectionProps {
  chain: Chain;
  jwts: JWT[];
  jwtsLoading: boolean;
  onOpenAddToProjectsDialog: () => void;
  shouldShowTokenManager: boolean;
}

export const ChainProjectsSection = ({
  chain,
  jwts,
  jwtsLoading,
  onOpenAddToProjectsDialog,
  shouldShowTokenManager,
}: IChainProjectsSectionProps) => {
  const { isLoading, timeframe, timeframeTabs } = useChainProjects({
    jwts,
    jwtsLoading,
  });

  const { classes, cx } = useChainProjectsSectionStyles();

  const { keys, t } = useTranslation(chainProjectsSectionTranslation);

  if (!shouldShowTokenManager) {
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
        <GuardResolution protectedResolution="smDown">
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
        </GuardResolution>
        <TableBody>
          {jwts?.map(token => (
            <ChainProjectItem
              isLoading={isLoading}
              key={token.id}
              chain={chain}
              onOpenAddToProjectsDialog={onOpenAddToProjectsDialog}
              jwtTokens={jwts}
              timeframe={timeframe}
              {...token}
            />
          ))}
        </TableBody>
      </Table>

      {jwtsLoading && !jwts.length && (
        <OverlaySpinner className={classes.projectsSpinner} />
      )}
    </Paper>
  );
};
