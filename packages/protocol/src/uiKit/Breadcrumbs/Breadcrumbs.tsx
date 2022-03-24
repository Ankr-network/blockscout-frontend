import React from 'react';
import {
  Breadcrumbs as BreadcrumbsBase,
  Typography,
  capitalize,
  useMediaQuery,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { AngleRightIcon } from 'uiKit/Icons/AngleRightIcon';
import { useStyles } from './BreadcrumbsStyles';
import { BreadcrumbsProps } from './BreadcrumbsTypes';
import { useIsMDDown } from 'ui';

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const isMobile = useIsMDDown();
  const isLessThanMaxWidth = useMediaQuery('(max-width:1100px)');

  const shouldShowMobileBreadcrumbs =
    isMobile || (isLessThanMaxWidth && items.length > 2);

  const classes = useStyles({ shouldShowMobileBreadcrumbs });

  return (
    <BreadcrumbsBase
      aria-label="breadcrumb"
      separator={<AngleRightIcon className={classes.separator} />}
      classes={{
        ol: classes.breadcrumbs,
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
              className={classNames(classes.link, 'custom-link')}
              key={title}
            >
              {shouldShowMobileBreadcrumbs ? (
                <AngleRightIcon className={classes.mobileBackButton} />
              ) : (
                capitalize(title)
              )}
            </Typography>
          );
        }

        return (
          <Typography color="textPrimary" variant="h3" key={title}>
            {capitalize(title)}
          </Typography>
        );
      })}
    </BreadcrumbsBase>
  );
};
