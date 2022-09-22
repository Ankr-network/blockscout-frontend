import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Typography,
  Box,
} from '@material-ui/core';

import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './useFeatureTableStyles';
import { ArrowRightIcon } from 'uiKit/Icons/ArrowRightIcon';
import { ReactComponent as CheckIcon } from 'uiKit/Icons/check.svg';
import { ReactComponent as CrossIcon } from 'uiKit/Icons/cross.svg';
import { NavLink, useIsXSDown } from 'ui';
import { FeatureTableMobile } from './FeatureTableMobile';
import { Tooltip2 } from 'uiKit/Tooltip2/Tooltip2';
import { PRICING_LINK } from 'domains/account/screens/AccountDetails/components/const';

export const FeatureTable = () => {
  const classes = useStyles();
  const isMobile = useIsXSDown();

  if (isMobile) {
    return <FeatureTableMobile />;
  }

  return (
    <Table className={classes.root}>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>
            <Typography
              color="textPrimary"
              variant="body1"
              className={classes.title}
            >
              {t('plan.table.public')}
            </Typography>
            <Box mt={1}>
              <Typography
                className={classes.subTitle}
                variant="body1"
                color="textPrimary"
              >
                {t('plan.table.free')}
              </Typography>
            </Box>
            <Box mt={1}>
              <Typography className={classes.subTitleGrey} variant="body1">
                {t('plan.table.current-plan')}
              </Typography>
            </Box>
          </TableCell>
          <TableCell>
            <Typography
              color="textPrimary"
              variant="body1"
              className={classes.title}
            >
              {t('plan.table.premium')}
            </Typography>

            <Box mt={1}>
              <Typography
                className={classes.subTitle}
                variant="body1"
                color="textPrimary"
              >
                {t('plan.table.payg')}
              </Typography>
            </Box>
            <Box mt={1}>
              <NavLink
                href={PRICING_LINK}
                tabIndex={0}
                className={classes.unblockBtn}
                endIcon={<ArrowRightIcon className={classes.unblockBtnIcon} />}
                variant="text"
                color="default"
              >
                <Typography variant="h5" className={classes.unlockBtnTitle}>
                  {t('plan.learn-more')}
                </Typography>
              </NavLink>
            </Box>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <Box display="flex" alignItems="flex-start">
              <Typography display="inline" className={classes.rowText}>
                {t('plan.table.row1-col1')}
              </Typography>
              <Tooltip2
                boxProps={{ ml: 1 }}
                title={t('plan.table.archive-data-info')}
              />
            </Box>
          </TableCell>
          <TableCell>
            <CheckIcon fontSize={24} className={classes.iconPrimary} />
          </TableCell>
          <TableCell>
            <CheckIcon fontSize={24} className={classes.iconPrimary} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Box display="flex" alignItems="flex-start">
              <Typography display="inline" className={classes.rowText}>
                {t('plan.table.row2-col1')}
              </Typography>
              <Tooltip2
                boxProps={{ ml: 1 }}
                title={t('plan.table.advanced-api-info')}
              />
            </Box>
            <Typography variant="subtitle1" className={classes.textSecondary}>
              {t('plan.table.row2-col1-sub')}
            </Typography>
          </TableCell>
          <TableCell>
            <CrossIcon fontSize={24} className={classes.iconGrey} />
          </TableCell>
          <TableCell>
            <CheckIcon fontSize={24} className={classes.iconPrimary} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Box display="flex" alignItems="flex-start">
              <Typography display="inline" className={classes.rowText}>
                {t('plan.table.row3-col1')}
              </Typography>
              <Tooltip2
                boxProps={{ ml: 1 }}
                title={t('plan.table.rate-limit-info')}
              />
            </Box>
          </TableCell>
          <TableCell>
            <Box display="flex" alignItems="flex-start">
              <Typography display="inline" className={classes.rowTextSub}>
                {t('plan.table.row3-col2')}
              </Typography>
              <Tooltip2
                boxProps={{ ml: 1 }}
                title={t('plan.table.high-traffic-info')}
              />
            </Box>
          </TableCell>
          <TableCell>
            <Typography display="inline" className={classes.rowTextSub}>
              {t('plan.table.row3-col3')}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography display="inline" className={classes.rowText}>
              {t('plan.table.row4-col1')}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography display="inline" className={classes.rowTextSub}>
              {t('plan.table.row4-col2')}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography display="inline" className={classes.rowTextSub}>
              {t('plan.table.row4-col3')}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography display="inline" className={classes.rowText}>
              {t('plan.table.row5-col1')}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography display="inline" className={classes.rowTextSub}>
              {t('plan.table.row5-col2')}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography display="inline" className={classes.rowTextSub}>
              {t('plan.table.row5-col3')}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography display="inline" className={classes.rowText}>
              {t('plan.table.row6-col1')}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography display="inline" className={classes.rowTextSub}>
              {t('plan.table.row6-col2')}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography display="inline" className={classes.rowTextSub}>
              {t('plan.table.row6-col3')}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography display="inline" className={classes.rowText}>
              {t('plan.table.row7-col1')}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography display="inline" className={classes.rowTextSub}>
              {t('plan.table.row7-col2')}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography display="inline" className={classes.rowTextSub}>
              {t('plan.table.row7-col3')}
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
