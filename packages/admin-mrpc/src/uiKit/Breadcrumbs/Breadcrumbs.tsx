import React from 'react';
import {
  Breadcrumbs as BreadcrumbsBase,
  Typography,
  capitalize,
  useMediaQuery,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import { useIsMDDown } from 'ui';
import { ClientsRoutesConfig } from 'modules/clients/ClientsRoutesConfig';
import { BreadcrumbsProps } from './BreadcrumbsTypes';
import { useStyles } from './BreadcrumbsStyles';

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const { pathname } = useLocation();
  const isBreadcrumbsHidden =
    pathname === ClientsRoutesConfig.clients.path ||
    pathname === `${ClientsRoutesConfig.clients.path}/`;
  const isMobile = useIsMDDown();
  const isLessThanMaxWidth = useMediaQuery('(max-width:1100px)');

  const shouldShowMobileBreadcrumbs =
    isMobile || (isLessThanMaxWidth && items.length > 2);

  const { classes, cx } = useStyles();

  if (isBreadcrumbsHidden) {
    return null;
  }

  return (
    <BreadcrumbsBase
      aria-label="breadcrumb"
      separator="/"
      classes={{
        root: classes.breadcrumbsRoot,
        ol: classes.breadcrumbs,
        li: classes.breadcrumbsLi,
      }}
    >
      {items.map((item, index) => {
        const { title, link, onClick } = item;

        const isLastIcon = index === items.length - 2;

        if (link || onClick) {
          if (!isLastIcon && shouldShowMobileBreadcrumbs) return null;

          return (
            <Typography
              component={link ? Link : Typography}
              color="inherit"
              to={link || ''}
              onClick={onClick}
              className={cx(classes.link, 'custom-link')}
              key={title}
            >
              {shouldShowMobileBreadcrumbs ? '/' : capitalize(title)}
            </Typography>
          );
        }

        return (
          <Typography
            className={classes.typography}
            color="textPrimary"
            variant="h5"
            key={title}
          >
            {capitalize(title)}
          </Typography>
        );
      })}
    </BreadcrumbsBase>
  );
};
