import { MouseEventHandler, useState } from 'react';
import {
  Box,
  Divider,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import classNames from 'classnames';

import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './useFeatureTableStyles';
import { useMobileStyles } from './useFeatureTableMobileStyles';
import { ReactComponent as PlusIcon } from 'uiKit/Icons/plus.svg';
import { ReactComponent as MinusIcon } from 'uiKit/Icons/minus.svg';
import { Tooltip2 } from 'uiKit/Tooltip2/Tooltip2';
import { NavLink } from 'ui';
import { ArrowRightIcon } from 'uiKit/Icons/ArrowRightIcon';
import { PAYG_DOCS_LINK } from '../../const';

export const FeatureTableMobile = () => {
  const classes = useStyles();
  const classesMobile = useMobileStyles();

  const [opened, setOpened] = useState<Record<string, boolean>>({});

  const toggleList: MouseEventHandler<SVGSVGElement> = event => {
    const id = event.currentTarget.getAttribute('data-list-id') as string;
    setOpened({ [id]: !opened[id] });
  };

  return (
    <Box>
      <Box>
        <Typography variant="h3" className={classesMobile.title} align="center">
          {t('plan.table.choose-plan')}
        </Typography>
        <Paper>
          <Box p={2.5}>
            <Typography
              color="textPrimary"
              variant="body1"
              className={classes.title}
            >
              {t('plan.table.public')}
            </Typography>
            <Typography
              className={classes.subTitle}
              variant="body1"
              color="textPrimary"
            >
              {t('plan.table.free')}
            </Typography>
            <Box mt={1}>
              <Typography className={classes.subTitleGrey} variant="body1">
                {t('plan.table.current-plan')}
              </Typography>
            </Box>
            <Divider className={classesMobile.divider} />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1" className={classes.subTitle}>
                {t('plan.table.included')}
              </Typography>
              <IconButton className={classesMobile.plusBtn} size="small">
                {opened['list-free'] ? (
                  <MinusIcon
                    data-list-id="list-free"
                    onClick={toggleList}
                    fontSize={22}
                    className={classesMobile.plusIcon}
                  />
                ) : (
                  <PlusIcon
                    data-list-id="list-free"
                    onClick={toggleList}
                    fontSize={22}
                    className={classesMobile.plusIcon}
                  />
                )}
              </IconButton>
            </Box>

            <List
              className={classNames(classesMobile.list, {
                [classesMobile.listOpened]: opened['list-free'],
              })}
            >
              <ListItem disableGutters>
                <Typography className={classes.rowText}>
                  {t('plan.table.row1-col1')}
                </Typography>
                <Tooltip2
                  boxProps={{ ml: 1 }}
                  title={t('plan.table.archive-data-info')}
                />
              </ListItem>

              <ListItem disableGutters>
                <Typography className={classes.rowText}>
                  {t('plan.table.row3-col2')}
                </Typography>
                <Tooltip2
                  boxProps={{ ml: 1 }}
                  title={t('plan.table.high-traffic-info')}
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText>
                  <Typography className={classes.rowText}>
                    {t('plan.table.row4-col2')}
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem disableGutters>
                <ListItemText>
                  <Typography className={classes.rowText}>
                    {t('plan.table.https')}
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem disableGutters>
                <ListItemText>
                  <Typography className={classes.rowText}>
                    {t('plan.table.row6-col2')}
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem disableGutters>
                <ListItemText>
                  <Typography className={classes.rowText}>
                    {t('plan.table.row7-col2')}
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Box>
        </Paper>
      </Box>

      <Box mt={2}>
        <Paper>
          <Box p={2.5}>
            <Typography
              color="textPrimary"
              variant="body1"
              className={classes.title}
            >
              {t('plan.table.premium')}
            </Typography>
            <Typography
              className={classes.subTitle}
              variant="body1"
              color="textPrimary"
            >
              {t('plan.table.payg')}
            </Typography>
            <NavLink
              href={PAYG_DOCS_LINK}
              tabIndex={0}
              className={classesMobile.unblockBtn}
              endIcon={
                <ArrowRightIcon className={classesMobile.unblockBtnIcon} />
              }
              variant="text"
              color="default"
            >
              <Typography variant="h5" className={classesMobile.unlockBtnTitle}>
                {t('plan.learn-more')}
              </Typography>
            </NavLink>
            <Divider className={classesMobile.divider} />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1" className={classes.subTitle}>
                {t('plan.table.included')}
              </Typography>
              <IconButton className={classesMobile.plusBtn} size="small">
                {opened['list-premium'] ? (
                  <MinusIcon
                    data-list-id="list-premium"
                    onClick={toggleList}
                    fontSize={22}
                    className={classesMobile.plusIcon}
                  />
                ) : (
                  <PlusIcon
                    data-list-id="list-premium"
                    onClick={toggleList}
                    fontSize={22}
                    className={classesMobile.plusIcon}
                  />
                )}
              </IconButton>
            </Box>

            <List
              className={classNames(classesMobile.list, {
                [classesMobile.listOpened]: opened['list-premium'],
              })}
            >
              <ListItem disableGutters>
                <Typography className={classes.rowText}>
                  {t('plan.table.row1-col1')}
                </Typography>
                <Tooltip2
                  boxProps={{ ml: 1 }}
                  title={t('plan.table.archive-data-info')}
                />
              </ListItem>

              <ListItem disableGutters>
                <ListItemText>
                  <Typography className={classes.rowText}>
                    {t('plan.table.no-rate-limit')}
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem disableGutters>
                <ListItemText>
                  <Typography className={classes.rowText}>
                    {t('plan.table.unlimited-requests')}
                  </Typography>
                </ListItemText>
              </ListItem>

              <ListItem disableGutters>
                <ListItemText>
                  <Typography className={classes.rowText}>
                    {t('plan.table.https-and-ws')}
                  </Typography>
                </ListItemText>
              </ListItem>

              <ListItem disableGutters>
                <ListItemText>
                  <Typography className={classes.rowText}>
                    {t('plan.table.global-coverage')}
                  </Typography>
                </ListItemText>
              </ListItem>

              <ListItem disableGutters>
                <Box display="flex" flexDirection="column">
                  <Box display="flex" alignItems="flex-start">
                    <Typography className={classes.rowText}>
                      {t('plan.table.row2-col1')}
                    </Typography>
                    <Tooltip2
                      boxProps={{ ml: 1 }}
                      title={t('plan.table.advanced-api-info')}
                    />
                  </Box>
                  <Typography
                    variant="subtitle1"
                    className={classes.textSecondary}
                  >
                    {t('plan.table.row2-col1-sub')}
                  </Typography>
                </Box>
              </ListItem>

              <ListItem disableGutters>
                <ListItemText>
                  <Typography className={classes.rowText}>
                    {t('plan.table.sla')}
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
