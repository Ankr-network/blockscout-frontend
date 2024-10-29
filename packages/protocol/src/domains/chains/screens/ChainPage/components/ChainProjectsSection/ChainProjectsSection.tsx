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
import { TabSize } from 'modules/common/components/SecondaryTab';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { ChainProjectItem } from './ChainProjectItem';
import { TimeframeTabs } from '../TimeframeTabs';
import { chainProjectsSectionTranslation } from './translation';
import { useChainProjects } from './useChainProjects';
import { useChainProjectsSectionStyles } from './useChainProjectsSectionStyles';

export interface IChainProjectsSectionProps {
  chain: Chain;
  onOpenAddToProjectsDialog: () => void;
}

export const ChainProjectsSection = ({
  chain,
  onOpenAddToProjectsDialog,
}: IChainProjectsSectionProps) => {
  const {
    jwts,
    jwtsLoading,
    shouldShowTokenManager,
    timeframe,
    timeframeTabs,
  } = useChainProjects();

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
          {jwts?.map(jwt => (
            <ChainProjectItem
              chain={chain}
              jwt={jwt}
              key={jwt.id}
              onOpenAddToProjectsDialog={onOpenAddToProjectsDialog}
              timeframe={timeframe}
            />
          ))}
        </TableBody>
      </Table>
      {jwtsLoading && <OverlaySpinner className={classes.projectsSpinner} />}
    </Paper>
  );
};
